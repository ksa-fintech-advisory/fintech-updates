import { blogService } from '@/services/api/mock';
import Link from 'next/link';

export default async function BlogPage() {
  const blogData = await blogService.paginateBlogs(1, 12);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-saudi text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-white/90">
              Insights and updates from the FinTech world
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-grey-200 bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto">
            <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium whitespace-nowrap">
              All Categories
            </button>
            {blogData.categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-lg bg-grey-100 text-grey-700 hover:bg-grey-200 font-medium whitespace-nowrap transition-colors"
              >
                {category.icon} {category.name.en}
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
              <article
                key={blog.id}
                className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow overflow-hidden group"
              >
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
                      {blog.category.icon} {blog.category.name.en}
                    </span>
                    <span className="text-sm text-grey-500">
                      {blog.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-grey-900 mb-2 group-hover:text-primary transition-colors">
                    {blog.title.en}
                  </h3>
                  <p className="text-grey-600 mb-4 line-clamp-2">
                    {blog.excerpt.en}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-grey-200 rounded-full"></div>
                      <span className="text-sm font-medium text-grey-700">
                        {blog.author.name.en}
                      </span>
                    </div>
                    <span className="text-primary hover:text-primary-700 font-medium text-sm">
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {blogData.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium">
                1
              </button>
              {Array.from({ length: blogData.totalPages - 1 }, (_, i) => (
                <button
                  key={i + 2}
                  className="px-4 py-2 rounded-lg bg-white text-grey-700 hover:bg-grey-100 font-medium"
                >
                  {i + 2}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
