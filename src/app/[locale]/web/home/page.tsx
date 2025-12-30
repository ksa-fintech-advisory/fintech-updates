
import { homeService } from '@/services/api/mock';
import { updateApiService } from '@/services/api/updateApi';
import { statisticApiService } from '@/services/api/statisticApi';
import { heroApiService } from '@/services/api/heroApi';
import { blogApiService } from '@/services/api/blogs';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

const Hero3D = dynamic(() => import('@/core/components/web/home/Hero3D'), { ssr: false });

export default async function HomePage({ params }: { params: { locale: string } }) {
  const homeContent = await homeService.getHomeContent();
  const locale = params.locale;
  const isArabic = locale === 'ar';

  // Fetch real updates from API
  const latestUpdates = await updateApiService.getUpdates({
    featured: true,
    limit: 5,
    lang: locale,
  });

  // Fetch real statistics from API
  const statistics = await statisticApiService.getStatistics(locale);

  // Fetch real hero from API
  const hero = await heroApiService.getActiveHero(locale);

  // Fetch featured blogs from API
  const featuredArticles = await blogApiService.getFeaturedBlogs(locale, 3);

  return (
    <div className="w-full">
      {/* Hero Section with 3D Animation */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* 3D Background */}
        <Hero3D />

        {/* Overlay Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/50 to-primary-900 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                  {hero.title}
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <p className="text-xl md:text-2xl mb-4 text-white/90 font-light tracking-wide">
                {hero.subtitle}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.6}>
              <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
                {hero.description}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.8}>
              <div className="flex flex-wrap gap-4 justify-center">
                {hero.ctaButtons.map((button: any, index: number) => (
                  <Link
                    key={index}
                    href={button.href}
                    className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-glow-accent ${button.variant === 'primary'
                        ? 'bg-accent hover:bg-accent-600 text-white shadow-lg shadow-accent/30'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {button.label}
                      <svg className={`w-5 h-5 transition-transform ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24 fill-grey-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Statistics Section with Enhanced Cards */}
      <section className="py-20 bg-grey-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat: any) => (
              <StaggerItem key={stat.id}>
                <div
                  className="relative group bg-white rounded-3xl p-8 text-center shadow-soft hover:shadow-hard transition-all duration-500 transform hover:-translate-y-2 border border-grey-100 hover:border-primary-200 h-full flex flex-col justify-center items-center"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className="relative z-10 text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-primary-500">
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <div className="relative z-10 text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="relative z-10 text-sm font-semibold text-grey-600 group-hover:text-primary-700 transition-colors leading-tight">
                    {stat.label}
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Articles with Premium Cards */}
      {featuredArticles.length > 0 && (
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
                    href={`/${locale}/web/article/${article.slug}`}
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
      )}

      {/* Latest Updates Timeline - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-grey-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
              {isArabic ? 'آخر التحديثات' : 'Latest Updates'}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-8">
            <StaggerContainer staggerDelay={0.2}>
              {latestUpdates.map((update: any, idx: number) => (
                <StaggerItem key={update.id} className="group relative">
                  {/* Timeline Line */}
                  {idx !== latestUpdates.length - 1 && (
                    <div className="absolute left-[2.25rem] top-20 bottom-[-2rem] w-0.5 bg-gradient-to-b from-primary-200 to-transparent z-0"></div>
                  )}

                  <Link href={`/web/updates/${update.slug}`}>
                    <div
                      className="flex gap-6 p-8 bg-white rounded-3xl shadow-soft hover:shadow-hard transition-all duration-500 transform hover:-translate-y-1 border border-grey-100 group-hover:border-primary-200 relative z-10 cursor-pointer"
                    >
                      {/* Icon - Centered */}
                      <div className="flex-shrink-0">
                        <div className="w-18 h-18 p-4 bg-gradient-to-br from-primary-50 to-white rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-primary-100 text-primary-600">
                          {update.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <h3 className="font-bold text-grey-900 text-xl group-hover:text-primary-600 transition-colors">
                            {update.title}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-500 bg-grey-50 px-3 py-1 rounded-full border border-grey-100">
                            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <p className="text-grey-600 mb-0 leading-relaxed text-base">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
