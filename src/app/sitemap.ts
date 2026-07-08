import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/core/seo/site';
import { getAllBlogSlugs } from '@/services/blog/staticBlogs';
import { getUpdateSitemapEntries } from '@/services/updates/staticUpdateService';

export const runtime = 'edge';

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

  const highTraffic: Array<{ path: string; priority: number }> = [{ path: '', priority: 1 }];

  const core: Array<{ path: string; priority: number }> = [
    { path: '/about', priority: 0.9 },
    { path: '/contact', priority: 0.85 },
    { path: '/blog', priority: 0.9 },
    { path: '/roadmap', priority: 0.95 },
    { path: '/updates', priority: 0.85 },
    { path: '/products', priority: 0.8 },
    { path: '/courses', priority: 0.85 },
    { path: '/courses/fintech-fundamentals', priority: 0.85 },
    { path: '/courses/fintech-fundamentals/register', priority: 0.75 },
    { path: '/docs', priority: 0.55 },
  ];

  const legal: Array<{ path: string; priority: number }> = [
    { path: '/privacy', priority: 0.35 },
    { path: '/terms', priority: 0.35 },
  ];

  const products: Array<{ path: string; priority: number }> = [
    { path: '/products/compliance-checker', priority: 0.65 },
    { path: '/products/fee-calculator', priority: 0.6 },
    { path: '/products/market-analysis', priority: 0.6 },
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

  const staticBlogs = getAllBlogSlugs();
  const blogRoutes = staticBlogs.flatMap((blog) =>
    localizedUrls(`/blog/${blog.slug}`, new Date(blog.publishedAt), 'weekly', 0.7),
  );

  const updates = getUpdateSitemapEntries();

  const updateRoutes = updates.flatMap((update) =>
    localizedUrls(`/updates/${update.slug}`, update.publishedAt, 'weekly', 0.65),
  );

  return [...staticRoutes, ...blogRoutes, ...updateRoutes];
}
