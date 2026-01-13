'use client';

import Link from 'next/link';
import {
  FiArrowUpRight,
  FiTarget,
  FiPieChart,
  FiTrendingUp,
  FiActivity,
  FiGlobe,
  FiArrowRight,
  FiArrowLeft,
  FiLayers
} from 'react-icons/fi';

export default function MarketAnalysisPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';

  const content = {
    en: {
      breadcrumb: { root: 'Products', current: 'Market Intelligence' },
      hero: {
        badge: 'KSA Market Scanner',
        title: 'Saudi FinTech Landscape',
        subtitle: 'Real-time intelligence on the Saudi financial technology ecosystem. Analyze competitors, regulatory shifts, and funding flows.',
        cta: 'Open Interactive Map',
        secondary: 'Download Q3 Report',
      },
      bento: {
        marketSize: { title: 'Total Addressable Market', value: '$1.2B', sub: 'CAGR +18%', label: 'Projected 2030' },
        companies: { title: 'Active Entities', value: '155+', label: 'Licensed by SAMA/CMA' },
        growth: { title: 'YoY Adoption', value: '32.5%', label: 'Digital Payments' },
        sectors: {
          title: 'Sector Dominance',
          items: [
            { name: 'Payments', pct: 45 },
            { name: 'Lending', pct: 25 },
            { name: 'InsurTech', pct: 15 },
            { name: 'InvestTech', pct: 15 },
          ]
        },
        insight: {
          title: 'Regulatory Radar',
          desc: 'New Open Banking framework released. 12 companies expected to enter the sandbox in Q4.',
        }
      }
    },
    ar: {
      breadcrumb: { root: 'المنتجات', current: 'ذكاء السوق' },
      hero: {
        badge: 'ماسح السوق السعودي',
        title: 'مشهد التقنية المالية',
        subtitle: 'ذكاء لحظي حول منظومة التقنية المالية في السعودية. حلل المنافسين، التغيرات التنظيمية، وتدفقات التمويل.',
        cta: 'فتح الخريطة التفاعلية',
        secondary: 'تحميل تقرير الربع الثالث',
      },
      bento: {
        marketSize: { title: 'إجمالي السوق المستهدف', value: '1.2 مليار', sub: 'نمو مركب +18%', label: 'توقعات 2030' },
        companies: { title: 'الكيانات النشطة', value: '155+', label: 'مرخصة من المركزي/الهيئة' },
        growth: { title: 'النمو السنوي', value: '32.5%', label: 'المدفوعات الرقمية' },
        sectors: {
          title: 'هيمنة القطاعات',
          items: [
            { name: 'المدفوعات', pct: 45 },
            { name: 'التمويل', pct: 25 },
            { name: 'التأمين', pct: 15 },
            { name: 'الاستثمار', pct: 15 },
          ]
        },
        insight: {
          title: 'رادار التشريعات',
          desc: 'صدور إطار المصرفية المفتوحة الجديد. 12 شركة متوقع دخولها البيئة التجريبية في الربع الرابع.',
        }
      }
    },
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-purple-500/30 pb-24 text-zinc-900 dark:text-zinc-100">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* 2. Header Section */}
      <div className="relative pt-24 pb-12 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-md z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-6">
            <Link href={`/${locale}/web/products`} className="hover:text-purple-600 transition-colors">
              {t.breadcrumb.root}
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">
              {t.breadcrumb.current}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wide mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                {t.hero.badge}
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
                {t.hero.title}
              </h1>

              <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button className="px-6 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                <FiTarget /> {t.hero.secondary}
              </button>
              <Link
                href={`/${locale}/web/products/market-analysis/demo`}
                className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:bg-purple-600 dark:hover:bg-purple-200 transition-all shadow-xl shadow-purple-900/10 flex items-center justify-center gap-2 group"
              >
                {t.hero.cta}
                {isArabic ? <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> : <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Bento Grid (Dashboard Preview) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {/* Card 1: Market Size (Large) */}
          <div className="col-span-1 md:col-span-2 row-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div>
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-2">
                <FiGlobe className="text-purple-500" />
                <span className="text-xs font-bold uppercase tracking-wider">{t.bento.marketSize.title}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">
                  {t.bento.marketSize.value}
                </h3>
                <span className="text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                  {t.bento.marketSize.sub}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-2 font-mono">{t.bento.marketSize.label}</p>
            </div>

            {/* Visual: Simulated Growth Chart */}
            <div className="h-32 flex items-end gap-2 mt-8">
              {[40, 55, 45, 60, 75, 65, 85, 90, 70, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-t-lg relative group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20 transition-colors overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-purple-600 transition-all duration-1000 ease-out"
                    style={{ height: `${h}%`, opacity: 0.8 }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Active Companies */}
          <div className="col-span-1 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                <FiLayers />
              </div>
              <span className="text-xs font-mono text-zinc-400">Q3 2024</span>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{t.bento.companies.value}</div>
            <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{t.bento.companies.title}</div>
            <div className="text-xs text-zinc-400 mt-1">{t.bento.companies.label}</div>
          </div>

          {/* Card 3: Growth */}
          <div className="col-span-1 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-3xl p-6 border border-zinc-800 dark:border-zinc-200 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center text-white dark:text-black">
                  <FiTrendingUp />
                </div>
                <FiArrowUpRight className="text-emerald-500 text-xl" />
              </div>
              <div className="text-3xl font-black mb-1">{t.bento.growth.value}</div>
              <div className="text-sm font-bold opacity-90">{t.bento.growth.title}</div>
              <div className="text-xs opacity-60 mt-1">{t.bento.growth.label}</div>
            </div>
            {/* Decor */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-20"></div>
          </div>

          {/* Card 4: Sectors Breakdown */}
          <div className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FiPieChart className="text-purple-500" />
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm uppercase tracking-wide">
                {t.bento.sectors.title}
              </h3>
            </div>
            <div className="space-y-4">
              {t.bento.sectors.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs font-bold w-20 text-zinc-500">{item.name}</span>
                  <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${item.pct}%` }}></div>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Radar/Insight (Visual Eye Candy) */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-6 border border-purple-700/50 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-30">
              {/* Radar Animation CSS */}
              <div className="absolute top-1/2 right-10 w-48 h-48 border border-white/20 rounded-full -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-10 w-32 h-32 border border-white/20 rounded-full -translate-y-1/2 translate-x-8"></div>
              <div className="absolute top-1/2 right-10 w-1/2 h-1 bg-gradient-to-r from-transparent to-white/50 origin-left animate-spin" style={{ animationDuration: '4s' }}></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold mb-3 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> {t.bento.insight.title}
              </div>
              <p className="text-lg font-medium leading-relaxed max-w-md">
                "{t.bento.insight.desc}"
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}