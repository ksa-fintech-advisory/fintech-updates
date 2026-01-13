'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { StaggerContainer, StaggerItem } from '../home/HomeAnimations';
import {
  FiDollarSign,
  FiShield,
  FiActivity,
  FiArrowRight,
  FiArrowLeft,
  FiBox,
  FiCode,
  FiCpu
} from 'react-icons/fi';

export default function ProductsMegaMenu({ closeMenu }: { closeMenu?: () => void }) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // --- Product Configuration ---
  const products = [
    {
      id: 'calculator',
      title: isArabic ? 'حاسبة الرسوم' : 'Fee Calculator',
      description: isArabic ? 'محاكاة دقيقة لصافي التسوية والضرائب.' : 'Precise net settlement & VAT simulation.',
      href: '/web/products/fee-calculator',
      // Colors for Dark/Light mode
      colorClass: 'text-blue-600 dark:text-blue-400',
      bgClass: 'bg-blue-50 dark:bg-blue-900/20',
      borderHover: 'group-hover:border-blue-500/50',
      icon: <FiDollarSign className="w-6 h-6" />
    },
    {
      id: 'compliance',
      title: isArabic ? 'رادار الامتثال' : 'Compliance Radar',
      description: isArabic ? 'فحص التوافق مع تشريعات البنك المركزي.' : 'SAMA/CBUAE regulatory alignment check.',
      href: '/web/products/compliance-checker',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderHover: 'group-hover:border-emerald-500/50',
      icon: <FiShield className="w-6 h-6" />
    },
    {
      id: 'market',
      title: isArabic ? 'ذكاء السوق' : 'Market Intelligence',
      description: isArabic ? 'تحليل المشهد التنافسي والنمو.' : 'Landscape analysis & growth forecasting.',
      href: '/web/products/market-analysis',
      colorClass: 'text-purple-600 dark:text-purple-400',
      bgClass: 'bg-purple-50 dark:bg-purple-900/20',
      borderHover: 'group-hover:border-purple-500/50',
      icon: <FiActivity className="w-6 h-6" />
    }
  ];

  return (
    <div
      className="absolute top-full left-0 w-full z-50 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-50"></div>

      <StaggerContainer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Label */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            <FiBox />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              {isArabic ? 'منصة المنتجات' : 'PRODUCT_SUITE_V1'}
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono">
              {isArabic ? 'أدوات التشغيل والامتثال' : 'OPERATIONAL & COMPLIANCE TOOLS'}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {products.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <Link
                href={`/${locale}${product.href}`}
                onClick={closeMenu}
                className={`
                  group flex flex-col p-5 h-full rounded-2xl border transition-all duration-300 relative overflow-hidden
                  bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 
                  ${product.borderHover} hover:shadow-xl hover:-translate-y-1
                `}
              >
                {/* Background Pattern on Hover */}
                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${product.bgClass} ${product.colorClass}`}>
                    {product.icon}
                  </div>

                  {/* Arrow Icon */}
                  <span className={`text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-all transform opacity-50 group-hover:opacity-100 group-hover:translate-x-1 ${isArabic ? 'group-hover:-translate-x-1' : ''}`}>
                    {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-primary-600 transition-colors mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>

        {/* Developer Hub Footer (Revived & Modernized) */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                <FiCode />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  {isArabic ? 'بوابة المطورين' : 'Developer Hub'}
                  <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 font-mono">API v2</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {isArabic ? 'وثائق الربط، البيئة التجريبية (Sandbox)، والمكتبات.' : 'Integration docs, Sandbox keys & SDKs.'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/${locale}/web/docs`}
                onClick={closeMenu}
                className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors shadow-sm"
              >
                {isArabic ? 'الوثائق التقنية' : 'Read Docs'}
              </Link>
              <Link
                href={`/${locale}/web/products`}
                onClick={closeMenu}
                className="px-4 py-2 text-xs font-bold text-white bg-zinc-900 dark:bg-white dark:text-black rounded-lg hover:bg-primary-600 dark:hover:bg-zinc-200 transition-colors shadow-sm flex items-center gap-2"
              >
                <FiCpu /> {isArabic ? 'جميع المنتجات' : 'All Products'}
              </Link>
            </div>

          </div>
        </div>

      </StaggerContainer>
    </div>
  );
}