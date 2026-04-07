'use client';

import { useEffect, useState, FormEvent } from 'react';
import type { LocalizedBlogCategory } from '@/core/types/web/blog';
import { Link, useRouter } from '@/core/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { FiGrid, FiHash, FiFilter, FiSearch } from 'react-icons/fi';
import { useBlogListHref } from '@/core/components/web/blog/useBlogListHref';

interface BlogFiltersProps {
  categories: LocalizedBlogCategory[];
  isArabic: boolean;
}

export function BlogFilters({ categories, isArabic }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const href = useBlogListHref();
  const selectedCategory = searchParams.get('category') || '';
  const qFromUrl = searchParams.get('q') || '';

  const [query, setQuery] = useState(qFromUrl);

  useEffect(() => {
    setQuery(qFromUrl);
  }, [qFromUrl]);

  const pillBase =
    'group flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wide border transition-all duration-200 whitespace-nowrap shrink-0';

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dest = href({
      page: '1',
      q: query.trim() || undefined,
    });
    router.push(dest, { scroll: false });
  };

  const clearSearch = () => {
    setQuery('');
    router.push(
      href({
        page: '1',
        q: undefined,
      }),
      { scroll: false },
    );
  };

  return (
    <section className="sticky top-[64px] z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest pl-2 border-l border-zinc-200 dark:border-zinc-800 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-2 shrink-0">
            <FiFilter className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تصفية' : 'FILTER'}</span>
          </div>

          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-1 mask-linear-fade min-w-0">
            <Link
              href={href({ category: undefined, page: '1' })}
              scroll={false}
              className={`${pillBase}
                ${selectedCategory === ''
                  ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900 shadow-sm'
                  : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }
              `}
            >
              <FiGrid className={`w-3.5 h-3.5 ${selectedCategory === '' ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
              <span>{isArabic ? 'الكل' : 'ALL'}</span>
            </Link>

            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 self-center shrink-0" />

            {categories.map((category) => {
              const isActive = selectedCategory === category.slug;
              return (
                <Link
                  key={category.id}
                  href={href({ category: category.slug, page: '1' })}
                  scroll={false}
                  className={`${pillBase} gap-1.5
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
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 ms-1 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 shrink-0 w-full lg:w-auto lg:max-w-xs"
          >
            <div className="relative flex-1 min-w-0">
              <FiSearch className="absolute start-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              <input
                type="search"
                name="blog-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isArabic ? 'بحث في العناوين والوسوم…' : 'Search titles & tags…'}
                className="w-full h-10 ps-9 pe-3 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="h-10 shrink-0 rounded-button border border-zinc-200 bg-zinc-900 px-3 font-mono text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
            >
              {isArabic ? 'بحث' : 'GO'}
            </button>
            {qFromUrl ? (
              <button
                type="button"
                onClick={clearSearch}
                className="h-10 px-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white shrink-0"
              >
                {isArabic ? 'مسح' : 'CLR'}
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
