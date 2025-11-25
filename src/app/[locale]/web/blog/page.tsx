'use client';

import { blogService } from '@/services/api/mock';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Blog, BlogCategory } from '@/core/types/web/blog';
import dynamic from 'next/dynamic';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

const WaveField3D = dynamic(() => import('@/core/components/web/blog/WaveField3D'), { ssr: false });

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
      {/* Hero Section with 3D Background */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 md:py-28 overflow-hidden">
        {/* 3D Wave Field Background */}
        <WaveField3D />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/40 to-primary-900 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="down">
              <div className="inline-block px-6 py-2 bg-white/10 rounded-full backdrop-blur-md mb-6 border border-white/20 shadow-lg">
                <span className="text-sm font-bold tracking-wider uppercase text-accent-300">
                  📝 {isArabic ? 'المدونة' : 'Blog'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent drop-shadow-xl">
                  {isArabic ? 'المدونة' : 'Blog'}
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                {isArabic ? 'رؤى وتحديثات من عالم التقنية المالية' : 'Insights and updates from the FinTech world'}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-grey-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${selectedCategory === ''
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
                className={`px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary/30'
                    : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                  }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{isArabic ? category.name.ar : category.name.en}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gradient-to-b from-grey-50 to-white min-h-screen relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : blogs.length === 0 ? (
              <AnimatedSection>
                <div className="text-center py-32 bg-white rounded-3xl shadow-soft border border-grey-100">
                  <div className="text-6xl mb-6">📭</div>
                  <p className="text-grey-600 text-xl font-medium">
                    {isArabic ? 'لا توجد مقالات في هذه الفئة' : 'No blogs found in this category'}
                  </p>
                </div>
              </AnimatedSection>
          ) : (
            <>
                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                      <StaggerItem key={blog.id}>
                        <Link
                      href={`/${locale}/web/blog/${blog.slug}`}
                      className="group block h-full"
                    >
                      <article className="h-full bg-white rounded-2xl shadow-medium hover:shadow-glow transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] border border-grey-100 hover:border-primary-200 flex flex-col">
                        {/* Image Container */}
                        <div className="aspect-video bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 relative overflow-hidden">
                          <div
                            className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-500"
                            style={{ backgroundColor: blog.category.color }}
                          ></div>

                          {/* Decorative Pattern Overlay */}
                          <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10"></div>

                          {/* Category Badge */}
                          <div className="absolute bottom-4 left-4">
                            <span
                              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-lg transform group-hover:scale-105 transition-transform"
                              style={{
                                backgroundColor: `${blog.category.color}`,
                                color: 'white',
                              }}
                            >
                              <span className="text-base">{blog.category.icon}</span>
                              {isArabic ? blog.category.name.ar : blog.category.name.en}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Meta Info */}
                          <div className="flex items-center gap-3 mb-4 text-xs font-medium text-grey-500 uppercase tracking-wide">
                            <span className="flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {blog.readTime} {isArabic ? 'دقيقة' : 'MIN'}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-grey-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                            {isArabic ? blog.title.ar : blog.title.en}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-grey-600 mb-6 line-clamp-3 leading-relaxed text-sm flex-1">
                            {isArabic ? blog.excerpt.ar : blog.excerpt.en}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-grey-100 mt-auto">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {(isArabic ? blog.author.name.ar : blog.author.name.en).charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-grey-700 group-hover:text-primary-600 transition-colors">
                                {isArabic ? blog.author.name.ar : blog.author.name.en}
                              </span>
                            </div>
                            <span className={`text-accent group-hover:translate-x-1 transition-transform inline-block font-bold text-lg ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
                              →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </StaggerItem>
                ))}
                  </StaggerContainer>

                  {/* Pagination */}
                  {totalPages > 1 && (
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
                          className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${currentPage === page
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
                  )}
                </>
          )}
        </div>
      </section>
    </div>
  );
}
