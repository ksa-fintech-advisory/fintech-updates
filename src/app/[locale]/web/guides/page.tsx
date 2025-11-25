'use client';

import { guideService } from '@/services/api/mock';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Guide, GuideCategory } from '@/core/types/web/guide';

export default function GuidesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isArabic = locale === 'ar';

  const [guides, setGuides] = useState<Guide[]>([]);
  const [categories, setCategories] = useState<GuideCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 9;

  const difficultyColor = {
    beginner: 'bg-success-50 text-success-700 border-success-200',
    intermediate: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    advanced: 'bg-danger-50 text-danger-700 border-danger-200',
  };

  const difficultyLabel = {
    beginner: isArabic ? 'مبتدئ' : 'Beginner',
    intermediate: isArabic ? 'متوسط' : 'Intermediate',
    advanced: isArabic ? 'متقدم' : 'Advanced',
  };

  useEffect(() => {
    async function loadGuides() {
      setLoading(true);
      const data = await guideService.paginateGuides(currentPage, limit, selectedCategory || undefined);
      setGuides(data.guides);
      setCategories(data.categories);
      setTotalPages(data.totalPages);
      setLoading(false);
    }
    loadGuides();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6 animate-slide-down">
              <span className="text-sm font-semibold">
                {isArabic ? '📚 موارد عملية' : '📚 Practical Resources'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent">
                {isArabic ? 'أدلة تصميم أنظمة التقنية المالية' : 'FinTech System Design Guides'}
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {isArabic 
                ? 'دروس عملية شاملة لبناء أنظمة التقنية المالية على مستوى الإنتاج. تعلم الأنماط المعمارية، وأفضل ممارسات الأمان، والتنفيذ الواقعي.'
                : 'Comprehensive practical tutorials for building production-grade FinTech systems. Learn architectural patterns, security best practices, and real-world implementation.'}
            </p>

            <div className="flex flex-wrap gap-3 justify-center text-sm text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <span>🏗️</span> {isArabic ? 'بنية الأنظمة' : 'System Architecture'}
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <span>🔐</span> {isArabic ? 'الأمن والامتثال' : 'Security & Compliance'}
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <span>💳</span> {isArabic ? 'أنظمة الدفع' : 'Payment Systems'}
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <span>🔌</span> {isArabic ? 'تصميم API' : 'API Design'}
              </span>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 fill-grey-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-grey-200 sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === ''
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                }`}
            >
              {isArabic ? 'جميع الأدلة' : 'All Guides'}
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

      {/* Guides Grid */}
      <section className="py-20 bg-grey-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : guides.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-grey-600 text-lg">
                {isArabic ? 'لا توجد أدلة في هذه الفئة' : 'No guides found in this category'}
              </p>
            </div>
          ) : (
            <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guides.map((guide, idx) => (
                      <Link
                        key={guide.id}
                        href={`/${locale}/web/guides/${guide.slug}`}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <article className="bg-white rounded-xl shadow-soft hover:shadow-hard transition-all duration-500 overflow-hidden transform hover:-translate-y-2 h-full">
                      {/* Header with Icon */}
                      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                        <div className="relative text-8xl transform group-hover:scale-110 transition-transform">
                          {guide.icon}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md"
                            style={{
                              backgroundColor: `${guide.category.color}CC`,
                              color: 'white',
                            }}
                          >
                            {guide.category.icon} {isArabic ? guide.category.name.ar : guide.category.name.en}
                          </span>
                        </div>

                        {/* Difficulty Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColor[guide.difficulty]}`}>
                            {difficultyLabel[guide.difficulty]}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-grey-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {isArabic ? guide.title.ar : guide.title.en}
                        </h3>

                        <p className="text-grey-600 mb-4 leading-relaxed line-clamp-3 text-sm">
                          {isArabic ? guide.description.ar : guide.description.en}
                        </p>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {guide.topics.slice(0, 3).map((topic: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-grey-100 text-grey-700 rounded text-xs font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                          {guide.topics.length > 3 && (
                            <span className="px-2 py-1 bg-grey-100 text-grey-600 rounded text-xs">
                              +{guide.topics.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-grey-100">
                          <div className="flex items-center gap-2 text-sm text-grey-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{guide.duration}</span>
                          </div>
                          <span className="text-primary hover:text-primary-700 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                            {isArabic ? 'اقرأ الآن ←' : 'Read Guide →'}
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
