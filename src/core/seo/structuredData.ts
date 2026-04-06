import { blogDetailHeroSrc } from '@/core/constants/blogMedia';
import type { LocalizedBlog } from '@/core/types/web/blog';
import { SITE_NAME, SITE_NAME_AR } from './site';

const CTX = 'https://schema.org';

export function organizationJsonLd(base: string) {
  return {
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_NAME_AR,
    url: base,
    logo: {
      '@type': 'ImageObject',
      url: `${base}/og-image.png`,
    },
    sameAs: ['https://www.linkedin.com/in/mohfintech/'],
  };
}

/** WebSite + blog search hint for crawlers and answer engines. */
export function webSiteJsonLd(base: string) {
  return {
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: base,
    name: SITE_NAME,
    alternateName: SITE_NAME_AR,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${base}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/en/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function siteWideGraphJsonLd(base: string) {
  return {
    '@context': CTX,
    '@graph': [organizationJsonLd(base), webSiteJsonLd(base)],
  };
}

export function blogPostingJsonLd(params: {
  base: string;
  locale: string;
  slug: string;
  blog: LocalizedBlog;
}) {
  const { base, locale, slug, blog } = params;
  const pageUrl = `${base}/${locale}/blog/${slug}`;
  const imageUrl = `${base}${blogDetailHeroSrc(blog.featuredImage)}`;

  const node: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    headline: blog.title,
    description: blog.excerpt,
    image: [imageUrl],
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt,
    publisher: { '@id': `${base}/#organization` },
    articleSection: blog.category.name,
    inLanguage: locale,
  };

  return node;
}

export function breadcrumbBlogJsonLd(params: {
  base: string;
  locale: string;
  slug: string;
  title: string;
}) {
  const { base, locale, slug, title } = params;
  const homeLabel = locale === 'ar' ? 'الرئيسية' : 'Home';

  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${base}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${base}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${base}/${locale}/blog/${slug}`,
      },
    ],
  };
}

export function blogArticleGraphJsonLd(params: {
  base: string;
  locale: string;
  slug: string;
  blog: LocalizedBlog;
}) {
  return {
    '@context': CTX,
    '@graph': [
      blogPostingJsonLd(params),
      breadcrumbBlogJsonLd({
        base: params.base,
        locale: params.locale,
        slug: params.slug,
        title: params.blog.title,
      }),
    ],
  };
}

/** Listing page: current slice of posts as an ItemList for discovery. */
export function blogCollectionPageJsonLd(params: {
  base: string;
  locale: string;
  pathWithQuery: string;
  name: string;
  description: string;
  blogs: LocalizedBlog[];
  listStartIndex: number;
}) {
  const { base, locale, pathWithQuery, name, description, blogs, listStartIndex } = params;
  const pageUrl = `${base}${pathWithQuery}`;

  return {
    '@context': CTX,
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        url: pageUrl,
        name,
        description,
        isPartOf: { '@id': `${base}/#website` },
        inLanguage: locale,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: blogs.length,
          itemListElement: blogs.map((b, i) => ({
            '@type': 'ListItem',
            position: listStartIndex + i,
            url: `${base}/${locale}/blog/${b.slug}`,
            name: b.title,
          })),
        },
      },
    ],
  };
}
