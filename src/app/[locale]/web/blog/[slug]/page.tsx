import { blogApiService } from '@/services/api/blogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/core/components/common/SafeImage';
import { BlogContentRenderer } from '@/core/components/web/blog/BlogContentRenderer';
import { AuthorBio } from '@/core/components/web/blog/AuthorBio';
import { SocialShare } from '@/core/components/web/blog/SocialShare';
import { RelatedPosts } from '@/core/components/web/blog/RelatedPosts';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';

interface BlogPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({ params: { slug, locale } }: BlogPageProps): Promise<Metadata> {
  const isArabic = locale === 'ar';

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { author: true, category: true }
    });

    if (!blog) {
      return {
        title: isArabic ? 'المقال غير موجود' : 'Blog Not Found',
      };
    }

    const title = isArabic ? (blog.titleAr || blog.titleEn) : blog.titleEn;
    const description = isArabic ? (blog.excerptAr || blog.excerptEn) : blog.excerptEn;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: blog.publishedAt.toISOString(),
        authors: [isArabic ? (blog.author.nameAr || blog.author.name) : blog.author.name],
        images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
      },
    };
  } catch (error) {
    return {
      title: isArabic ? 'خطأ' : 'Error',
    };
  }
}

export default async function BlogPage({ params: { slug, locale } }: BlogPageProps) { // Renamed from BlogDetailPage and updated params destructuring
// const { slug, locale } = params; // This line is now redundant due to destructuring in the function signature
  const isArabic = locale === 'ar';
  
  // Get blog by slug
  const blog = await blogApiService.getBlogBySlug(slug, locale);
  
  if (!blog) {
    notFound();
  }

  const title = blog.title;
  const excerpt = blog.excerpt;
  const content = blog.content;

  // Ideally, get the current URL properly
  const currentUrl = `https://fintech-updates.sa/${locale}/web/blog/${slug}`;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-grey-900 text-white pt-20 pb-24 relative overflow-hidden">
        {/* Background pattern or subtle gradient could be added here */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/20 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 mb-8 bg-grey-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-grey-700">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: blog.category.color }}
              />
              <span className="font-semibold text-sm tracking-wide uppercase text-grey-200">
                {blog.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">{title}</h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-grey-300 mb-10 max-w-2xl mx-auto leading-relaxed">{excerpt}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-grey-400">
              <div className="flex items-center gap-3">
                {blog.author.avatar ? (
                  <SafeImage
                    src={blog.author.avatar}
                    alt={blog?.author?.name||""}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-grey-700"
                  />
                ) : (
                  <div className="w-12 h-12 bg-grey-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {blog?.author?.name?.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <div className="font-bold text-white text-base">{blog?.author?.name}</div>
                  <div className="text-xs text-grey-400">{blog?.author?.role}</div>
                </div>
              </div>

              <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-grey-600"></span>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="font-medium">
                  {new Date(blog.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-grey-600"></span>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-medium">
                  {blog.readTime} {isArabic ? 'دقيقة قراءة' : 'min read'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-16 mb-16">
        <div className="max-w-5xl mx-auto relative h-[400px] md:h-[500px] w-full shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
          <SafeImage
            src={blog.featuredImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Blog Content */}
      <article className="pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Social Share (Top) */}
            <div className="mb-8 pb-8 border-b border-grey-100 flex justify-between items-center">
              <SocialShare title={title} url={currentUrl} />
            </div>

            <div className="prose prose-lg prose-indigo md:prose-xl max-w-none">
              <BlogContentRenderer content={content} />
            </div>

            {/* Tags */}
            <div className="mt-12 mb-12">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-grey-50 text-grey-600 rounded-full text-sm font-medium border border-grey-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mb-12">
              <AuthorBio author={blog?.author as any} />
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={blog?.relatedPosts} locale={locale} />


            {/* Back to Blog */}
            <div className="mt-16 text-center">
              <Link
                href={`/${locale}/web/blog`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-grey-300 rounded-lg text-grey-700 font-semibold hover:bg-grey-50 transition-colors shadow-sm"
              >
                {isArabic ? (
                  <>
                    <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                    <span>العودة إلى المدونة</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                    <span>Back to Blog</span>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
