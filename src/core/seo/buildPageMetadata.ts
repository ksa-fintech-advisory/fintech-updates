import type { Metadata } from 'next';
import { getSiteUrl, SITE_NAME } from './site';

type BuildOpts = {
  locale: string;
  title: string;
  description: string;
  /** Path after locale, e.g. `/web/home` */
  path: string;
};

/**
 * Per-locale page metadata with hreflang-style alternates and Open Graph.
 */
export function buildPageMetadata({ locale, title, description, path }: BuildOpts): Metadata {
  const base = getSiteUrl();
  const canonicalPath = `/${locale}${path}`;

  return {
    title,
    description,
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
