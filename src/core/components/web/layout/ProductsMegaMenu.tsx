'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { StaggerContainer, StaggerItem } from '../home/HomeAnimations';

export default function ProductsMegaMenu({ closeMenu }: { closeMenu?: () => void }) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // --- Product Configuration ---
  const products = [
    {
      id: 'calculator',
      title: isArabic ? 'حاسبة الرسوم' : 'Fee Calculator',
      description: isArabic ? 'حساب دقيق لصافي الربح وخصم ضريبة القيمة المضافة.' : 'Precise net profit calculation with VAT deduction.',
      href: '/web/products/fee-calculator',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'group-hover:border-blue-200',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 4h-6m4 8h3a2 2 0 002-2V7a2 2 0 00-2-2h-3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'compliance',
      title: isArabic ? 'فاحص الامتثال' : 'Compliance Checker',
      description: isArabic ? 'تحقق من توافق منتجك مع لوائح البنك المركزي.' : 'Check product alignment with SAMA/CBUAE regulations.',
      href: '/web/products/compliance-checker',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'group-hover:border-emerald-200',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'market',
      title: isArabic ? 'راديو السوق' : 'Market Radar',
      description: isArabic ? 'رؤى بيانية وتحليلات لقطاع التقنية المالية.' : 'Data visualization and insights for the Fintech sector.',
      href: '/web/products/market-analysis',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'group-hover:border-purple-200',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div
      className="absolute top-full left-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <StaggerContainer className="container mx-auto px-6 py-8">

        {/* Header Label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-4 w-1 bg-blue-600 rounded-full"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {isArabic ? 'الأدوات والمنتجات' : 'Products & Tools'}
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <Link
                href={`/${locale}${product.href}`}
                onClick={closeMenu}
                className={`group flex flex-col p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 h-full ${product.borderColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${product.bgColor} ${product.iconColor}`}>
                    {product.icon}
                  </div>
                  {/* Hover Arrow */}
                  <span className={`text-gray-300 group-hover:text-gray-600 transition-all transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${isArabic ? 'group-hover:-translate-x-1' : ''}`}>
                    →
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {product.description}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </div>

        {/* View All Products Link */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-end">
          <Link
            href={`/${locale}/web/products`}
            onClick={closeMenu}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="font-bold text-sm">
              {isArabic ? 'عرض جميع المنتجات' : 'View All Products'}
            </span>
            <svg className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Developer Hub Footer (Integration CTA) */}
        {/* <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  {isArabic ? 'مركز المطورين' : 'Developer Hub'}
                </h4>
                <p className="text-xs text-slate-500">
                  {isArabic ? 'وثائق API، بيئة التجربة (Sandbox)، ومكتبات الربط.' : 'API Docs, Sandbox environment, and SDKs.'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/${locale}/docs`}
                onClick={closeMenu}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
              >
                {isArabic ? 'قراءة الوثائق' : 'Read Documentation'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={closeMenu}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-2"
              >
                {isArabic ? 'تواصل مع المبيعات' : 'Contact Sales'}
              </Link>
            </div>

          </div>
        </div> */}

      </StaggerContainer>
    </div>
  );
}