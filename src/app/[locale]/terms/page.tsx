import { legalData } from '@/services/api/data/legal.data';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiClock, FiFileText, FiHash, FiShield, FiPrinter, FiDownload } from 'react-icons/fi';

export default function TermsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  const data = legalData.terms;

  return (
    <div className="w-full min-h-screen bg-zinc-950 font-sans selection:bg-emerald-500/30 text-zinc-100">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* Header Section: "Document Header" */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/10 bg-zinc-900/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <FiShield className="w-4 h-4" />
                  <span className="text-xs  font-bold uppercase tracking-widest">
                    {isArabic ? 'وثيقة قانونية' : 'LEGAL_DOCUMENT'}
                  </span>
                </div>

                <h1 className="mb-4 text-4xl font-bold leading-[1.18] tracking-tight md:text-5xl md:leading-[1.14]">
                  {isArabic ? data.title.ar : data.title.en}
                </h1>

                <div className="flex items-center gap-2 text-zinc-500  text-sm">
                  <FiClock />
                  <span>{isArabic ? 'آخر تحديث:' : 'LAST_UPDATED:'}</span>
                  <span className="font-bold text-white bg-zinc-900 px-2 py-0.5 rounded ring-1 ring-white/10">
                    {data.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Action Buttons (Mock) */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10">
                  <FiPrinter /> {isArabic ? 'طباعة' : 'PRINT'}
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10">
                  <FiDownload /> PDF
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-zinc-800/40 border border-white/10 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.05)] overflow-hidden">

            {/* Top Bar Decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500/20 via-emerald-500/80 to-emerald-500/20" />

            <div className="divide-y divide-white/5">
              {data.sections.map((section, index) => (
                <AnimatedSection key={section.id} delay={index * 0.05}>
                  <div className="p-8 md:p-10 group hover:bg-white/[0.02] transition-colors">

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                      {/* Section Index (The "Clause Number") */}
                      <div className="shrink-0">
                        <span className="inline-block  text-2xl md:text-3xl font-bold text-zinc-700 group-hover:text-emerald-500/50 transition-colors select-none">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
                          {isArabic ? section.title.ar : section.title.en}
                          <a href={`#section-${index}`} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-emerald-400 transition-opacity">
                            <FiHash className="w-4 h-4" />
                          </a>
                        </h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-zinc-400 leading-relaxed text-base">
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
            <div className="bg-zinc-900 p-6 border-t border-white/10 text-center">
              <p className="text-xs  text-zinc-500">
                {'//'} {isArabic ? 'نهاية الوثيقة' : 'END_OF_DOCUMENT'} {'//'}
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}