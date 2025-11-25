import { articleService } from '@/services/api/mock';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ArticlePageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = params;
  const article = await articleService.getOneArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await articleService.getRelatedArticles(article.id, 3);
  const content = locale === 'ar' ? article.content.ar : article.content.en;
  const title = locale === 'ar' ? article.title.ar : article.title.en;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-grey-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="px-4 py-2 text-sm font-semibold rounded-full"
                style={{
                  backgroundColor: article.category.color,
                  color: 'white',
                }}
              >
                {locale === 'ar' ? article.category.name.ar : article.category.name.en}
              </span>
              <span className="text-grey-400 text-sm">
                {article.readTime} min read • {article.views.toLocaleString()} views
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

            {/* Author & Date */}
            <div className="flex items-center gap-4 text-grey-400">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-grey-700 rounded-full"></div>
                <div>
                  <div className="font-medium text-white">
                    {locale === 'ar' ? article.author.name.ar : article.author.name.en}
                  </div>
                  <div className="text-sm">
                    {locale === 'ar' ? article.author.role.ar : article.author.role.en}
                  </div>
                </div>
              </div>
              <span className="text-grey-600">•</span>
              <span>
                {new Date(article.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {content.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={idx} className="text-3xl font-bold text-grey-900 mt-8 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-grey-900 mt-6 mb-3">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-grey-900 mt-4 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <li key={idx} className="text-grey-700 ml-4">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-grey-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-grey-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-grey-100 text-grey-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-grey-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-grey-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/${locale}/web/article/${related.slug}`}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow overflow-hidden group"
                >
                  <div className="aspect-video bg-grey-200"></div>
                  <div className="p-6">
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full inline-block mb-3"
                      style={{
                        backgroundColor: `${related.category.color}15`,
                        color: related.category.color,
                      }}
                    >
                      {locale === 'ar' ? related.category.name.ar : related.category.name.en}
                    </span>
                    <h3 className="text-lg font-bold text-grey-900 group-hover:text-primary transition-colors">
                      {locale === 'ar' ? related.title.ar : related.title.en}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
