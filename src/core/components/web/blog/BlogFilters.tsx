'use client';

import { LocalizedBlogCategory } from '@/core/types/web/blog';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

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
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="border-b border-grey-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === ''
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary/30'
                : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
            }`}
          >
            {isArabic ? 'جميع الفئات' : 'All Categories'}
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                selectedCategory === category.slug
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary/30'
                  : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
