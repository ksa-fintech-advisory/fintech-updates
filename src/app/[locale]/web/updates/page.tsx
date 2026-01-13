import Link from 'next/link';
import { updateService } from '@/services/server/updateService';
import { FiCalendar, FiTag, FiArrowRight, FiArrowLeft, FiClock, FiFileText } from 'react-icons/fi';

interface UpdatesListingPageProps {
    params: {
        locale: string;
    };
}

export default async function UpdatesListingPage({ params }: UpdatesListingPageProps) {
    const { locale } = params;
    const isArabic = locale === 'ar';

    const updates = await updateService.getUpdates({ lang: locale });

    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen pb-24 font-sans selection:bg-primary-500/30">

            {/* 1. Global Engineering Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

            {/* Hero Header: System Status Style */}
            <section className="relative pt-32 pb-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-mono font-bold uppercase tracking-widest">
                                {isArabic ? 'سجل_النظام' : 'SYSTEM_CHANGELOG'}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white leading-tight">
                            {isArabic ? 'آخر التحديثات التنظيمية' : 'Regulatory & System Updates'}
                        </h1>

                        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-light max-w-2xl leading-relaxed border-l-4 border-primary-500 pl-6">
                            {isArabic
                                ? 'تتبع أحدث التشريعات، تحديثات الـ API، والأخبار المؤثرة على البنية التحتية المالية.'
                                : 'Track the latest regulations, API deprecations, and infrastructure changes in real-time.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                {updates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {updates.map((update: any) => (
                            <Link
                                key={update.id}
                                href={`/${locale}/web/updates/${update.slug}`}
                                className="group block outline-none h-full"
                            >
                                <article className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50">

                                    {/* Header: Date & Tag */}
                                    <div className="flex justify-between items-start mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 border-dashed">
                                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                            <FiCalendar className="w-3.5 h-3.5" />
                                            <time dateTime={update.date}>
                                                {new Date(update.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                })}
                                            </time>
                                        </div>

                                        {update.featured && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border border-primary-100 dark:border-primary-800">
                                                {isArabic ? 'هام' : 'CRITICAL'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-lg">
                                                {/* Keep original icon or use fallback */}
                                                {update.icon || <FiFileText />}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                                            {update.title}
                                        </h3>

                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 font-medium">
                                            {update.description}
                                        </p>
                                    </div>

                                    {/* Footer: Action */}
                                    <div className="mt-6 pt-4 flex items-center justify-between text-xs font-mono font-bold text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                        <span className="uppercase tracking-wider">
                                            {isArabic ? 'عرض التفاصيل' : 'VIEW_DETAILS'}
                                        </span>
                                        <div className={`transform transition-transform duration-300 ${isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                                            {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                                        </div>
                                    </div>

                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 text-zinc-400">
                            <FiClock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 font-mono">
                            {isArabic ? 'لا توجد بيانات' : 'NO_UPDATES_FOUND'}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                            {isArabic
                                ? 'لم يتم تسجيل أي تحديثات في السجل حتى الآن. عد لاحقاً.'
                                : 'System log is empty. No regulatory or technical updates have been pushed yet.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}