import type { Metadata } from 'next';
import { getSiteUrl, SITE_NAME } from './site';

type BuildOpts = {
  locale: string;
  title: string;
  description: string;
  /** Path after locale; use `''` for the locale home (canonical `/en`, `/ar`). */
  path: string;
  /** Extra phrases for crawlers / answer engines (optional). */
  keywords?: string[];
  /** Custom OpenGraph/Twitter image path (e.g. /images/og-rate.png) */
  image?: string;
};

/**
 * Per-locale page metadata with hreflang-style alternates and Open Graph.
 */
export function buildPageMetadata({ locale, title, description, path, keywords, image }: BuildOpts): Metadata {
  const base = getSiteUrl();
  const canonicalPath = `/${locale}${path}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${base}/en${path}`,
        ar: `${base}/ar${path}`,
        'x-default': `${base}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_SA'],
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
