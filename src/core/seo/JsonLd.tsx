/**
 * Renders Schema.org JSON-LD for search engines, answer engines, and AI crawlers.
 * https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD requires a script blob
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
