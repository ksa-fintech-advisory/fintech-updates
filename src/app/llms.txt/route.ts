import { getSiteUrl, SITE_NAME, SITE_NAME_AR } from '@/core/seo/site';

export const runtime = 'edge';

/**
 * llms.txt — machine-readable site summary for LLM / AI crawlers.
 * @see https://llmstxt.org/
 */
export function GET() {
  const base = getSiteUrl();

  const body = `# ${SITE_NAME} (${SITE_NAME_AR})

> Bilingual (English / Arabic) FinTech consulting site: engineering blog, free learner roadmap, product tools, courses, and contact. Content focuses on Saudi Arabia and GCC regulatory context (e.g. SAMA, PDPL), payments, open banking, and compliance-oriented product design.

## Policies
- Public marketing and blog content may be summarized with attribution (site name + URL).
- Public marketing site only; respect robots.txt for any future restricted paths.
- Prefer linking to canonical URLs: each locale uses /en/... and /ar/... prefixes.

## Sitemap
- ${base}/sitemap.xml

## Main entry points
- [English home](${base}/en)
- [Arabic home](${base}/ar)
- [Blog (EN)](${base}/en/blog) — search: \`${base}/en/blog?q=\`
- [Blog (AR)](${base}/ar/blog) — search: \`${base}/ar/blog?q=\`
- [Learner roadmap (EN)](${base}/en/roadmap)
- [Learner roadmap (AR)](${base}/ar/roadmap)
- [Contact (EN)](${base}/en/contact)
- [Contact (AR)](${base}/ar/contact)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
