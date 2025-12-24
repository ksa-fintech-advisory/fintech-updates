import { NextResponse } from 'next/server';
import { blogs, blogCategories } from '@/services/api/mock/data/blogs.data';
import { LocalizedPaginatedBlogs, LocalizedBlog, LocalizedBlogCategory } from '@/core/types/web/blog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  // Get locale from query param or header, default to 'ar'
  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale = (lang === 'en' || lang === 'ar') ? lang : 
                 (acceptLanguage?.includes('en') ? 'en' : 'ar');

  let filteredBlogs = [...blogs];

  // Apply category filter
  if (category) {
    filteredBlogs = filteredBlogs.filter(
      blog => blog.category.slug === category
    );
  }

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredBlogs = filteredBlogs.filter(blog =>
      blog.title.en.toLowerCase().includes(searchLower) ||
      blog.title.ar.toLowerCase().includes(searchLower) ||
      blog.excerpt.en.toLowerCase().includes(searchLower) ||
      blog.excerpt.ar.toLowerCase().includes(searchLower) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Sort by published date (newest first)
  filteredBlogs.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = filteredBlogs.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  // Map to localized structure
  const mapToLocalized = (blog: typeof blogs[0], isRelated = false): LocalizedBlog => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title[locale],
    excerpt: blog.excerpt[locale],
    content: blog.content[locale],
    featuredImage: blog.featuredImage,
    category: {
      id: blog.category.id,
      name: blog.category.name[locale],
      slug: blog.category.slug,
      color: blog.category.color,
      icon: blog.category.icon,
    },
    tags: blog.tags,
    author: {
      id: blog.author.id,
      name: blog.author.name?.[locale],
      bio: blog.author.bio?.[locale],
      role: blog.author.role?.[locale],
      avatar: blog.author.avatar,
    },
    publishedAt: blog.publishedAt,
    readTime: blog.readTime,
    relatedPosts: isRelated 
      ? [] 
      : (blog.relatedPosts || [])
          .map(id => blogs.find(b => b.id === id))
          .filter((b): b is typeof blogs[0] => !!b)
          .map(b => mapToLocalized(b, true)),
  });

  const localizedBlogs: LocalizedBlog[] = filteredBlogs.slice(start, end).map(blog => mapToLocalized(blog));

  const localizedCategories: LocalizedBlogCategory[] = blogCategories.map(cat => ({
    id: cat.id,
    name: cat.name[locale],
    slug: cat.slug,
    color: cat.color,
    icon: cat.icon,
  }));

  const response: LocalizedPaginatedBlogs = {
    blogs: localizedBlogs,
    total,
    page,
    limit,
    totalPages,
    categories: localizedCategories,
  };

  return NextResponse.json(response);
}
