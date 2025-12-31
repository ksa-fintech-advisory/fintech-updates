import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { blogApiService } from '@/services/api/blogs';

export default async function FeaturedArticles({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';

  // Fetch featured blogs from API
  const featuredArticles = await blogApiService.getFeaturedBlogs(locale, 3);

  if (featuredArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/50 to-transparent opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent-50/50 to-transparent opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
            {isArabic ? 'المقالات المميزة' : 'Featured Articles'}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto rounded-full mb-6"></div>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            {isArabic
              ? 'تحليلات عميقة ورؤى حصرية من خبراء الصناعة'
              : 'In-depth analysis and exclusive insights from industry experts'}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article: any) => (
            <StaggerItem key={article.id}>
              <Link
                href={`/${locale}/web/blog/${article.slug}`}
                className="group block h-full"
              >
                <article className="h-full bg-white rounded-3xl shadow-medium hover:shadow-glow transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-grey-100 hover:border-primary-200 flex flex-col">
                  {/* Image with Enhanced Gradient Overlay */}
                  <div className="aspect-video bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 relative overflow-hidden">
                    {/* Placeholder for actual image if available, using gradient for now */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>

                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span
                        className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-lg transform group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: article.category.color || '#3B82F6',
                          color: 'white',
                        }}
                      >
                        {article.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Content with Enhanced Spacing */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Meta Info with Enhanced Typography */}
                    <div className="flex items-center gap-3 text-xs font-semibold text-grey-400 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(article.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-grey-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-grey-600 mb-6 line-clamp-3 leading-relaxed text-sm flex-1">
                      {article.excerpt}
                    </p>

                    {/* Footer with Author */}
                    <div className="pt-6 border-t border-grey-100 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                          {article.author.name?.charAt(0) || 'A'}
                        </div>
                        <span className="text-sm font-semibold text-grey-700 group-hover:text-primary-600 transition-colors">
                          {article.author.name || 'Author'}
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
      </div>
    </section>
  );
}
