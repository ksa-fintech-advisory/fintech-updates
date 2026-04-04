import { getStaticBlogBySlug } from '@/services/blog/staticBlogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/core/components/common/SafeImage';
import { BlogContentRenderer } from '@/core/components/web/blog/BlogContentRenderer';
import { SocialShare } from '@/core/components/web/blog/SocialShare';
import { blogDetailHeroSrc } from '@/core/constants/blogMedia';
import { RelatedPosts } from '@/core/components/web/blog/RelatedPosts';
import { Metadata } from 'next';
import { getSiteUrl, SITE_NAME } from '@/core/seo/site';
import { FiCalendar, FiUser, FiFolder, FiHash, FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';

interface BlogPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({ params: { slug, locale } }: BlogPageProps): Promise<Metadata> {
  const isArabic = locale === 'ar';

  const blog = getStaticBlogBySlug(slug, locale);

  if (!blog) {
    return {
      title: isArabic ? 'المقال غير موجود' : 'Blog Not Found',
    };
  }

  const path = `/web/blog/${slug}`;
  const base = getSiteUrl();
  const authorName = blog.author?.name ?? '';
  const ogImage = `${base}${blogDetailHeroSrc(blog.featuredImage)}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `${base}/en${path}`,
        ar: `${base}/ar${path}`,
        'x-default': `${base}/en${path}`,
      },
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `/${locale}${path}`,
      siteName: SITE_NAME,
      locale: isArabic ? 'ar_SA' : 'en_US',
      alternateLocale: isArabic ? ['en_US'] : ['ar_SA'],
      publishedTime: blog.publishedAt,
      authors: authorName ? [authorName] : [],
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPage({ params: { slug, locale } }: BlogPageProps) {
  const isArabic = locale === 'ar';

  const blog = getStaticBlogBySlug(slug, locale);

  if (!blog) {
    notFound();
  }

  const title = blog.title;
  const excerpt = blog.excerpt;
  const content = blog.content;
  const currentUrl = `https://fintech-updates.sa/${locale}/web/blog/${slug}`;
  const heroImageSrc = blogDetailHeroSrc(blog.featuredImage);

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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white leading-[1.2] md:leading-[1.16] lg:leading-[1.12] tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-3xl border-l-4 border-primary-500 pl-6">
              {excerpt}
            </p>
          </div>

          {/* Meta Data Grid: The "Spec Sheet" */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">

            {/* Author */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                <FiUser />
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{isArabic ? 'المؤلف' : 'AUTHOR'}</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">{blog?.author?.name}</div>
              </div>
            </div>

            {/* Date */}
            <div className="p-4 flex items-center gap-3">
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

      {/* Cover image: featured photo or neutral grid fallback */}
      <section className="relative z-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-900">
          <SafeImage
            src={heroImageSrc}
            alt={title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

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

      {blog.relatedPosts && blog.relatedPosts.length > 0 ? (
        <section className="bg-zinc-100 dark:bg-zinc-900/50 py-20 border-t border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-10 text-center flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></span>
              {isArabic ? 'مقالات ذات صلة' : 'Related Documentation'}
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></span>
            </h3>
            <RelatedPosts posts={blog.relatedPosts} locale={locale} />
          </div>
        </section>
      ) : null}

    </div>
  );
}