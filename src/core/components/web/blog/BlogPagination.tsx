'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  isArabic: boolean;
}

export function BlogPagination({ currentPage, totalPages, isArabic }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatedSection delay={0.1}>
      <div className="flex justify-center items-center gap-2 mt-16 select-none">

        {/* Previous Button - Command Style */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group h-10 px-4 flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-zinc-200 transition-all"
        >
          {isArabic ? <FiChevronRight /> : <FiChevronLeft />}
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider">
            {isArabic ? 'السابق' : 'PREV'}
          </span>
        </button>

        {/* Page Numbers - Keycap Style */}
        <div className="flex gap-2 mx-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-md border text-sm font-mono transition-all duration-200
                  ${isActive
                    ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white'
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button - Command Style */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group h-10 px-4 flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-zinc-200 transition-all"
        >
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider">
            {isArabic ? 'التالي' : 'NEXT'}
          </span>
          {isArabic ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>
    </AnimatedSection>
  );
}