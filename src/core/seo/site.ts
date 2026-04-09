/** Canonical site origin — align with `metadataBase` in `[locale]/layout.tsx`. */
const SITE_URL_FALLBACK = 'https://arab-fintech.com';

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim() || SITE_URL_FALLBACK;
  return raw.replace(/\/$/, '');
}

export const SITE_NAME = 'Maal Tech';
export const SITE_NAME_AR = 'مال تك';

/** Share preview + JSON-LD logo; only assets under `public/favicon_io/`. */
export const SITE_DEFAULT_OG_IMAGE = '/favicon_io/android-chrome-512x512.png';
