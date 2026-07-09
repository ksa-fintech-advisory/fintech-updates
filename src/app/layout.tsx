import type { ReactNode } from 'react';

/**
 * Minimal root layout required by the App Router for `/_not-found`.
 * Locale-specific chrome lives in `src/app/[locale]/layout.tsx`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
