import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getComplianceStats,
  getModuleSummaries,
} from '@/services/compliance-checker/engine';
import {
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiCrosshair,
  FiActivity,
  FiFileText,
  FiDownload,
  FiGlobe,
  FiSave,
  FiCheckCircle,
  FiSearch,
  FiTrendingUp,
  FiLayers,
} from 'react-icons/fi';

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === 'ar';
  return {
    title: isArabic
      ? 'فاحص الامتثال — قيّم جاهزيتك لمتطلبات هيئة السوق المالية'
      : 'Compliance Checker — Assess your CMA regulatory readiness',
    description: isArabic
      ? 'أداة تقييم ذاتي مبنية على لائحة أعمال الأوراق المالية: درجة جاهزية مرجحة، تحليل الفجوات، وتقرير PDF ثنائي اللغة.'
      : 'A self-assessment engine built on the CMA Securities Business Regulations: weighted readiness score, gap analysis, and a bilingual PDF report.',
  };
}

export default function ComplianceCheckerLanding({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isArabic = locale === 'ar';
  const stats = getComplianceStats();
  const modules = getModuleSummaries();
  const assessHref = `/${locale}/products/compliance-checker/assess`;
  const rulesHref = `/${locale}/products/compliance-checker/rules`;
  const Arrow = isArabic ? FiArrowLeft : FiArrowRight;

  const steps = [
    {
      icon: FiCrosshair,
      title: isArabic ? 'حدد نطاق عملياتك' : 'Define your scope',
      body: isArabic
        ? 'اختر الأنشطة المرخصة التي تمارسها. تُعرض عليك الضوابط المنطبقة على نشاطك فقط، إلى جانب الضوابط العامة.'
        : 'Pick the licensed activities you perform. Only controls that apply to your scope are included, alongside the general ones.',
    },
    {
      icon: FiActivity,
      title: isArabic ? 'أجرِ التدقيق' : 'Run the audit',
      body: isArabic
        ? 'استبيان متصل واحد يمر عبر الوحدات تلقائياً. تخطَّ ما لا ينطبق، وتُحفظ إجاباتك في متصفحك لتكمل لاحقاً.'
        : 'One continuous questionnaire that flows across modules. Skip what doesn’t apply — answers autosave in your browser so you can resume anytime.',
    },
    {
      icon: FiFileText,
      title: isArabic ? 'استلم التقرير' : 'Get the report',
      body: isArabic
        ? 'درجة جاهزية مرجحة، تفصيل لكل وحدة، فجوات مرتبة حسب الخطورة، وتوصيات ذات أولوية — مع تصدير PDF.'
        : 'A weighted readiness score, per-module breakdown, severity-ranked gaps, and prioritized actions — exportable as a PDF.',
    },
  ];

  const features = [
    {
      icon: FiCrosshair,
      title: isArabic ? 'فحوصات مخصصة لنشاطك' : 'Activity-scoped checks',
      body: isArabic
        ? 'الضوابط الخاصة بالتعامل أو الحفظ أو الإدارة تظهر فقط عند اختيار النشاط المعني.'
        : 'Dealing, custody, and managing-specific controls appear only when that activity is in scope.',
    },
    {
      icon: FiTrendingUp,
      title: isArabic ? 'درجة مرجحة وتحليل فجوات' : 'Weighted scoring & gap analysis',
      body: isArabic
        ? 'تُرجّح كل إجابة حسب مستوى المخاطر والإلزامية، وتُرتب الفجوات حسب الخطورة.'
        : 'Every answer is weighted by risk level and enforcement type; gaps are ranked by severity.',
    },
    {
      icon: FiCheckCircle,
      title: isArabic ? 'توصيات ذات أولوية' : 'Prioritized recommendations',
      body: isArabic
        ? 'خطة عمل مرتبة: ما الذي يجب معالجته أولاً، والقواعد المرتبطة به، والجهد المقدر.'
        : 'An ordered action plan: what to fix first, the rules behind it, and the estimated effort.',
    },
    {
      icon: FiDownload,
      title: isArabic ? 'تقرير PDF ثنائي اللغة' : 'Bilingual PDF report',
      body: isArabic
        ? 'تقرير حقيقي قابل للمشاركة بالعربية أو الإنجليزية — ملخص تنفيذي، نتائج الوحدات، والمستندات المطلوبة.'
        : 'A real, shareable document in Arabic or English — executive summary, module results, and required evidence.',
    },
    {
      icon: FiSearch,
      title: isArabic ? 'مستكشف القواعد' : 'Rulebook explorer',
      body: isArabic
        ? `تصفح ${stats.totalRules} قاعدة حسب الوحدة ومستوى المخاطر، مع الشرط والإجراء والأدلة لكل قاعدة.`
        : `Browse all ${stats.totalRules} rules by module and risk level, with condition, action, and evidence for each.`,
    },
    {
      icon: FiSave,
      title: isArabic ? 'خصوصية كاملة' : 'Private by design',
      body: isArabic
        ? 'بدون تسجيل وبدون خوادم — إجاباتك تبقى في متصفحك فقط.'
        : 'No signup, no servers — your answers never leave your browser.',
    },
  ];

  const statItems = [
    { value: stats.totalRules, label: isArabic ? 'قاعدة امتثال' : 'Compliance rules' },
    { value: modules.length, label: isArabic ? 'وحدات تنظيمية' : 'Regulatory modules' },
    {
      value: stats.riskScore.high,
      label: isArabic ? 'ضوابط عالية المخاطر' : 'High-risk controls',
    },
    {
      value: stats.totalActivities,
      label: isArabic ? 'أنشطة مرخصة' : 'Licensed activities',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-primary-500/30 dark:bg-black">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Hero */}
      <section className="relative z-10 border-b border-zinc-200 bg-white/50 pb-16 pt-32 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded border border-zinc-300 bg-zinc-100 px-3 py-1 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <FiShield className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {isArabic ? 'منظومة_امتثال_هيئة_السوق' : 'CMA_COMPLIANCE_SUITE'}
              </span>
            </div>

            <h1 className="mb-5 text-3xl font-black leading-[1.16] tracking-tight text-zinc-900 dark:text-white md:text-5xl md:leading-[1.14]">
              {isArabic
                ? 'اعرف جاهزيتك التنظيمية قبل أن تقدّم طلبك للهيئة'
                : 'Know your CMA readiness before the regulator does'}
            </h1>

            <p className="mb-8 max-w-2xl text-lg font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
              {isArabic
                ? `تقييم ذاتي مبني على لائحة أعمال الأوراق المالية: أجب عن فحوصات مخصصة لنطاق نشاطك، واحصل على درجة جاهزية مرجحة وتحليل للفجوات وتقرير PDF ثنائي اللغة.`
                : `A self-assessment built on the CMA Securities Business Regulations: answer checks scoped to your activities, get a weighted readiness score, a gap analysis, and a bilingual PDF report.`}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={assessHref}
                className="group inline-flex items-center gap-3 rounded-button bg-zinc-900 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <span>
                  {isArabic ? 'ابدأ التقييم — ١٠ دقائق' : 'Start assessment — ~10 min'}
                </span>
                <Arrow />
              </Link>
              <Link
                href={rulesHref}
                className="inline-flex items-center gap-2 rounded-button border border-zinc-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-zinc-700 transition-all hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
              >
                <FiSearch className="h-4 w-4" />
                <span>{isArabic ? 'تصفح القواعد' : 'Browse the rulebook'}</span>
              </Link>
            </div>

            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {isArabic
                ? 'مجاني · بدون تسجيل · إجاباتك تبقى في متصفحك'
                : 'Free · No signup · Answers stay in your browser'}
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-zinc-800 md:grid-cols-4 rtl:divide-x-reverse">
            {statItems.map((item, idx) => (
              <div key={idx} className="px-6 py-8 text-center">
                <div className="text-3xl font-black text-zinc-900 dark:text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
              {isArabic ? 'كيف يعمل' : 'How it works'}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              {isArabic ? 'ثلاث خطوات إلى تقرير جاهزيتك' : 'Three steps to your readiness report'}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-4xl font-black text-zinc-100 dark:text-zinc-800">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 border-y border-zinc-200 bg-white/50 py-20 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
              {isArabic ? 'المزايا' : 'What you get'}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              {isArabic
                ? 'أكثر من مجرد قائمة تحقق'
                : 'More than a checklist'}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {feature.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules covered */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
                {isArabic ? 'نطاق التغطية' : 'Coverage'}
              </div>
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white md:text-3xl">
                {isArabic ? 'الوحدات التنظيمية المشمولة' : 'Regulatory modules covered'}
              </h2>
            </div>
            <Link
              href={rulesHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
            >
              {isArabic ? 'استكشف جميع القواعد' : 'Explore all rules'}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Link
                key={module.module}
                href={rulesHref}
                className="group flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-emerald-500/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500/40"
              >
                <span className="flex items-center gap-3">
                  <FiLayers className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-emerald-500" />
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    {module.moduleLabel[locale as 'en' | 'ar']}
                  </span>
                </span>
                <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {module.ruleCount}{' '}
                  {isArabic
                    ? module.ruleCount >= 3 && module.ruleCount <= 10
                      ? 'قواعد'
                      : 'قاعدة'
                    : module.ruleCount === 1
                      ? 'rule'
                      : 'rules'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-8 py-14 text-center dark:border-zinc-800">
            <FiGlobe className="mx-auto mb-5 h-8 w-8 text-emerald-500" />
            <h2 className="mb-3 text-2xl font-black tracking-tight text-white md:text-3xl">
              {isArabic ? 'جاهز لاختبار جاهزيتك؟' : 'Ready to test your readiness?'}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-zinc-400">
              {isArabic
                ? 'عشر دقائق تفصلك عن صورة واضحة لوضعك التنظيمي — بالعربية أو الإنجليزية.'
                : 'Ten minutes to a clear picture of where you stand — in Arabic or English.'}
            </p>
            <Link
              href={assessHref}
              className="group inline-flex items-center gap-3 rounded-button bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-950 shadow-lg transition-all hover:bg-zinc-200"
            >
              <span>{isArabic ? 'ابدأ التقييم المجاني' : 'Start the free assessment'}</span>
              <Arrow />
            </Link>
            <p className="mt-8 text-[11px] leading-relaxed text-zinc-600">
              {isArabic
                ? 'أداة استرشادية فقط — لا تُعد استشارة قانونية ولا تمثل موقفاً رسمياً من هيئة السوق المالية.'
                : 'Guidance tool only — not legal advice and not an official CMA determination.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
