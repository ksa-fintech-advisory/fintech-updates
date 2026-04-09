import Link from 'next/link';
import { updateService } from '@/services/updates/staticUpdateService';
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
        <div className="bg-[#030303] text-zinc-100 min-h-screen pb-20 md:pb-28 font-sans selection:bg-emerald-500/30">

            {/* 1. Global Engineering Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
            <div className="pointer-events-none fixed right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px] z-0" />

            {/* Hero Header: System Status Style */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/10 bg-[#050505]/80 backdrop-blur-sm z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-mono font-bold uppercase tracking-widest">
                                {isArabic ? 'سجل_النظام' : 'SYSTEM_CHANGELOG'}
                            </span>
                        </div>

                        <h1 className="mb-6 text-3xl font-bold leading-[1.18] tracking-tight text-white md:text-5xl md:leading-[1.14]">
                            {isArabic ? 'آخر التحديثات التنظيمية' : 'Regulatory & System Updates'}
                        </h1>

                        <p className="text-lg text-zinc-400 font-light max-w-2xl leading-relaxed border-l-4 border-emerald-500 pl-6">
                            {isArabic
                                ? 'تتبع أحدث التشريعات، تحديثات الـ API، والأخبار المؤثرة على البنية التحتية المالية.'
                                : 'Track the latest regulations, API deprecations, and infrastructure changes in real-time.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
                {updates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {updates.map((update: any) => (
                            <Link
                                key={update.id}
                                href={`/${locale}/updates/${update.slug}`}
                                className="group block outline-none h-full"
                            >
                                <article className="h-full bg-[#0a0a0b] border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 hover:bg-white/[0.02] transition-all duration-300 flex flex-col shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)]">

                                    {/* Header: Date & Tag */}
                                    <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/5 border-dashed">
                                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                            <FiCalendar className="w-3.5 h-3.5 text-emerald-400" />
                                            <time dateTime={update.date}>
                                                {new Date(update.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                })}
                                            </time>
                                        </div>

                                        {update.featured && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {isArabic ? 'هام' : 'CRITICAL'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="p-1.5 rounded bg-zinc-900 text-emerald-400 text-lg ring-1 ring-white/10">
                                                {/* Keep original icon or use fallback */}
                                                {update.icon || <FiFileText />}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-zinc-100 mb-3 group-hover:text-white transition-colors leading-snug">
                                            {update.title}
                                        </h3>

                                        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 font-medium">
                                            {update.description}
                                        </p>
                                    </div>

                                    {/* Footer: Action */}
                                    <div className="mt-6 pt-4 flex items-center justify-between text-xs font-mono font-bold text-zinc-500 group-hover:text-emerald-400 transition-colors border-t border-white/5">
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
                    <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 text-emerald-500/50">
                            <FiClock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-100 mb-2 font-mono">
                            {isArabic ? 'لا توجد بيانات' : 'NO_UPDATES_FOUND'}
                        </h3>
                        <p className="text-zinc-500 max-w-md mx-auto">
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