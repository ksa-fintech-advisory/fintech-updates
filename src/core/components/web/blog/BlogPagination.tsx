'use client';

import { Link, usePathname } from '@/core/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useBlogListHref } from '@/core/components/web/blog/useBlogListHref';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  isArabic: boolean;
}

/** Page numbers in order; `-1` means ellipsis gap. */
function visiblePageButtons(current: number, total: number): number[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const set = new Set<number>();
  set.add(1);
  set.add(total);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) set.add(p);
  }
  const sorted = Array.from(set).sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) {
      out.push(-1);
    }
    out.push(sorted[i]!);
  }
  return out;
}

const pageBtnClass = (active: boolean) =>
  `
                  w-10 h-10 flex items-center justify-center rounded-md border text-sm font-mono transition-all duration-200
                  ${active
                    ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white'
                  }
                `;

export function BlogPagination({ currentPage, totalPages, isArabic }: BlogPaginationProps) {
  const href = useBlogListHref();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const buttons = visiblePageButtons(currentPage, totalPages);

  const navClass =
    'group h-10 px-4 flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-all';

  return (
    <AnimatedSection key={`pg-${pathname}-${searchParams.toString()}`} delay={0.1}>
      <div className="flex justify-center items-center gap-2 mt-16 select-none flex-wrap">

        {currentPage <= 1 ? (
          <span
            className={`${navClass} opacity-50 cursor-not-allowed pointer-events-none`}
            aria-disabled
          >
            {isArabic ? <FiChevronRight /> : <FiChevronLeft />}
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider">
              {isArabic ? 'السابق' : 'PREV'}
            </span>
          </span>
        ) : (
          <Link href={href({ page: String(currentPage - 1) })} scroll={false} className={navClass}>
            {isArabic ? <FiChevronRight /> : <FiChevronLeft />}
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider">
              {isArabic ? 'السابق' : 'PREV'}
            </span>
          </Link>
        )}

        <div className="flex gap-2 mx-2 flex-wrap justify-center">
          {buttons.map((page, idx) =>
            page < 0 ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-10 h-10 flex items-center justify-center text-zinc-400 font-mono text-sm"
                aria-hidden
              >
                …
              </span>
            ) : currentPage === page ? (
              <span key={page} className={pageBtnClass(true)} aria-current="page">
                {page}
              </span>
            ) : (
              <Link key={page} href={href({ page: String(page) })} scroll={false} className={pageBtnClass(false)}>
                {page}
              </Link>
            ),
          )}
        </div>

        {currentPage >= totalPages ? (
          <span
            className={`${navClass} opacity-50 cursor-not-allowed pointer-events-none`}
            aria-disabled
          >
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider">
              {isArabic ? 'التالي' : 'NEXT'}
            </span>
            {isArabic ? <FiChevronLeft /> : <FiChevronRight />}
          </span>
        ) : (
          <Link href={href({ page: String(currentPage + 1) })} scroll={false} className={navClass}>
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider">
              {isArabic ? 'التالي' : 'NEXT'}
            </span>
            {isArabic ? <FiChevronLeft /> : <FiChevronRight />}
          </Link>
        )}
      </div>
    </AnimatedSection>
  );
}
