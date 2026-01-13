'use client';

import { LocalizedBlogCategory } from '@/core/types/web/blog';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FiGrid, FiHash, FiFilter } from 'react-icons/fi';

interface BlogFiltersProps {
  categories: LocalizedBlogCategory[];
  isArabic: boolean;
}

export function BlogFilters({ categories, isArabic }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedCategory = searchParams.get('category') || '';

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }

    // Reset to page 1 when filter changes
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="sticky top-[64px] z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">

          {/* Label (Desktop Only) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest pl-2 ml-4 border-l border-zinc-200 dark:border-zinc-800 rtl:mr-4 rtl:ml-0 rtl:border-l-0 rtl:border-r">
            <FiFilter className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تصفية_حسب:' : 'FILTER_BY:'}</span>
          </div>

          {/* Filter List */}
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-2 mask-linear-fade">

            {/* "All" Button */}
            <button
              onClick={() => handleCategoryChange('')}
              className={`
                group flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wide border transition-all duration-200 whitespace-nowrap
                ${selectedCategory === ''
                  ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900 shadow-sm'
                  : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }
              `}
            >
              <FiGrid className={`w-3.5 h-3.5 ${selectedCategory === '' ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
              <span>{isArabic ? 'الكل' : 'ALL_STREAMS'}</span>
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 self-center shrink-0" />

            {/* Categories */}
            {categories.map((category) => {
              const isActive = selectedCategory === category.slug;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`
                    group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wide border transition-all duration-200 whitespace-nowrap
                    ${isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white shadow-sm'
                      : 'bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300'
                    }
                  `}
                >
                  <span className={`text-[10px] ${isActive ? 'text-primary-600' : 'text-zinc-400 group-hover:text-zinc-500'}`}>
                    <FiHash />
                  </span>
                  <span>{category.name}</span>

                  {/* Optional: Active Dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 ml-1 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}