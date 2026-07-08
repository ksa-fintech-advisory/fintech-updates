import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/core/seo/site';

export const runtime = 'edge';

const disallow: string[] = [];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: 'GPTBot', allow: '/', disallow, crawlDelay: 1 },
      { userAgent: 'ChatGPT-User', allow: '/', disallow, crawlDelay: 1 },
      { userAgent: 'Google-Extended', allow: '/', disallow, crawlDelay: 1 },
      { userAgent: 'anthropic-ai', allow: '/', disallow },
      { userAgent: 'Claude-Web', allow: '/', disallow, crawlDelay: 1 },
      { userAgent: 'ClaudeBot', allow: '/', disallow, crawlDelay: 1 },
      { userAgent: 'PerplexityBot', allow: '/', disallow },
      { userAgent: 'Amazonbot', allow: '/', disallow, crawlDelay: 1 },
      { userAgent: 'Bytespider', allow: '/', disallow },
      { userAgent: 'CCBot', allow: '/', disallow, crawlDelay: 1 },
      { userAgent: 'Applebot-Extended', allow: '/', disallow, crawlDelay: 1 },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ''),
  };
}
