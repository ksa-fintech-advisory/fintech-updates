'use client';

import { blogService } from '@/services/api/mock';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Blog, BlogCategory } from '@/core/types/web/blog';

export default function BlogPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isArabic = locale === 'ar';

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 9;

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      const filters = selectedCategory ? { category: selectedCategory } : undefined;
      const data = await blogService.paginateBlogs(currentPage, limit, filters);
      setBlogs(data.blogs);
      setCategories(data.categories);
      setTotalPages(data.totalPages);
      setLoading(false);
    }
    loadBlogs();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-saudi text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isArabic ? 'المدونة' : 'Blog'}
            </h1>
            <p className="text-xl text-white/90">
              {isArabic ? 'رؤى وتحديثات من عالم التقنية المالية' : 'Insights and updates from the FinTech world'}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-grey-200 bg-white sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === ''
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                }`}
            >
              {isArabic ? 'جميع الفئات' : 'All Categories'}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${selectedCategory === category.slug
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                  }`}
              >
                <span>{category.icon}</span>
                <span>{isArabic ? category.name.ar : category.name.en}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-grey-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-grey-600 text-lg">
                {isArabic ? 'لا توجد مقالات في هذه الفئة' : 'No blogs found in this category'}
              </p>
            </div>
          ) : (
            <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                      <Link
                        key={blog.id}
                    href={`/${locale}/web/blog/${blog.slug}`}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <article className="h-full bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                      <div className="aspect-video bg-grey-200 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                          style={{ backgroundColor: blog.category.color }}
                        ></div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="px-3 py-1 text-xs font-semibold rounded-full"
                            style={{
                              backgroundColor: `${blog.category.color}15`,
                              color: blog.category.color,
                            }}
                          >
                            {blog.category.icon} {isArabic ? blog.category.name.ar : blog.category.name.en}
                          </span>
                          <span className="text-sm text-grey-500">
                            {blog.readTime} {isArabic ? 'دقيقة قراءة' : 'min read'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-grey-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {isArabic ? blog.title.ar : blog.title.en}
                        </h3>
                        <p className="text-grey-600 mb-4 line-clamp-2">
                          {isArabic ? blog.excerpt.ar : blog.excerpt.en}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-grey-200 rounded-full flex items-center justify-center text-sm font-bold text-grey-700">
                              {(isArabic ? blog.author.name.ar : blog.author.name.en).charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-grey-700">
                              {isArabic ? blog.author.name.ar : blog.author.name.en}
                            </span>
                          </div>
                          <span className="text-primary group-hover:translate-x-2 transition-transform inline-block">
                            →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white text-grey-700 hover:bg-grey-100 font-medium transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isArabic ? '←' : '←'}
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white text-grey-700 hover:bg-grey-100 shadow-soft'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white text-grey-700 hover:bg-grey-100 font-medium transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isArabic ? '→' : '→'}
                      </button>
                    </div>
                  )}
                </>
          )}
        </div>
      </section>
    </div>
  );
}
