import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fintech-updates.com';

  // Static pages
  const staticPages = [
    '',
    '/web/about',
    '/web/contact',
    '/web/home',
    '/web/blog',
    '/web/updates',
    '/web/products',
  ];

  const routes = staticPages.flatMap((route) => {
    return [
      {
        url: `${baseUrl}/en${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' || route === '/web/home' ? 1 : 0.8,
      },
      {
        url: `${baseUrl}/ar${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' || route === '/web/home' ? 1 : 0.8,
      },
    ];
  });

  // Dynamic Blog Posts
  const blogs = await prisma.blog.findMany({
    select: { slug: true, publishedAt: true },
  });

  const blogRoutes = blogs.flatMap((blog) => [
    {
      url: `${baseUrl}/en/web/blog/${blog.slug}`,
      lastModified: blog.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ar/web/blog/${blog.slug}`,
      lastModified: blog.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]);

  // Dynamic Updates
  const updates = await prisma.update.findMany({
    select: { slug: true, publishedAt: true },
  });

  const updateRoutes = updates.flatMap((update) => [
    {
      url: `${baseUrl}/en/web/updates/${update.slug}`,
      lastModified: update.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ar/web/updates/${update.slug}`,
      lastModified: update.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]);

  return [...routes, ...blogRoutes, ...updateRoutes];
}
