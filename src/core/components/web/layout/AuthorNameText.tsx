import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Matches page locale so `lang` is correct for Arabic vs Latin glyphs. */
  isArabic: boolean;
  className?: string;
};

/** Author name in Amiri Quran; `font-semibold` adds light synthetic bold (face is 400-only). */
export function AuthorNameText({ children, isArabic, className = '' }: Props) {
  return (
    <span lang={isArabic ? 'ar' : 'en'} className={`font-amiriQuran font-semibold ${className}`.trim()}>
      {children}
    </span>
  );
}
