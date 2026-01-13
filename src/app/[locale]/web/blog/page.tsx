import { blogApiService } from '@/services/api/blogs';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { BlogFilters } from '@/core/components/web/blog/BlogFilters';
import { BlogPagination } from '@/core/components/web/blog/BlogPagination';
import { FiBookOpen, FiCalendar, FiClock, FiUser, FiArrowRight, FiArrowLeft, FiSlash } from 'react-icons/fi';

// WaveField3D can be kept if it fits the theme (e.g., monochrome particles), otherwise consider a simpler grid
const WaveField3D = dynamic(() => import('@/core/components/web/blog/WaveField3D'), { ssr: false });

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  const currentPage = Number(searchParams?.page) || 1;
  const categorySlug = typeof searchParams?.category === 'string' ? searchParams.category : '';
  const limit = 9;

  const filters = categorySlug ? { category: categorySlug } : undefined;

  // Fetch data on the server
  const data = await blogApiService.paginateBlogs(currentPage, limit, filters, locale);
  const { blogs, categories, totalPages } = data;

  return (
    <div className="w-full bg-zinc-50 dark:bg-black selection:bg-primary-500/30">

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
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white leading-tight">
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
            <AnimatedSection>
              <div className="text-center py-32 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 border-dashed">
                <div className="text-4xl mb-4 text-zinc-400">
                  <FiSlash className="mx-auto" />
                </div>
                <h3 className="text-zinc-900 dark:text-white text-lg font-bold mb-2">
                  {isArabic ? 'لا توجد نتائج' : 'NO_DATA_FOUND'}
                </h3>
                <p className="text-zinc-500 font-mono text-sm">
                  {isArabic ? 'لم يتم العثور على مقالات في هذا التصنيف.' : 'Query returned 0 results for this filter.'}
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {blogs.map((blog) => (
                  <StaggerItem key={blog.id} className="h-full">
                    <Link
                      href={`/${locale}/web/blog/${blog.slug}`}
                      className="group block h-full outline-none"
                    >
                      <article className="h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-zinc-200/50 dark:group-hover:shadow-black/50 overflow-hidden">

                        {/* Image Container - Technical Aspect Ratio */}
                        <div className="relative aspect-[3/2] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                          {/* Grayscale on idle, Color on hover */}
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                            // Assuming blog.image exists, otherwise a pattern placeholder logic similar to previous examples
                            style={{ backgroundImage: `url(${blog?.featuredImage || '/patterns/placeholder-grid.svg'})` }}
                          />

                          {/* Overlay Gradient for Text readability if needed, but we keep text outside mostly */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                            <div className="flex items-center gap-1.5">
                              <FiClock className="w-3.5 h-3.5" />
                              <span>{blog.readTime} MIN</span>
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
                ))}
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