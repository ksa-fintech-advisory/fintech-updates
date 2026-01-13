import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { blogApiService } from '@/services/api/blogs';
import { FiArrowRight, FiArrowLeft, FiCalendar, FiUser, FiTag } from 'react-icons/fi';

// Helper component for abstract pattern if no image exists
// This keeps the "Engineering" look consistent even without assets
const PatternPlaceholder = () => (
  <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-zinc-200 dark:bg-zinc-700 rounded-tl-full opacity-50" />
    <div className="absolute top-0 left-0 w-24 h-24 border border-zinc-300 dark:border-zinc-600 rounded-br-full opacity-50" />
  </div>
);

export default async function FeaturedArticles({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';

  // Fetch featured blogs from API
  const featuredArticles = await blogApiService.getFeaturedBlogs(locale, 3);

  if (featuredArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">

      {/* 1. Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header: Technical & Direct */}
        <AnimatedSection className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div>
            <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 block">
              {isArabic ? '// سجل_الأفكار' : '// INSIGHTS_LOG'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {isArabic ? 'أحدث التحليلات المالية' : 'Latest Market Analysis'}
            </h2>
          </div>

          <Link
            href={`/${locale}/web/blog`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {isArabic ? 'عرض الأرشيف' : 'VIEW_ARCHIVE'}
            {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
          </Link>
        </AnimatedSection>

        {/* Articles Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article: any) => (
            <StaggerItem key={article.id} className="h-full">
              <Link
                href={`/${locale}/web/blog/${article.slug}`}
                className="group block h-full outline-none"
              >
                <article className="h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-zinc-200/50 dark:group-hover:shadow-black/50">

                  {/* Image Area - Aspect Ratio 16:9 */}
                  <div className="relative aspect-video overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                    {/* Logic: Use actual image if available, else PatternPlaceholder.
                        Assuming article.image might be null/undefined.
                     */}
                    {article.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <PatternPlaceholder />
                    )}

                    {/* Category Tag - Absolute Positioning */}
                    <div className="absolute top-4 left-4 right-auto rtl:right-4 rtl:left-auto">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 shadow-sm">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: article.category.color || '#10b981' }}
                        />
                        {article.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col">

                    {/* Meta Data Row */}
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-4 border-dashed">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="w-3.5 h-3.5" />
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </time>
                      </div>
                      {/* Optional: Read Time */}
                      <div className="flex items-center gap-1.5">
                        <FiTag className="w-3.5 h-3.5" />
                        <span>5 MIN READ</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                      {article.excerpt}
                    </p>

                    {/* Author Footer */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                          <FiUser className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-mono uppercase tracking-wide">
                          {article.author.name || 'EDITOR'}
                        </span>
                      </div>

                      <div className={`text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-all transform ${isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                        {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                      </div>
                    </div>

                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile View Archive Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/${locale}/web/blog`}
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {isArabic ? 'عرض الأرشيف الكامل' : 'VIEW_FULL_ARCHIVE'}
            {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
          </Link>
        </div>

      </div>
    </section>
  );
}