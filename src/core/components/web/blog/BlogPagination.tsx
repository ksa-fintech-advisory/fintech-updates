'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

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
    // Scroll to top handled by standard navigation usually, but we can force it if needed
    // In server components, a scroll to top usually happens on navigation unless prevented.
    // We can add logic here if needed, but router.push should be enough.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatedSection delay={0.3}>
      <div className="flex justify-center items-center gap-3 mt-16">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-3 rounded-xl bg-white text-grey-700 hover:bg-primary hover:text-white font-semibold transition-all duration-300 shadow-soft hover:shadow-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-grey-700 transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isArabic ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                currentPage === page
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary/30'
                  : 'bg-white text-grey-700 hover:bg-grey-100 shadow-soft'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-3 rounded-xl bg-white text-grey-700 hover:bg-primary hover:text-white font-semibold transition-all duration-300 shadow-soft hover:shadow-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-grey-700 transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isArabic ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>
    </AnimatedSection>
  );
}
