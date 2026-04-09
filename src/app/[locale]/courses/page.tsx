import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import CourseShowcase from '@/core/components/web/course/CourseShowcase';
import { FiCpu, FiGlobe, FiUserCheck, FiTerminal, FiArrowRight, FiArrowLeft, FiHash, FiClock, FiLayers } from 'react-icons/fi';

export default function CoursesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <main className="w-full bg-zinc-950 text-zinc-100 min-h-screen selection:bg-emerald-500/30">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="pointer-events-none fixed right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px] z-0" />

      {/* Hero Section: The "Academy Catalog" */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10 bg-zinc-900/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <FiTerminal className="w-3.5 h-3.5" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'الأرشيف_التعليمي' : 'ACADEMY_CATALOG_V2'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <h1 className="mb-8 text-5xl font-bold leading-[1.14] tracking-tight text-white md:text-7xl md:leading-[1.1]">
                {isArabic ? 'المسارات التعليمية' : 'Technical Curriculum'}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed border-l-4 border-emerald-500 pl-6 text-left rtl:text-right rtl:border-l-0 rtl:border-r-4 rtl:pr-6">
                {isArabic
                  ? 'برامج هندسية وتشريعية مصممة لبناء الجيل القادم من مطوري وقادة التقنية المالية.'
                  : 'Engineering and regulatory programs designed to compile the next generation of fintech architects.'}
              </p>
            </AnimatedSection>

            {/* System Metrics Dashboard */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="mt-12 inline-flex flex-wrap justify-center gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">

                <div className="group flex items-center gap-4 px-6 py-4 bg-zinc-800/40 hover:bg-white/[0.02] transition-colors min-w-[160px] text-left rtl:text-right">
                  <div className="p-2 rounded bg-zinc-900 text-emerald-400 ring-1 ring-white/10">
                    <FiLayers />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-mono font-bold">
                      {isArabic ? 'المراحل' : 'MODULES'}
                    </div>
                    <div className="text-zinc-100 font-bold text-xl">11+</div>
                  </div>
                </div>

                <div className="group flex items-center gap-4 px-6 py-4 bg-zinc-800/40 hover:bg-white/[0.02] transition-colors min-w-[160px] text-left rtl:text-right">
                  <div className="p-2 rounded bg-zinc-900 text-emerald-400 ring-1 ring-white/10">
                    <FiClock />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-mono font-bold">
                      {isArabic ? 'المحتوى' : 'RUNTIME'}
                    </div>
                    <div className="text-zinc-100 font-bold text-xl">60h+</div>
                  </div>
                </div>

                <div className="group flex items-center gap-4 px-6 py-4 bg-zinc-800/40 hover:bg-white/[0.02] transition-colors min-w-[160px] text-left rtl:text-right">
                  <div className="p-2 rounded bg-zinc-900 text-emerald-400 ring-1 ring-white/10">
                    <FiGlobe />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-mono font-bold">
                      {isArabic ? 'اللغات' : 'LOCALES'}
                    </div>
                    <div className="text-zinc-100 font-bold text-xl">AR/EN</div>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Visualizing the Path */}
      <section className="py-12 bg-zinc-950 border-b border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-mono text-zinc-500 mb-8 uppercase tracking-widest"></p>
          {/* Diagram Trigger: 
                 This diagram helps users visualize the sequence of courses, from basics to advanced compliance.
             */}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 md:py-28 relative z-10">
        {/* CourseShowcase handles its own container, but we ensure it sits on our background */}
        <CourseShowcase />
      </section>

      {/* "Why Learn With Us" -> "Infrastructure Capabilities" */}
      <section className="py-20 md:py-28 border-t border-white/10 bg-zinc-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <AnimatedSection className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3 block">
                {isArabic ? '// المميزات' : '// CAPABILITIES'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {isArabic ? 'لماذا تتعلم معنا؟' : 'Training Infrastructure'}
              </h2>
            </div>
            <div className="h-px flex-1 bg-white/10 mx-8 hidden md:block relative top-[-10px]" />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Practical Content */}
            <StaggerItem>
              <div className="group h-full bg-zinc-800/40 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 hover:bg-white/[0.02] shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-zinc-900 rounded-xl text-emerald-400 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-colors">
                    <FiCpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-mono uppercase tracking-wide text-zinc-100 group-hover:text-white">
                    {isArabic ? 'محتوى تطبيقي' : 'PRACTICAL_LABS'}
                  </h3>
                </div>
                <p className="text-zinc-400 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                  {isArabic
                    ? 'دراسات حالة حقيقية وأكواد برمجية من السوق السعودي والعالمي.'
                    : 'Real-world case studies and code repositories from Saudi & Global markets.'}
                </p>
              </div>
            </StaggerItem>

            {/* Experts */}
            <StaggerItem>
              <div className="group h-full bg-zinc-800/40 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 hover:bg-white/[0.02] shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-zinc-900 rounded-xl text-emerald-400 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-colors">
                    <FiUserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-mono uppercase tracking-wide text-zinc-100 group-hover:text-white">
                    {isArabic ? 'خبراء القطاع' : 'SENIOR_ENGINEERS'}
                  </h3>
                </div>
                <p className="text-zinc-400 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                  {isArabic
                    ? 'تعلم من مهندسين ومدراء منتجات بنوا أنظمة مالية ضخمة.'
                    : 'Learn from architects and product managers who shipped scaleable financial systems.'}
                </p>
              </div>
            </StaggerItem>

            {/* Bilingual */}
            <StaggerItem>
              <div className="group h-full bg-zinc-800/40 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 hover:bg-white/[0.02] shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-zinc-900 rounded-xl text-emerald-400 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-colors">
                    <FiGlobe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-mono uppercase tracking-wide text-zinc-100 group-hover:text-white">
                    {isArabic ? 'ثنائي اللغة' : 'DUAL_LOCALE'}
                  </h3>
                </div>
                <p className="text-zinc-400 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                  {isArabic
                    ? 'محتوى تقني متاح باللغتين العربية والإنجليزية لسهولة الفهم.'
                    : 'Technical documentation available in AR/EN for maximum accessibility.'}
                </p>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section: The "Deploy" Box */}
      <section className="py-20 md:py-28 bg-zinc-900 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-800/40 rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden border border-white/10 shadow-[0_0_50px_-20px_rgba(16,185,129,0.2)]">

            {/* Background Code Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none font-mono text-[10px] leading-3 overflow-hidden text-left p-4">
              {Array(30).fill('1010100110101110100101010').join(' ')}
            </div>
            
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px] z-0" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                {isArabic ? 'ابدأ مسارك التقني' : 'Initialize Learning Path'}
              </h2>
              <p className="text-xl text-zinc-400 mb-10 font-light">
                {isArabic
                  ? 'انضم إلى النخبة التي تبني البنية التحتية المالية للمملكة.'
                  : 'Join the elite builders architecting the Kingdom\'s financial infrastructure.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={`/${locale}/courses/fintech-fundamentals`}
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  <FiHash />
                  {isArabic ? 'ابدأ الآن' : 'START_COURSE'}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 hover:border-white/20"
                >
                  {isArabic ? 'تواصل معنا' : 'CONTACT_SUPPORT'}
                  {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}