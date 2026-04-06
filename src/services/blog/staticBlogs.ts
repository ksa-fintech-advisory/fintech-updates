import type {
  Blog,
  BlogCategory,
  BlogFilters,
  LocalizedBlog,
  LocalizedBlogCategory,
  LocalizedPaginatedBlogs,
} from '@/core/types/web/blog';
import { blogs as allBlogs, blogCategories } from '@/services/api/data/blogs.data';
import { linkedInSharesBlogs } from '@/services/api/data/linkedin-shares.blogs';

type Locale = 'en' | 'ar';

function isLocale(l: string): l is Locale {
  return l === 'en' || l === 'ar';
}

function resolveLocale(locale: string): Locale {
  return isLocale(locale) ? locale : 'ar';
}

function textForBlog(blog: Blog, locale: Locale, field: 'title' | 'excerpt'): string {
  const v = blog[field];
  return locale === 'ar' ? v.ar || v.en : v.en || v.ar;
}

function categoryName(cat: BlogCategory, locale: Locale): string {
  return locale === 'ar' ? cat.name.ar || cat.name.en : cat.name.en || cat.name.ar;
}

export function localizeCategory(cat: BlogCategory, locale: string): LocalizedBlogCategory {
  const lang = resolveLocale(locale);
  return {
    id: cat.id,
    name: categoryName(cat, lang),
    slug: cat.slug,
    color: cat.color,
    icon: cat.icon,
  };
}

/** Full localization for article page; `omitContent` uses empty content (listing cards). */
export function localizeBlog(blog: Blog, locale: string, options?: { omitContent?: boolean }): LocalizedBlog {
  const lang = resolveLocale(locale);
  const content =
    options?.omitContent === true
      ? []
      : lang === 'ar'
        ? blog.content.ar
        : blog.content.en;

  const n = blog.author.name;
  const nameStr = n ? (lang === 'ar' ? n.ar || n.en : n.en || n.ar) : undefined;
  const bio = blog.author.bio;
  const role = blog.author.role;

  return {
    id: blog.id,
    slug: blog.slug,
    title: textForBlog(blog, lang, 'title'),
    excerpt: textForBlog(blog, lang, 'excerpt'),
    content,
    featuredImage: blog.featuredImage,
    category: localizeCategory(blog.category, locale),
    tags: blog.tags,
    author: {
      id: blog.author.id,
      name: nameStr,
      bio: bio ? (lang === 'ar' ? bio.ar || bio.en : bio.en || bio.ar) : undefined,
      role: role ? (lang === 'ar' ? role.ar || role.en : role.en || role.ar) : undefined,
      avatar: blog.author.avatar,
    },
    publishedAt: blog.publishedAt,
    readTime: blog.readTime,
    relatedPosts: [],
  };
}

const sortedBlogs: Blog[] = [...linkedInSharesBlogs].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

const blogBySlug = new Map(sortedBlogs.map((b) => [b.slug, b]));
const blogById = new Map(sortedBlogs.map((b) => [b.id, b]));

function matchesSearch(blog: Blog, query: string): boolean {
  const raw = query.trim().toLowerCase();
  if (!raw) return true;

  const hay = [
    blog.title.en,
    blog.title.ar,
    blog.excerpt.en,
    blog.excerpt.ar,
    blog.slug,
    ...blog.tags,
    blog.category.slug,
    blog.category.name.en,
    blog.category.name.ar,
  ]
    .join(' ')
    .toLowerCase();

  const words = raw.split(/\s+/).filter(Boolean);
  return words.every((w) => hay.includes(w));
}

function applyFilters(list: Blog[], filters?: BlogFilters): Blog[] {
  if (!filters) return list;

  let out = list;

  if (filters.category) {
    out = out.filter((b) => b.category.slug === filters.category);
  }

  const search = filters.search?.trim();
  if (search) {
    out = out.filter((b) => matchesSearch(b, search));
  }

  return out;
}

/** Total posts after optional category/search filters (same logic as list pagination). */
export function countStaticBlogsMatching(filters?: BlogFilters): number {
  return applyFilters(sortedBlogs, filters).length;
}

export function getStaticCategoriesLocalized(locale: string): LocalizedBlogCategory[] {
  return blogCategories.map((c) => localizeCategory(c, locale));
}

export function paginateStaticBlogs(
  page: number = 1,
  limit: number = 12,
  filters: BlogFilters | undefined,
  locale: string,
): LocalizedPaginatedBlogs {
  const filtered = applyFilters(sortedBlogs, filters);
  const total = filtered.length;
  const totalPages = limit > 0 && total > 0 ? Math.ceil(total / limit) : 0;
  const safePage =
    total === 0 ? Math.max(1, page) : Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * limit;
  const slice = limit > 0 ? filtered.slice(start, start + limit) : [];

  const localizedBlogs = slice.map((b) => localizeBlog(b, locale, { omitContent: true }));

  return {
    blogs: localizedBlogs,
    total,
    page: total === 0 ? 1 : safePage,
    limit,
    totalPages,
    categories: getStaticCategoriesLocalized(locale),
  };
}

export function getStaticBlogBySlug(slug: string, locale: string): LocalizedBlog | null {
  const blog = blogBySlug.get(slug);
  if (!blog) return null;

  const localized = localizeBlog(blog, locale);

  const related: LocalizedBlog[] = [];
  for (const id of blog.relatedPosts) {
    const rb = blogById.get(id);
    if (rb && rb.slug !== slug) {
      related.push(localizeBlog(rb, locale, { omitContent: true }));
    }
  }

  localized.relatedPosts = related;
  return localized;
}

export function getFeaturedStaticBlogs(locale: string, limit: number = 3): LocalizedBlog[] {
  return sortedBlogs.slice(0, limit).map((b) => localizeBlog(b, locale, { omitContent: true }));
}

export function getAllBlogSlugs(): { slug: string; publishedAt: string }[] {
  return sortedBlogs.map((b) => ({ slug: b.slug, publishedAt: b.publishedAt }));
}
