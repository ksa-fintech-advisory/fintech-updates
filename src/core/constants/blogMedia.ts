/** Neutral hero when a post has no `featuredImage` (article detail + Open Graph). */
export const BLOG_HERO_DEFAULT_IMAGE = '/images/blog-hero-default.svg';

/** Real cover URL only — listing cards use a CSS placeholder when this is empty (no branded poster). */
export function blogCardImageUrl(featuredImage: string | null | undefined): string | null {
  const s = featuredImage?.trim();
  return s && s.length > 0 ? s : null;
}

export function blogDetailHeroSrc(featuredImage: string | null | undefined): string {
  const s = featuredImage?.trim();
  return s && s.length > 0 ? s : BLOG_HERO_DEFAULT_IMAGE;
}
