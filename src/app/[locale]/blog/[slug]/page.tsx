import { getStaticBlogBySlug, getAdjacentPosts } from '@/services/blog/staticBlogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlogContentRenderer } from '@/core/components/web/blog/BlogContentRenderer';
import { blogDetailHeroSrc } from '@/core/constants/blogMedia';
import { RelatedPosts } from '@/core/components/web/blog/RelatedPosts';
import { BlogAuthorCard } from '@/core/components/web/blog/BlogAuthorCard';
import { Metadata } from 'next';
import { getSiteUrl, SITE_NAME } from '@/core/seo/site';
import { JsonLd } from '@/core/seo/JsonLd';
import { blogArticleGraphJsonLd } from '@/core/seo/structuredData';
import { FiArrowLeft, FiArrowRight, FiHome, FiClock } from 'react-icons/fi';
import nextDynamic from 'next/dynamic';

const BlogShareBar = nextDynamic(
  () => import('@/core/components/web/blog/BlogShareBar').then((m) => m.BlogShareBar),
  { ssr: false },
);

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

  const path = `/blog/${slug}`;
  const base = getSiteUrl();
  const ogImage = `${base}${blogDetailHeroSrc(blog.featuredImage)}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    ...(blog.tags.length > 0 ? { keywords: blog.tags } : {}),
    authors: [{ name: blog.author.name || 'Mohammed Abdo', url: `${base}/${locale}/about` }],
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
      authors: [blog.author.name || 'Mohammed Abdo'],
      tags: blog.tags,
      images: [{ url: ogImage, alt: blog.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [ogImage],
    },
    other: {
      'article:section': blog.category.name,
    },
  };
}

function formatPublishedAt(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export default async function BlogPage({ params: { slug, locale } }: BlogPageProps) {
  const isArabic = locale === 'ar';

  const blog = getStaticBlogBySlug(slug, locale);

  if (!blog) {
    notFound();
  }

  const title = blog.title;
  const content = blog.content;
  const base = getSiteUrl();
  const publishedLabel = formatPublishedAt(blog.publishedAt, locale);
  const catColor = blog.category.color;
  const { prev, next } = getAdjacentPosts(slug, locale);

  return (
    <div className="w-full bg-zinc-50 dark:bg-black min-h-screen font-sans selection:bg-primary-500/30">
      <JsonLd
        data={blogArticleGraphJsonLd({
          base,
          locale,
          slug,
          blog,
        })}
      />

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      <section className="relative pt-28 pb-14 md:pt-32 md:pb-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <nav
            className="flex items-center gap-2 text-xs  text-zinc-500 mb-10"
            aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'}
          >
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              <FiHome className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
              <span className="sr-only">{isArabic ? 'الرئيسية' : 'Home'}</span>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
              /
            </span>
            <Link
              href={`/${locale}/blog`}
              className="rounded-md px-1.5 py-0.5 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {isArabic ? 'المدونة' : 'Blog'}
            </Link>
            <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
              /
            </span>
            <span className="text-zinc-400 truncate max-w-[min(12rem,40vw)]" title={slug}>
              {slug.replace(/-/g, ' ')}
            </span>
          </nav>

          <header className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold tracking-tight shadow-sm"
                style={{
                  borderColor: `${catColor}55`,
                  backgroundColor: `${catColor}14`,
                  color: catColor,
                }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full ring-2 ring-white/30 dark:ring-black/20" style={{ backgroundColor: catColor }} />
                {blog.category.name}
              </span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" aria-hidden />
              <time
                dateTime={blog.publishedAt}
                className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400"
              >
                {isArabic ? (
                  <>
                    <span className=" text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 block mb-0.5">
                      تاريخ النشر
                    </span>
                    {publishedLabel}
                  </>
                ) : (
                  <>
                      <span className=" text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 block mb-0.5">
                      Published
                    </span>
                    {publishedLabel}
                  </>
                )}
              </time>
              {/* Reading time */}
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" aria-hidden />
              <span className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                <FiClock className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden />
                <span>
                  {isArabic
                    ? `${blog.readTime} دقائق قراءة`
                    : `${blog.readTime} min read`}
                </span>
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-zinc-900 dark:text-white leading-[1.15] md:leading-[1.12] tracking-tight">
                {title}
              </h1>
            </div>
          </header>
        </div>
      </section>

      <article className="pb-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto pt-10 md:pt-12">
            <div
              className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-a:text-primary-600 dark:prose-a:text-primary-400 
              prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800
              prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code: prose-code:before:content-none prose-code:after:content-none"
            >
              <BlogContentRenderer content={content} locale={locale} />
            </div>

            {/* Share bar */}
            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <BlogShareBar title={title} slug={slug} />
            </div>

            {/* Author card */}
            <div className="mt-8">
              <BlogAuthorCard locale={locale} />
            </div>

            {/* Prev / Next navigation */}
            {(prev || next) && (
              <nav
                className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4"
                aria-label={isArabic ? 'تنقل بين المقالات' : 'Post navigation'}
              >
                {prev ? (
                  <Link
                    href={`/${locale}/blog/${prev.slug}`}
                    className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-zinc-800/40 p-4 transition-all hover:border-emerald-500/30 hover:bg-white/[0.02]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                      {isArabic ? (
                        <><FiArrowRight className="w-3 h-3" /> المقال السابق</>
                      ) : (
                        <><FiArrowLeft className="w-3 h-3" /> Previous</>
                      )}
                    </span>
                    <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/${locale}/blog/${next.slug}`}
                    className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-zinc-800/40 p-4 transition-all hover:border-emerald-500/30 hover:bg-white/[0.02] sm:text-right sm:items-end"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                      {isArabic ? (
                        <>المقال التالي <FiArrowLeft className="w-3 h-3" /></>
                      ) : (
                        <>Next <FiArrowRight className="w-3 h-3" /></>
                      )}
                    </span>
                    <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            )}

            {/* Back to all articles */}
            <div className="mt-8 flex justify-center">
              <Link
                href={`/${locale}/blog`}
                className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-800/40 px-6 py-3.5 font-medium text-zinc-400 shadow-sm transition-all hover:border-emerald-500/30 hover:text-emerald-400"
              >
                {isArabic ? (
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden />
                ) : (
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" aria-hidden />
                )}
                <span className="text-sm uppercase tracking-wide">
                  {isArabic ? 'كل المقالات' : 'All articles'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {blog.relatedPosts && blog.relatedPosts.length > 0 ? (
        <section className="bg-zinc-100 dark:bg-zinc-900/50 py-20 border-t border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-10 text-center flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
              {isArabic ? 'مقالات ذات صلة' : 'Related articles'}
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
            </h3>
            <RelatedPosts posts={blog.relatedPosts} locale={locale} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
