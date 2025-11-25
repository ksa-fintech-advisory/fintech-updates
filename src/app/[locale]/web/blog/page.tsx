import { blogService } from '@/services/api/mock';
import Link from 'next/link';

export default async function BlogPage({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const isArabic = locale === 'ar';
  const blogData = await blogService.paginateBlogs(1, 12);

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
      <section className="border-b border-grey-200 bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto">
            <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium whitespace-nowrap">
                          {isArabic ? 'جميع الفئات' : 'All Categories'}
            </button>
            {blogData.categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-lg bg-grey-100 text-grey-700 hover:bg-grey-200 font-medium whitespace-nowrap transition-colors"
              >
                    {category.icon} {isArabic ? category.name.ar : category.name.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.blogs.map((blog) => (
                <Link
                key={blog.id}
                    href={`/${locale}/web/blog/${blog.slug}`}
                    className="group"
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
                            <h3 className="text-xl font-bold text-grey-900 mb-2 group-hover:text-primary transition-colors">
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
          {blogData.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
                          <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-700 transition-colors">
                1
              </button>
                          {Array.from({ length: Math.min(blogData.totalPages - 1, 4) }, (_, i) => (
                <button
                  key={i + 2}
                      className="px-4 py-2 rounded-lg bg-white text-grey-700 hover:bg-grey-100 font-medium transition-colors shadow-soft"
                >
                  {i + 2}
                </button>
              ))}
                          {blogData.totalPages > 5 && (
                              <span className="px-4 py-2 text-grey-500">...</span>
                          )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
