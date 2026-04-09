'use client';

type NavItem = { href: string; label: string };

type Props = {
  kicker: string;
  items: NavItem[];
  isArabic: boolean;
};

export function AboutPortfolioSubnav({ kicker, items, isArabic }: Props) {
  return (
    <nav
      aria-label={isArabic ? 'أقسام الصفحة' : 'On this page'}
      className="sticky top-14 z-30 border-b border-zinc-200/90 bg-white/90 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 md:top-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:gap-6 sm:py-2.5"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
            {kicker}
          </span>
          <ul className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2 sm:gap-x-0">
            {items.map(({ href, label }) => (
              <li key={href} className="contents">
                <a
                  href={href}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
