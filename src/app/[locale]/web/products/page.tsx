import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import ProductShowcase from '../home/components/ProductShowcase';
import { FiCrosshair, FiZap, FiShield, FiArrowRight, FiArrowLeft, FiPackage, FiTerminal } from 'react-icons/fi';

export default function ProductsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <div className="w-full bg-zinc-50 dark:bg-black min-h-screen selection:bg-primary-500/30">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Hero Section: The "Solutions Registry" */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                <FiPackage className="w-3.5 h-3.5" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'كتالوج_الحلول' : 'SOLUTIONS_CATALOG'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-zinc-900 dark:text-white">
                {isArabic ? 'الأدوات الرقمية' : 'Digital Utilities'}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                {isArabic
                  ? 'محرك قواعد بيانات وأدوات حسابية مصممة لرفع كفاءة الامتثال والعمليات المالية.'
                  : 'Rule engines and calculation utilities designed to optimize compliance and financial operations.'}
              </p>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Products Grid (Reusing the Component, ensuring it fits the theme) */}
      <section className="py-20 relative z-10">
        <ProductShowcase locale={locale} />
      </section>

      {/* Benefits Section: "Core Capabilities" */}
      <section className="py-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <AnimatedSection className="mb-16 text-center">
            <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 block">
              {isArabic ? '// المعايير' : '// BENCHMARKS'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {isArabic ? 'لماذا تعتمد على أدواتنا؟' : 'Architecture Benefits'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Precision */}
            <StaggerItem>
              <div className="group h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-900 dark:text-white mb-6 border border-zinc-200 dark:border-zinc-700">
                  <FiCrosshair className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 font-mono">
                  {isArabic ? 'دقة حسابية' : 'Precision'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {isArabic
                    ? 'خوارزميات مبنية على أحدث بيانات السوق لضمان نتائج خالية من الأخطاء.'
                    : 'Algorithms built on real-time market data to ensure error-free computations.'}
                </p>
              </div>
            </StaggerItem>

            {/* Efficiency */}
            <StaggerItem>
              <div className="group h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-900 dark:text-white mb-6 border border-zinc-200 dark:border-zinc-700">
                  <FiZap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 font-mono">
                  {isArabic ? 'أداء عالي' : 'Latency'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {isArabic
                    ? 'معالجة فورية للبيانات وواجهات خفيفة الوزن لسرعة اتخاذ القرار.'
                    : 'Instant data processing and lightweight interfaces for rapid decision making.'}
                </p>
              </div>
            </StaggerItem>

            {/* Compliance */}
            <StaggerItem>
              <div className="group h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-900 dark:text-white mb-6 border border-zinc-200 dark:border-zinc-700">
                  <FiShield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 font-mono">
                  {isArabic ? 'توافق تنظيمي' : 'Compliance'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
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
      <section className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 dark:bg-black rounded-lg p-12 md:p-16 text-center text-white border border-zinc-800 shadow-2xl relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />

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
                href={`/${locale}/web/contact`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors rounded"
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