import { homeService } from '@/services/api/mock';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default async function HomePage() {
  const homeContent = await homeService.getHomeContent();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-saudi text-white py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              {homeContent.hero.title.en}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90 animate-slide-up">
              {homeContent.hero.subtitle.en}
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto animate-slide-up">
              {homeContent.hero.description.en}
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
              {homeContent.hero.ctaButtons.map((button) => (
                <Link
                  key={button.href}
                  href={button.href}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    button.variant === 'primary'
                      ? 'bg-accent hover:bg-accent-700 text-grey-900'
                      : 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/30'
                  }`}
                >
                  {button.label.en}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white border-b border-grey-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {homeContent.statistics.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-grey-700">
                  {stat.label.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {homeContent.featuredArticles.length > 0 && (
        <section className="py-16 bg-grey-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-grey-900 mb-8 text-center">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeContent.featuredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow overflow-hidden group"
                >
                  <div className="aspect-video bg-grey-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-saudi opacity-20  transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{
                          backgroundColor: `${article.category.color}15`,
                          color: article.category.color,
                        }}
                      >
                        {article.category.name.en}
                      </span>
                      <span className="text-sm text-grey-500">
                        {article.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-grey-900 mb-2 group-hover:text-primary transition-colors">
                      {article.title.en}
                    </h3>
                    <p className="text-grey-600 mb-4 line-clamp-2">
                      {article.excerpt.en}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-grey-200 rounded-full"></div>
                        <span className="text-sm font-medium text-grey-700">
                          {article.author.name.en}
                        </span>
                      </div>
                      <Link
                        href={`/web/article/${article.slug}`}
                        className="text-primary hover:text-primary-700 font-medium text-sm"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Updates Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-grey-900 mb-8 text-center">
            Latest Updates
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {homeContent.latestUpdates.map((update) => (
              <div
                key={update.id}
                className="flex gap-4 p-6 bg-grey-50 rounded-xl hover:bg-grey-100 transition-colors"
              >
                <div className="text-3xl flex-shrink-0">{update.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-grey-900 mb-2">
                    {update.title.en}
                  </h3>
                  <p className="text-grey-600 text-sm mb-2">
                    {update.description.en}
                  </p>
                  <span className="text-xs text-grey-500">
                    {new Date(update.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
