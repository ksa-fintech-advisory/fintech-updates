'use client';

import { usePathname } from '@/core/i18n/routing';
import { useSearchParams } from 'next/navigation';

/**
 * Build localized blog index URLs (?page & category & q) for next-intl Link.
 * Empty string / null / undefined values remove the query key.
 */
export function useBlogListHref() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return function blogListHref(patch: Record<string, string | null | undefined>) {
    const p = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === undefined || v === '') {
        p.delete(k);
      } else {
        p.set(k, v);
      }
    }
    const qs = p.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };
}
