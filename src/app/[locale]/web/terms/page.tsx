import { legalData } from '@/services/api/data/legal.data';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiClock, FiFileText, FiHash, FiShield, FiPrinter, FiDownload } from 'react-icons/fi';

export default function TermsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  const data = legalData.terms;

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-primary-500/30 text-zinc-900 dark:text-zinc-100">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Header Section: "Document Header" */}
      <section className="relative pt-32 pb-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  <FiShield className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest">
                    {isArabic ? 'وثيقة قانونية' : 'LEGAL_DOCUMENT'}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                  {isArabic ? data.title.ar : data.title.en}
                </h1>

                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
                  <FiClock />
                  <span>{isArabic ? 'آخر تحديث:' : 'LAST_UPDATED:'}</span>
                  <span className="font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {data.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Action Buttons (Mock) */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors rounded">
                  <FiPrinter /> {isArabic ? 'طباعة' : 'PRINT'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors rounded">
                  <FiDownload /> PDF
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">

            {/* Top Bar Decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 dark:from-zinc-800 dark:via-zinc-600 dark:to-zinc-800" />

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {data.sections.map((section, index) => (
                <AnimatedSection key={section.id} delay={index * 0.05}>
                  <div className="p-8 md:p-10 group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                      {/* Section Index (The "Clause Number") */}
                      <div className="shrink-0">
                        <span className="inline-block font-mono text-2xl md:text-3xl font-bold text-zinc-200 dark:text-zinc-700 group-hover:text-primary-500/50 transition-colors select-none">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                          {isArabic ? section.title.ar : section.title.en}
                          <a href={`#section-${index}`} className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-primary-600 transition-opacity">
                            <FiHash className="w-4 h-4" />
                          </a>
                        </h2>
                        <div className="prose prose-zinc dark:prose-invert max-w-none">
                          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                            {isArabic ? section.content.ar : section.content.en}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Footer of the document */}
            <div className="bg-zinc-50 dark:bg-zinc-950 p-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs font-mono text-zinc-400">
                 // {isArabic ? 'نهاية الوثيقة' : 'END_OF_DOCUMENT'} //
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}