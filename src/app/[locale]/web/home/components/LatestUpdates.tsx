import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { updateService } from '@/services/server/updateService';
import { FiGitCommit, FiTag, FiArrowRight, FiArrowLeft, FiClock } from 'react-icons/fi';

export default async function LatestUpdates({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';

  // Fetch real updates from API
  const latestUpdates = await updateService.getUpdates({
    featured: true,
    limit: 5,
    lang: locale,
  });

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">

      {/* 1. Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header: Changelog Style */}
        <AnimatedSection className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 block">
              {isArabic ? '// سجل_التغييرات' : '// SYSTEM_CHANGELOG'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {isArabic ? 'تحديثات المنظومة' : 'Ecosystem Updates'}
            </h2>
          </div>

          <div className="hidden md:block">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-mono font-bold border border-green-200 dark:border-green-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {isArabic ? 'الأنظمة تعمل: v2.4.0' : 'SYSTEM OPERATIONAL: v2.4.0'}
            </span>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <StaggerContainer staggerDelay={0.1}>
            {latestUpdates.map((update: any, idx: number) => (
              <StaggerItem key={update.id} className="group relative pl-8 md:pl-0">

                <div className="flex flex-col md:flex-row gap-8 relative">

                  {/* 1. Date Column (Desktop) - Monospace Date */}
                  <div className="hidden md:flex flex-col items-end w-32 pt-1 flex-shrink-0 text-right">
                    <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {new Date(update.date).toLocaleDateString(isArabic ? 'en-US' : 'en-US', { // Force English numbers for date in Mono
                        month: 'short',
                        day: '2-digit',
                      })}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {new Date(update.date).getFullYear()}
                    </span>
                  </div>

                  {/* 2. Timeline Line & Node */}
                  <div className="absolute left-0 md:left-[9rem] top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 md:block hidden">
                    {/* Connection Line */}
                  </div>

                  {/* The Node (Git Commit Dot) */}
                  <div className="absolute left-[-5px] md:left-[8.7rem] top-1.5 z-10 bg-zinc-50 dark:bg-zinc-950 p-1">
                    <div className="w-3 h-3 rounded-full border-2 border-zinc-300 dark:border-zinc-600 group-hover:border-primary-500 group-hover:bg-primary-500 transition-colors duration-300" />
                  </div>


                  {/* 3. The Update Content Card */}
                  <div className="flex-1 pb-12">
                    <Link href={`/web/updates/${update.slug}`} className="block group/card outline-none">
                      <article className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 relative overflow-hidden">

                        {/* Mobile Date (Visible only on mobile) */}
                        <div className="md:hidden flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
                          <FiClock className="w-3.5 h-3.5" />
                          {new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                        </div>

                        <div className="flex justify-between items-start gap-4">
                          <div>
                            {/* Category Tag (e.g. SAMA, FEATURE) */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                <FiTag className="w-3 h-3" />
                                {/* Mock category if not in data, or use update.type */}
                                {update.type || (isArabic ? 'تحديث' : 'UPDATE')}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400 transition-colors mb-2">
                              {update.title}
                            </h3>

                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                              {update.description}
                            </p>
                          </div>

                          {/* Icon (Optional - keep it subtle) */}
                          {/* Instead of big icon, we use a simple arrow that appears on hover */}
                          <div className="hidden sm:flex text-zinc-300 group-hover/card:text-primary-500 transition-colors transform group-hover/card:translate-x-1 rtl:group-hover/card:-translate-x-1">
                            {isArabic ? <FiArrowLeft className="w-5 h-5" /> : <FiArrowRight className="w-5 h-5" />}
                          </div>
                        </div>

                        {/* Subtle left border accent on hover */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 transform -translate-x-full group-hover/card:translate-x-0 transition-transform duration-300" />

                      </article>
                    </Link>
                  </div>

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}