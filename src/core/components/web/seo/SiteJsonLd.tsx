import { getSiteUrl, SITE_NAME } from '@/core/seo/site';

const TWITTER = 'https://x.com/mohfintech';
const LINKEDIN = 'https://www.linkedin.com/in/mohfintech/';

/**
 * Organization + WebSite + Person for rich results (injected on public web routes only).
 */
export default function SiteJsonLd() {
  const base = getSiteUrl();

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        name: SITE_NAME,
        alternateName: 'مال تك',
        url: base,
        inLanguage: ['en', 'ar'],
        publisher: { '@id': `${base}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        name: SITE_NAME,
        alternateName: 'مال تك',
        url: base,
        logo: `${base}/og-image.png`,
        sameAs: [TWITTER, LINKEDIN],
      },
      {
        '@type': 'Person',
        '@id': `${base}/#mohammed-abdo`,
        name: 'Mohammed Abdo',
        alternateName: 'محمد عبده',
        jobTitle: 'FinTech advisor & engineer',
        url: `${base}/en/about`,
        worksFor: { '@id': `${base}/#organization` },
        sameAs: [TWITTER, LINKEDIN],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
