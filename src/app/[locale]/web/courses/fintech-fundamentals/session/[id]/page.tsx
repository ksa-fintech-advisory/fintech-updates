import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { phasesData } from '@/data/fintechFundamentalsData';
import { getSessionById } from '@/data/courseData';
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiBookOpen, FiLink, FiHash, FiCpu, FiLayers } from 'react-icons/fi';

// تعريف ألوان ثابتة لكل مرحلة لتعزيز الطابع الهندسي (بدلاً من التدرجات)
const phaseColors: Record<number, string> = {
  1: '#10b981', // Emerald
  2: '#f59e0b', // Amber
  3: '#3b82f6', // Blue
  4: '#8b5cf6', // Violet
};

export default async function SessionDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  const sessionId = parseInt(id, 10);
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  if (isNaN(sessionId) || sessionId < 1 || sessionId > 4) {
    notFound();
  }

  const t = await getTranslations('fintechFundamentals');
  const session = getSessionById(sessionId);
  const phase = phasesData[sessionId - 1];

  if (!session || !phase) {
    notFound();
  }

  // لون التمييز الهندسي الخاص بهذه الجلسة
  const accentColor = phaseColors[sessionId] || '#6366f1';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-primary-500/30">

      {/* 1. Global Grid Background - خلفية الشبكة الهندسية */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Hero Section: The "Header File" */}
      <header className="relative z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb / Back Link - مسار العودة التقني */}
          <Link
            href={`/${locale}/web/courses/fintech-fundamentals`}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest"
          >
            {isArabic ? <FiArrowRight /> : <FiArrowLeft />}
            <span>{isArabic ? '../العودة_للمنهج' : '../BACK_TO_CURRICULUM'}</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-8">

            {/* Phase Icon Block */}
            <div className="shrink-0 relative">
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl border-2 bg-white dark:bg-zinc-900 shadow-sm z-10 relative"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                {/*  - Not strictly needed if icon is sufficient, but contextual to Phase 1 */}
                {phase.icon}
              </div>
              {/* Decorative Offset Box */}
              <div
                className="absolute top-2 left-2 w-20 h-20 rounded-xl opacity-20 -z-10"
                style={{ backgroundColor: accentColor }}
              />
            </div>

            <div className="flex-1">
              {/* Meta Tags - وسوم البيانات */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border"
                  style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10`, color: accentColor }}
                >
                  {isArabic ? `الوحدة 0${sessionId}` : `MODULE_0${sessionId}`}
                </span>
                
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                {session.title[lang]}
              </h1>

              {/* Objectives: The "Readme" - صندوق الأهداف كملف اقرأني */}
              <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-lg p-6 border-l-4" style={{ borderLeftColor: accentColor }}>
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                  <FiHash />
                  {isArabic ? 'أهداف_الجلسة' : 'SESSION_OBJECTIVES'}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {session.objectives[lang].map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <FiCheckCircle className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: The "Tree Structure" - المحتوى الرئيسي */}
      <main className="relative z-10 py-16 container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Content Stream (8 cols) - عمود المحتوى */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <FiLayers className="text-zinc-400" />
              {isArabic ? 'مسار التعلم' : 'Learning Path'}
            </h2>

            {/* Tree Line Connector */}
            <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 space-y-12">

              {session.topics.map((topic, topicIdx) => (
                <div key={topicIdx} className="relative pl-8 md:pl-12">

                  {/* Timeline Node - نقطة الارتكاز */}
                  <div
                    className="absolute -left-[13px] top-1 w-6 h-6 rounded-full border-4 border-zinc-50 dark:border-zinc-950 bg-white dark:bg-zinc-800 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  </div>

                  {/* Topic Header */}
                  <div className="mb-6">
                    <span className="text-xs font-mono text-zinc-400 mb-1 block">
                      0{topicIdx + 1} //
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {topic.title[lang]}
                    </h3>
                  </div>

                  {/* Subtopics Cards - بطاقات المواضيع الفرعية */}
                  <div className="grid gap-4">
                    {topic.subtopics.map((subtopic, subIdx) => (
                      <div
                        key={subIdx}
                        className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                      >
                        <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-2 text-sm md:text-base">
                          <FiCpu className="text-zinc-400 group-hover:text-primary-500 transition-colors" />
                          {subtopic.title[lang]}
                        </h4>

                        <ul className={`space-y-2 ${isArabic ? 'pr-6 border-r' : 'pl-6 border-l'} border-zinc-100 dark:border-zinc-800`}>
                          {subtopic.details[lang].map((detail, detailIdx) => (
                            <li
                              key={detailIdx}
                              className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Resources Sidebar (4 cols) - الشريط الجانبي للمصادر */}
          <div className="lg:col-span-4 space-y-8">

            {/* Resources Widget */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                <FiBookOpen className="text-zinc-500" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                  {isArabic ? 'المصادر' : 'REFERENCES'}
                </h3>
              </div>
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {session.resources[lang].map((resource, idx) => (
                  <li key={idx} className="p-4 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    {resource}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links Widget */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                <FiLink className="text-zinc-500" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                  {isArabic ? 'روابط خارجية' : 'EXTERNAL_LINKS'}
                </h3>
              </div>
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {session.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group"
                    >
                      <span className="font-medium">{link.title[lang]}</span>
                      <span className="text-xs opacity-50 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Navigation: "Pagination" Style - تذييل التنقل */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black py-8 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Prev Button */}
            <div className="w-1/2 md:w-auto">
              {sessionId > 1 ? (
                <Link
                  href={`/${locale}/web/courses/fintech-fundamentals/session/${sessionId - 1}`}
                  className="group flex flex-col md:flex-row items-start md:items-center gap-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                    {isArabic ? <FiArrowRight /> : <FiArrowLeft />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">{isArabic ? 'السابق' : 'PREVIOUS'}</span>
                    <span className="text-sm font-bold">{isArabic ? 'الجلسة السابقة' : `Session 0${sessionId - 1}`}</span>
                  </div>
                </Link>
              ) : (
                <span className="opacity-0">Placeholder</span>
              )}
            </div>

            {/* Next Button */}
            <div className="w-1/2 md:w-auto text-end">
              {sessionId < 4 ? (
                <Link
                  href={`/${locale}/web/courses/fintech-fundamentals/session/${sessionId + 1}`}
                  className="group flex flex-col md:flex-row-reverse items-end md:items-center gap-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 group-hover:border-primary-500 group-hover:text-primary-500 transition-colors">
                    {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">{isArabic ? 'التالي' : 'NEXT'}</span>
                    <span className="text-sm font-bold">{isArabic ? 'الجلسة التالية' : `Session 0${sessionId + 1}`}</span>
                  </div>
                </Link>
              ) : (
                <Link
                  href={`/${locale}/web/courses/fintech-fundamentals#register`}
                  className="group flex flex-col md:flex-row-reverse items-end md:items-center gap-3 text-primary-600 dark:text-primary-400"
                >
                  <div className="w-10 h-10 rounded border border-primary-200 dark:border-primary-800 flex items-center justify-center bg-primary-50 dark:bg-primary-900/20">
                    <FiCheckCircle />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono tracking-widest opacity-70">{isArabic ? 'إكمال' : 'COMPLETE'}</span>
                    <span className="text-sm font-bold">{isArabic ? 'التسجيل النهائي' : 'Final Registration'}</span>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}