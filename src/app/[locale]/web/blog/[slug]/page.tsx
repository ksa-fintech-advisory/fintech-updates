import { blogService } from '@/services/api/mock';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogContentRenderer } from '@/core/components/web/blog/BlogContentRenderer';

interface BlogDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug, locale } = params;
  const isArabic = locale === 'ar';
  
  // Get blog by slug
  const blog = await blogService.getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }

  const title = isArabic ? blog.title.ar : blog.title.en;
  const excerpt = isArabic ? blog.excerpt.ar : blog.excerpt.en;
  const content = isArabic ? blog.content.ar : blog.content.en;

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
                  backgroundColor: blog.category.color,
                  color: 'white',
                }}
              >
                {blog.category.icon} {isArabic ? blog.category.name.ar : blog.category.name.en}
              </span>
              <span className="text-grey-400 text-sm">
                {blog.readTime} {isArabic ? 'دقيقة قراءة' : 'min read'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

            {/* Excerpt */}
            <p className="text-xl text-grey-300 mb-6">{excerpt}</p>

            {/* Author & Date */}
            <div className="flex items-center gap-4 text-grey-400">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-grey-700 rounded-full flex items-center justify-center text-white font-bold">
                  {(isArabic ? blog.author.name.ar : blog.author.name.en).charAt(0)}
                </div>
                <div className="font-medium text-white">
                  {isArabic ? blog.author.name.ar : blog.author.name.en}
                </div>
              </div>
              <span className="text-grey-600">•</span>
              <span>
                {new Date(blog.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative h-96 bg-gradient-to-br from-primary-400 to-accent-400">
        <div className="absolute inset-0 bg-black/10"></div>
        {blog.featuredImage && (
          <Image
            src={blog.featuredImage}
            alt={title}
            fill
            className="object-cover opacity-50 mix-blend-overlay"
          />
        )}
      </section>

      {/* Blog Content */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <BlogContentRenderer content={content} />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-grey-200">
              <h3 className="font-bold text-grey-900 mb-4">{isArabic ? 'الوسوم' : 'Tags'}</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-grey-100 text-grey-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12">
              <Link
                href={`/${locale}/web/blog`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary-700 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
