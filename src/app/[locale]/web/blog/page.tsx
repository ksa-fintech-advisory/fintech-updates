import type { Metadata } from 'next';
import { blogApiService } from '@/services/api/blogs';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import nextDynamic from 'next/dynamic';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { BlogFilters } from '@/core/components/web/blog/BlogFilters';
import { BlogPagination } from '@/core/components/web/blog/BlogPagination';
import { FiBookOpen, FiCalendar, FiUser, FiArrowRight, FiArrowLeft, FiSlash } from 'react-icons/fi';
import { blogCardImageUrl } from '@/core/constants/blogMedia';
import { getSiteUrl } from '@/core/seo/site';
import { JsonLd } from '@/core/seo/JsonLd';
import { blogCollectionPageJsonLd } from '@/core/seo/structuredData';

// WaveField3D can be kept if it fits the theme (e.g., monochrome particles), otherwise consider a simpler grid
const WaveField3D = nextDynamic(() => import('@/core/components/web/blog/WaveField3D'), { ssr: false });

/** SearchParams must always re-fetch (pagination / filters); avoid cached empty shell on client navigation. */
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'web.blog' });
  return buildPageMetadata({
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/web/blog',
  });
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  const currentPage = Math.max(1, Number(searchParams?.page) || 1);
  const categorySlug = typeof searchParams?.category === 'string' ? searchParams.category : '';
  const qRaw = searchParams?.q ?? searchParams?.search;
  const searchQuery = typeof qRaw === 'string' ? qRaw.trim() : '';
  const limit = 9;

  const filters = {
    ...(categorySlug ? { category: categorySlug } : {}),
    ...(searchQuery ? { search: searchQuery } : {}),
  };
  const hasFilters = Boolean(categorySlug || searchQuery);

  const data = await blogApiService.paginateBlogs(
    currentPage,
    limit,
    hasFilters ? filters : undefined,
    locale,
  );
  const { blogs, categories, totalPages } = data;

  /** Remount stagger animation after client navigation (page/category/search); avoids stuck opacity 0 from whileInView once:true. */
  const blogGridKey = `blog-grid-${currentPage}-${categorySlug}-${searchQuery}`;

  const t = await getTranslations({ locale, namespace: 'web.blog' });
  const qs = new URLSearchParams();
  if (currentPage > 1) qs.set('page', String(currentPage));
  if (categorySlug) qs.set('category', categorySlug);
  if (searchQuery) qs.set('q', searchQuery);
  const pathWithQuery = `/${locale}/web/blog${qs.toString() ? `?${qs}` : ''}`;

  return (
    <div className="w-full bg-zinc-50 dark:bg-black selection:bg-primary-500/30">
      <JsonLd
        data={blogCollectionPageJsonLd({
          base: getSiteUrl(),
          locale,
          pathWithQuery,
          name: t('metaTitle'),
          description: t('metaDescription'),
          blogs,
          listStartIndex: (currentPage - 1) * limit + 1,
        })}
      />

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Hero Section: The "Knowledge Base" Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">

        {/* Optional: 3D Background - Ensure it is subtle/monochrome */}
        <div className="absolute inset-0 z-0 opacity-30 grayscale">
          <WaveField3D />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">

            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                <FiBookOpen className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'مركز المعرفة' : 'KNOWLEDGE_BASE'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="mb-6 text-5xl font-bold leading-[1.14] tracking-tight text-zinc-900 dark:text-white md:text-7xl md:leading-[1.1]">
                {isArabic ? 'المدونة التقنية' : 'Engineering Blog'}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light max-w-2xl leading-relaxed">
                {isArabic
                  ? 'مقالات متعمقة حول هندسة البرمجيات المالية، والامتثال، والبنية التحتية.'
                  : 'Deep dives into fintech engineering, compliance protocols, and infrastructure.'}
              </p>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Category Filter - Needs to be styled cleanly (passed props should handle styling logic) */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-[65px] z-30">
        <div className="container mx-auto px-4">
          <BlogFilters categories={categories} isArabic={isArabic} />
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {blogs.length === 0 ? (
            <AnimatedSection key={blogGridKey}>
              <div className="text-center py-32 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 border-dashed">
                <div className="text-4xl mb-4 text-zinc-400">
                  <FiSlash className="mx-auto" />
                </div>
                <h3 className="text-zinc-900 dark:text-white text-lg font-bold mb-2">
                  {isArabic ? 'لا توجد نتائج' : 'NO_DATA_FOUND'}
                </h3>
                <p className="text-zinc-500 font-mono text-sm">
                  {isArabic
                    ? 'لا توجد مقالات مطابقة للتصنيف أو البحث.'
                    : 'No posts match this category or search.'}
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <>
                <StaggerContainer key={blogGridKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {blogs.map((blog) => {
                    const cardImg = blogCardImageUrl(blog.featuredImage);
                    return (
                  <StaggerItem key={blog.id} className="h-full">
                    <Link
                      href={`/${locale}/web/blog/${blog.slug}`}
                      className="group block h-full outline-none"
                    >
                      <article className="h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-zinc-200/50 dark:group-hover:shadow-black/50 overflow-hidden">

                        {/* Cover: real photo only — no default branded poster */}
                        <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                          {cardImg ? (
                            <>
                              <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 bg-zinc-900"
                                style={{ backgroundImage: `url(${cardImg})` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </>
                          ) : (
                            <div
                              className="absolute inset-0 opacity-[0.12] dark:opacity-[0.2]"
                              style={{
                                backgroundImage: `repeating-linear-gradient(-12deg, transparent, transparent 12px, ${blog.category.color}33 12px, ${blog.category.color}33 13px)`,
                              }}
                            />
                          )}

                          {/* Category Tag - Absolute Top Left */}
                          <div className="absolute top-4 left-4">
                            <span
                              className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/90 dark:bg-black/90 backdrop-blur border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white shadow-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: blog.category.color }} />
                              {blog.category.name}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">

                          {/* Meta Info Row */}
                          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-4 border-dashed">
                            <div className="flex items-center gap-1.5">
                              <FiCalendar className="w-3.5 h-3.5" />
                              <time>
                                {new Date(blog.publishedAt).toLocaleDateString(isArabic ? 'en-US' : 'en-US', {
                                  year: 'numeric', month: '2-digit', day: '2-digit'
                                })}
                              </time>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                            {blog.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                            {blog.excerpt}
                          </p>

                          {/* Author Footer */}
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                <FiUser className="w-3 h-3" />
                              </div>
                              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-mono uppercase tracking-wide truncate max-w-[120px]">
                                {blog?.author?.name || 'EDITOR'}
                              </span>
                            </div>

                            <div className={`text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-all transform ${isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                              {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                            </div>
                          </div>

                        </div>
                      </article>
                    </Link>
                  </StaggerItem>
                    );
                  })}
                </StaggerContainer>

                {/* Pagination (Client Component) - Ensure passing styles props or update internal styles */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <BlogPagination currentPage={currentPage} totalPages={totalPages} isArabic={isArabic} />
                </div>
              </>
          )}
        </div>
      </section>
    </div>
  );
}