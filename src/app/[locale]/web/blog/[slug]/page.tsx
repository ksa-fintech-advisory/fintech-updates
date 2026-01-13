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
import { FiCalendar, FiClock, FiUser, FiFolder, FiHash, FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';

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

export default async function BlogPage({ params: { slug, locale } }: BlogPageProps) {
  const isArabic = locale === 'ar';

  // Get blog by slug
  const blog = await blogApiService.getBlogBySlug(slug, locale);

  if (!blog) {
    notFound();
  }

  const title = blog.title;
  const excerpt = blog.excerpt;
  const content = blog.content;
  const currentUrl = `https://fintech-updates.sa/${locale}/web/blog/${slug}`;

  return (
    <div className="w-full bg-zinc-50 dark:bg-black min-h-screen font-sans selection:bg-primary-500/30">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Header Section: "File Header" Style */}
      <section className="relative pt-32 pb-12 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

          {/* Breadcrumb: Terminal Path Style */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href={`/${locale}/web/home`} className="hover:text-primary-600 transition-colors">
              <FiHome className="mb-1" />
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href={`/${locale}/web/blog`} className="hover:text-primary-600 transition-colors">
              blog
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-primary-600 dark:text-primary-400 font-bold">
              {blog.category.name.toLowerCase().replace(/\s+/g, '-')}
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-400 truncate max-w-[200px]">{slug}</span>
          </div>

          {/* Title Area */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-3xl border-l-4 border-primary-500 pl-6">
              {excerpt}
            </p>
          </div>

          {/* Meta Data Grid: The "Spec Sheet" */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-y border-zinc-200 dark:border-zinc-800">

            {/* Author */}
            <div className="p-4 border-b md:border-b-0 border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                <FiUser />
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{isArabic ? 'المؤلف' : 'AUTHOR'}</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">{blog?.author?.name}</div>
              </div>
            </div>

            {/* Date */}
            <div className="p-4 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                <FiCalendar />
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{isArabic ? 'تاريخ النشر' : 'PUBLISHED'}</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                  {new Date(blog.publishedAt).toLocaleDateString(isArabic ? 'en-US' : 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Read Time */}
            <div className="p-4 border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                <FiClock />
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{isArabic ? 'وقت القراءة' : 'TIME_EST'}</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{blog.readTime} MIN</div>
              </div>
            </div>

            {/* Category */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                <FiFolder />
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{isArabic ? 'التصنيف' : 'CATEGORY'}</div>
                <div className="text-sm font-bold text-primary-600 dark:text-primary-400">{blog.category.name}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Image: "Cinema Mode" */}
      {blog.featuredImage && (
        <section className="relative z-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
          <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <SafeImage
              src={blog.featuredImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <article className="pb-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* Social Share Bar (Floating or Top) */}
            <div className="mb-10 py-4 border-y border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {isArabic ? 'مشاركة_المقال' : 'SHARE_PROTOCOL'}
              </span>
              <SocialShare title={title} url={currentUrl} />
            </div>

            {/* The Content */}
            <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-a:text-primary-600 dark:prose-a:text-primary-400 
              prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800
              prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none"
            >
              <BlogContentRenderer content={content} />
            </div>

            {/* Tags: "Keywords" */}
            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FiHash /> {isArabic ? 'الكلمات_المفتاحية' : 'KEYWORDS'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded text-xs font-mono border border-zinc-200 dark:border-zinc-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio Card */}
            <div className="mt-12">
              <AuthorBio author={blog?.author as any} />
            </div>

            {/* Navigation to Index */}
            <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
              <Link
                href={`/${locale}/web/blog`}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300 font-medium hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
              >
                {isArabic ? <FiArrowRight className="group-hover:-translate-x-1 transition-transform" /> : <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />}
                <span className="font-mono text-sm uppercase tracking-wide">{isArabic ? 'العودة للأرشيف' : 'RETURN_TO_INDEX'}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      <section className="bg-zinc-100 dark:bg-zinc-900/50 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-10 text-center flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></span>
            {isArabic ? 'مقالات ذات صلة' : 'Related Documentation'}
            <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></span>
          </h3>
          <RelatedPosts posts={blog?.relatedPosts} locale={locale} />
        </div>
      </section>

    </div>
  );
}