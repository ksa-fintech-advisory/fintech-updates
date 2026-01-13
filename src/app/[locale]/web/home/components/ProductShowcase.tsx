'use client';

import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiShield, FiCpu, FiBarChart2, FiArrowRight, FiArrowLeft, FiTerminal } from 'react-icons/fi';

export default function ProductShowcase({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';

  const products = [
    {
      id: 'compliance',
      title: isArabic ? 'فاحص الامتثال' : 'Compliance Checker',
      desc: isArabic
        ? 'محرك قواعد للتحقق من توافق المنتج مع لوائح SAMA و CMA.'
        : 'Rule engine to validate product alignment with SAMA & CMA regs.',
      icon: <FiShield className="w-6 h-6" />,
      href: `/${locale}/web/products/compliance-checker`,
      tag: 'v2.4',
      color: 'text-emerald-600',
    },
    {
      id: 'calculator',
      title: isArabic ? 'محاكي الإيرادات' : 'Revenue Simulator', // Renamed for pro feel
      desc: isArabic
        ? 'حساب صافي الربح وخصم رسوم بوابات الدفع والضرائب بدقة.'
        : 'Calculate net yield, gateway fees, and VAT with precision.',
      icon: <FiCpu className="w-6 h-6" />,
      href: `/${locale}/web/products/fee-calculator`,
      tag: 'BETA',
      color: 'text-blue-600',
    },
    {
      id: 'analysis',
      title: isArabic ? 'ذكاء السوق' : 'Market Intelligence', // Renamed for pro feel
      desc: isArabic
        ? 'تحليل البيانات المالية وتوجهات السوق السعودي.'
        : 'Deep dive into KSA financial data and market trends.',
      icon: <FiBarChart2 className="w-6 h-6" />,
      href: `/${locale}/web/products/market-analysis`,
      tag: 'LIVE',
      color: 'text-violet-600',
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">

      {/* 1. Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 block">
                {isArabic ? '// الأدوات_الرقمية' : '// DIGITAL_TOOLKIT'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {isArabic ? 'بناء وتشغيل التقنية المالية' : 'Build & Run Fintech'}
              </h2>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm leading-relaxed">
              {isArabic
                ? 'مجموعة من الأدوات البرمجية لمساعدة المطورين ورواد الأعمال على إطلاق منتجاتهم بشكل أسرع وأكثر أماناً.'
                : 'A suite of software utilities to help developers and founders ship products faster and safer.'}
            </p>
          </div>
        </AnimatedSection>

        {/* Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <Link href={product.href} className="group block h-full outline-none">
                <article className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 relative overflow-hidden">

                  {/* Top Bar: Tag & Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300`}>
                      {product.icon}
                    </div>

                    <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                      {product.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                    {product.desc}
                  </p>

                  {/* Bottom Action: "Terminal" style link */}
                  <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-zinc-900 dark:text-white">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                      <FiTerminal className="w-3.5 h-3.5" />
                      {isArabic ? 'فتح الأداة' : 'LAUNCH_TOOL'}
                    </div>

                    <div className={`transform transition-transform duration-300 ${isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                    </div>
                  </div>

                  {/* Subtle Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-transparent dark:from-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}