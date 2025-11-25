
import { homeService } from '@/services/api/mock';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const homeContent = await homeService.getHomeContent();
  const locale = params.locale;
  const isArabic = locale === 'ar';

  return (
    <div className="w-full">
      {/* Hero Section with Gradient Animation */}
      <section className="relative bg-gradient-saudi text-white py-24 md:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent">
                {isArabic ? homeContent.hero.title.ar : homeContent.hero.title.en}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {isArabic ? homeContent.hero.subtitle.ar : homeContent.hero.subtitle.en}
            </p>
            <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {isArabic ? homeContent.hero.description.ar : homeContent.hero.description.en}
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {homeContent.hero.ctaButtons.map((button, idx) => (
                <Link
                  key={button.href}
                  href={button.href}
                  className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-glow-accent ${
                    button.variant === 'primary'
                      ? 'bg-accent hover:bg-accent-700 text-grey-900'
                    : 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-sm'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isArabic ? button.label.ar : button.label.en}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 fill-grey-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Statistics Section with Cards */}
      <section className="py-16 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {homeContent.statistics.map((stat, idx) => (
              <div
                key={stat.id}
                className="relative group bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 animate-zoom-in"
                style={{ animationDelay: `${idx * 0.1} s` }}
              >
                <div className="absolute inset-0 bg-gradient-saudi opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-saudi bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-grey-700">
                  {isArabic ? stat.label.ar : stat.label.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles with Modern Cards */}
      {homeContent.featuredArticles.length > 0 && (
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-30"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-saudi bg-clip-text text-transparent mb-4">
                {isArabic ? 'المقالات المميزة' : 'Featured Articles'}
              </h2>
              <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeContent.featuredArticles.map((article, idx) => (
                <Link
                  key={article.id}
                  href={`/${locale}/web/article/${article.slug}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <article className="h-full bg-white rounded-2xl shadow-soft hover:shadow-hard transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                    {/* Image with Gradient Overlay */}
                    <div className="aspect-video bg-gradient-to-br from-primary-400 to-accent-400 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span
                          className="inline-block px-4 py-2 text-sm font-bold rounded-full backdrop-blur-md"
                          style={{
                            backgroundColor: `${article.category.color}CC`,
                            color: 'white',
                          }}
                        >
                          {isArabic ? article.category.name.ar : article.category.name.en}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4 text-sm text-grey-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime} {isArabic ? 'دقيقة قراءة' : 'min read'}
                        </span>
                        <span className="text-grey-400">•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {article.views.toLocaleString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-grey-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {isArabic ? article.title.ar : article.title.en}
                      </h3>

                      <p className="text-grey-600 mb-4 line-clamp-2 leading-relaxed">
                        {isArabic ? article.excerpt.ar : article.excerpt.en}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-grey-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-saudi rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {(isArabic ? article.author.name.ar : article.author.name.en).charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-grey-700">
                            {isArabic ? article.author.name.ar : article.author.name.en}
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
          </div>
        </section>
      )}

      {/* Latest Updates Timeline */}
      <section className="py-20 bg-gradient-to-b from-grey-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-saudi bg-clip-text text-transparent mb-4">
              {isArabic ? 'آخر التحديثات' : 'Latest Updates'}
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {homeContent.latestUpdates.map((update, idx) => (
              <div
                key={update.id}
                className="flex gap-6 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 animate-slide-up group"
                style={{ animationDelay: `${idx * 0.1} s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-saudi rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {update.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-grey-900 text-lg mb-2 group-hover:text-primary transition-colors">
                    {isArabic ? update.title.ar : update.title.en}
                  </h3>
                  <p className="text-grey-600 mb-3 leading-relaxed">
                    {isArabic ? update.description.ar : update.description.en}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-grey-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
