import type { Metadata } from 'next';
import { blogApiService } from '@/services/api/blogs';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import nextDynamic from 'next/dynamic';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { BlogFilters } from '@/core/components/web/blog/BlogFilters';
import { BlogInfiniteGrid } from '@/core/components/web/blog/BlogInfiniteGrid';
import { FiBookOpen, FiSlash, FiLayers } from 'react-icons/fi';
import { getSiteUrl } from '@/core/seo/site';
import { JsonLd } from '@/core/seo/JsonLd';
import { blogCollectionPageJsonLd } from '@/core/seo/structuredData';
import { countStaticBlogsMatching } from '@/services/blog/staticBlogs';

const WaveField3D = nextDynamic(() => import('@/core/components/web/blog/WaveField3D'), { ssr: false });

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
    path: '/blog',
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

  const categorySlug = typeof searchParams?.category === 'string' ? searchParams.category : '';
  const qRaw = searchParams?.q ?? searchParams?.search;
  const searchQuery = typeof qRaw === 'string' ? qRaw.trim() : '';

  const filters = {
    ...(categorySlug ? { category: categorySlug } : {}),
    ...(searchQuery ? { search: searchQuery } : {}),
  };
  const hasFilters = Boolean(categorySlug || searchQuery);

  // Fetch ALL matching blogs at once for client-side infinite scroll
  // Fetch all matching blogs at once — client-side infinite scroll handles batching
  const { blogs, categories } = await blogApiService.paginateBlogs(
    1,
    9999,
    hasFilters ? filters : undefined,
    locale,
  );
  const totalMatching = blogs.length;
  const totalAll = countStaticBlogsMatching(undefined);

  const blogGridKey = `blog-grid-${categorySlug}-${searchQuery}`;

  const t = await getTranslations({ locale, namespace: 'web.blog' });
  const qs = new URLSearchParams();
  if (categorySlug) qs.set('category', categorySlug);
  if (searchQuery) qs.set('q', searchQuery);
  const pathWithQuery = `/${locale}/blog${qs.toString() ? `?${qs}` : ''}`;

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
          listStartIndex: 1,
        })}
      />

      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="pointer-events-none fixed right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px] z-0" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10 bg-[#050505] backdrop-blur-sm">
        <div className="absolute inset-0 z-0 opacity-30 grayscale">
          <WaveField3D />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <FiBookOpen className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'مركز المعرفة' : 'KNOWLEDGE_BASE'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="mb-6 text-4xl sm:text-5xl font-bold leading-[1.14] tracking-tight text-white md:text-7xl md:leading-[1.1]">
                {isArabic ? 'المدونة التقنية' : 'Engineering Blog'}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                {isArabic
                  ? 'أكتب هنا بتفصيل عن الفنتك. وعشان توصل للي تبحث عنه بسرعة، رتبت المحتوى في تصنيفات واضحة؛ تقدر تستخدم البحث أو تفلتر المقالات حسب الموضوع اللي يهمك.'
                  : 'Deep dives into fintech engineering, compliance protocols, and infrastructure.'}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-white/10 bg-[#030303]/80 backdrop-blur-xl sticky top-[65px] z-30">
        <div className="container mx-auto px-4">
          <BlogFilters categories={categories} isArabic={isArabic} />
        </div>
      </div>

      {/* Post count bar */}
      <div className="border-b border-white/10 bg-[#050505]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div
            className="flex items-center gap-2 text-sm text-zinc-500 font-mono"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <FiLayers className="w-4 h-4 shrink-0 text-emerald-400/70" aria-hidden />
            <span>
              {isArabic ? (
                <>
                  <span className="font-bold text-zinc-100 tabular-nums">{totalMatching}</span>
                  {totalMatching === 1 ? ' مقال' : ' مقالات'}
                  {hasFilters ? (
                    <span className="text-zinc-600"> · من أصل <span className="tabular-nums">{totalAll}</span></span>
                  ) : null}
                </>
              ) : (
                <>
                  <span className="font-bold text-zinc-100 tabular-nums">{totalMatching}</span>
                  {totalMatching === 1 ? ' post' : ' posts'}
                  {hasFilters ? (
                    <span className="text-zinc-600"> · <span className="tabular-nums">{totalAll}</span> total</span>
                  ) : null}
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Blog Grid with Infinite Scroll */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 ? (
            <AnimatedSection key={blogGridKey}>
              <div className="text-center py-32 bg-white/5 rounded-xl border border-white/10 border-dashed backdrop-blur-sm">
                <div className="text-4xl mb-4 text-emerald-500/50">
                  <FiSlash className="mx-auto" />
                </div>
                <h3 className="text-zinc-100 text-lg font-bold mb-2">
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
            <BlogInfiniteGrid key={blogGridKey} allBlogs={blogs} />
          )}
        </div>
      </section>
    </div>
  );
}
