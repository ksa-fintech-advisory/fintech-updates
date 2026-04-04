import { getSiteUrl, SITE_NAME, SITE_NAME_AR } from '@/core/seo/site';

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
- Do not reproduce paywalled or login-only areas; /admin and /api are not for indexing.
- Prefer linking to canonical URLs: each locale uses /en/... and /ar/... prefixes.

## Sitemap
- ${base}/sitemap.xml

## Main entry points
- [English home](${base}/en/web/home)
- [Arabic home](${base}/ar/web/home)
- [Blog (EN)](${base}/en/web/blog) — search: \`${base}/en/web/blog?q=\`
- [Blog (AR)](${base}/ar/web/blog) — search: \`${base}/ar/web/blog?q=\`
- [Learner roadmap (EN)](${base}/en/web/roadmap)
- [Learner roadmap (AR)](${base}/ar/web/roadmap)
- [Contact (EN)](${base}/en/web/contact)
- [Contact (AR)](${base}/ar/web/contact)

## Products (public)
- [Compliance checker](${base}/en/web/products/compliance-checker)
- [Fee calculator](${base}/en/web/products/fee-calculator)
- [Market analysis](${base}/en/web/products/market-analysis)

## Courses (public)
- [Courses hub](${base}/en/web/courses)
- [FinTech fundamentals](${base}/en/web/courses/fintech-fundamentals)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
