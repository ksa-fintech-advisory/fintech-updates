import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import ProductShowcase from '@/core/components/web/home/sections/ProductShowcase';
import { FiCrosshair, FiZap, FiShield, FiArrowRight, FiArrowLeft, FiPackage, FiTerminal } from 'react-icons/fi';

export default function ProductsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen selection:bg-emerald-500/30">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="pointer-events-none fixed right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px] z-0" />

      {/* Hero Section: The "Solutions Registry" */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10 bg-zinc-900/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <FiPackage className="w-3.5 h-3.5" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'كتالوج_الحلول' : 'SOLUTIONS_CATALOG'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <h1 className="mb-8 text-5xl font-bold leading-[1.14] tracking-tight text-white md:text-7xl md:leading-[1.1]">
                {isArabic ? 'الأدوات الرقمية' : 'Digital Utilities'}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                {isArabic
                  ? 'محرك قواعد بيانات وأدوات حسابية مصممة لرفع كفاءة الامتثال والعمليات المالية.'
                  : 'Rule engines and calculation utilities designed to optimize compliance and financial operations.'}
              </p>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Products Grid (Reusing the Component, ensuring it fits the theme) */}
      <section className="py-20 md:py-28 relative z-10">
        <ProductShowcase locale={locale} />
      </section>

      {/* Benefits Section: "Core Capabilities" */}
      <section className="py-20 md:py-28 border-t border-white/10 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <AnimatedSection className="mb-16 text-center">
            <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3 block">
              {isArabic ? '// المعايير' : '// BENCHMARKS'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {isArabic ? 'لماذا تعتمد على أدواتنا؟' : 'Architecture Benefits'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Precision */}
            <StaggerItem>
              <div className="group h-full bg-zinc-800/40 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 hover:bg-white/[0.02] shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-emerald-400 mb-6 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-colors">
                  <FiCrosshair className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white mb-3 font-mono">
                  {isArabic ? 'دقة حسابية' : 'Precision'}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {isArabic
                    ? 'خوارزميات مبنية على أحدث بيانات السوق لضمان نتائج خالية من الأخطاء.'
                    : 'Algorithms built on real-time market data to ensure error-free computations.'}
                </p>
              </div>
            </StaggerItem>

            {/* Efficiency */}
            <StaggerItem>
              <div className="group h-full bg-zinc-800/40 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 hover:bg-white/[0.02] shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-emerald-400 mb-6 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-colors">
                  <FiZap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white mb-3 font-mono">
                  {isArabic ? 'أداء عالي' : 'Latency'}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {isArabic
                    ? 'معالجة فورية للبيانات وواجهات خفيفة الوزن لسرعة اتخاذ القرار.'
                    : 'Instant data processing and lightweight interfaces for rapid decision making.'}
                </p>
              </div>
            </StaggerItem>

            {/* Compliance */}
            <StaggerItem>
              <div className="group h-full bg-zinc-800/40 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 hover:bg-white/[0.02] shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-emerald-400 mb-6 ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-colors">
                  <FiShield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white mb-3 font-mono">
                  {isArabic ? 'توافق تنظيمي' : 'Compliance'}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {isArabic
                    ? 'قواعد محدثة باستمرار لتتوافق مع لوائح SAMA و CMA.'
                    : 'Rule sets continuously updated to align with SAMA & CMA regulatory frameworks.'}
                </p>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section: "Deploy" Style */}
      <section className="py-20 md:py-28 border-t border-white/10 bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-800/40 rounded-2xl p-12 md:p-16 text-center text-white border border-white/10 shadow-[0_0_50px_-20px_rgba(16,185,129,0.2)] relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px] z-0" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {isArabic ? 'ابدأ الاستخدام الآن' : 'Deploy Solutions'}
              </h2>
              <p className="text-zinc-400 mb-10 text-lg">
                {isArabic
                  ? 'سواء كنت شركة ناشئة أو مؤسسة مالية، أدواتنا جاهزة للعمل.'
                  : 'Whether startup or enterprise, our tools are production-ready.'}
              </p>

              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <FiTerminal />
                <span>{isArabic ? 'تواصل معنا' : 'CONTACT_SALES'}</span>
                {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}