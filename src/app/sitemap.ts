import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { getSiteUrl } from '@/core/seo/site';

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

function localizedUrls(
  path: string,
  lastModified: Date,
  changeFrequency: Freq,
  priority: number,
): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    {
      url: `${base}/en${path}`,
      lastModified,
      changeFrequency,
      priority,
    },
    {
      url: `${base}/ar${path}`,
      lastModified,
      changeFrequency,
      priority,
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const highTraffic: Array<{ path: string; priority: number }> = [
    { path: '', priority: 1 },
    { path: '/web/home', priority: 1 },
  ];

  const core: Array<{ path: string; priority: number }> = [
    { path: '/web/about', priority: 0.9 },
    { path: '/web/contact', priority: 0.85 },
    { path: '/web/blog', priority: 0.9 },
    { path: '/web/roadmap', priority: 0.95 },
    { path: '/web/updates', priority: 0.85 },
    { path: '/web/products', priority: 0.8 },
    { path: '/web/courses', priority: 0.85 },
    { path: '/web/courses/fintech-fundamentals', priority: 0.85 },
    { path: '/web/courses/fintech-fundamentals/register', priority: 0.75 },
    { path: '/web/docs', priority: 0.55 },
  ];

  const legal: Array<{ path: string; priority: number }> = [
    { path: '/web/privacy', priority: 0.35 },
    { path: '/web/terms', priority: 0.35 },
  ];

  const products: Array<{ path: string; priority: number }> = [
    { path: '/web/products/compliance-checker', priority: 0.65 },
    { path: '/web/products/fee-calculator', priority: 0.6 },
    { path: '/web/products/market-analysis', priority: 0.6 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = [
    ...highTraffic.flatMap(({ path, priority }) =>
      localizedUrls(path, now, 'weekly', priority),
    ),
    ...core.flatMap(({ path, priority }) =>
      localizedUrls(path, now, 'weekly', priority),
    ),
    ...legal.flatMap(({ path, priority }) =>
      localizedUrls(path, now, 'monthly', priority),
    ),
    ...products.flatMap(({ path, priority }) =>
      localizedUrls(path, now, 'monthly', priority),
    ),
  ];

  const blogs = await prisma.blog.findMany({
    select: { slug: true, publishedAt: true },
  });

  const blogRoutes = blogs.flatMap((blog) =>
    localizedUrls(`/web/blog/${blog.slug}`, blog.publishedAt, 'weekly', 0.7),
  );

  const updates = await prisma.update.findMany({
    select: { slug: true, publishedAt: true },
  });

  const updateRoutes = updates.flatMap((update) =>
    localizedUrls(`/web/updates/${update.slug}`, update.publishedAt, 'weekly', 0.65),
  );

  return [...staticRoutes, ...blogRoutes, ...updateRoutes];
}
