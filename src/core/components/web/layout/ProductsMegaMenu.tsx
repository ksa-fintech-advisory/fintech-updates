'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function ProductsMegaMenu({ closeMenu }: { closeMenu?: () => void }) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const products = [
    {
      title: isArabic ? 'حاسبة الرسوم' : 'Fee Calculator',
      description: isArabic ? 'احسب رسوم المدفوعات والخدمات البنكية بسهولة' : 'Calculate banking and payment fees easily',
      href: '/web/products/fee-calculator',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 4h-6m4 8h3a2 2 0 002-2V7a2 2 0 00-2-2h-3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: isArabic ? 'فاحص الامتثال' : 'Compliance Checker',
      description: isArabic ? 'تحقق من امتثال منتجك للوائح التنظيمية' : 'Check your product compliance with regulations',
      href: '/web/products/compliance-checker',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-50 text-green-600',
    },
    {
       title: isArabic ? 'تحليل السوق' : 'Market Analysis',
       description: isArabic ? 'رؤى وتحليلات لسوق التقنية المالية' : 'Insights and analytics for the Fintech market',
       href: '/web/products/market-analysis',
       icon: (
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
         </svg>
       ),
       color: 'bg-purple-50 text-purple-600',
    }
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-white border-t border-grey-100 shadow-xl rounded-b-3xl overflow-hidden animate-slide-down transform origin-top z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Link
              key={index}
              href={`/${locale}${product.href}`}
              onClick={closeMenu}
              className="group flex gap-4 p-4 rounded-2xl hover:bg-grey-50 transition-all duration-300 border border-transparent hover:border-grey-100"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${product.color}`}>
                {product.icon}
              </div>
              <div>
                <h3 className="font-bold text-grey-900 group-hover:text-primary transition-colors mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-grey-500 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
          
           {/* Call to Action Box */}
          <div className="md:col-span-2 lg:col-span-3 mt-4 pt-6 border-t border-grey-100 flex flex-col md:flex-row items-center justify-between bg-primary-50/50 p-4 rounded-xl gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                 </span>
                 <div>
                    <p className="font-bold text-grey-900 text-sm">
                  {isArabic ? 'عرض جميع المنتجات والحلول' : 'View all products & solutions'}
                    </p>
                    <p className="text-xs text-grey-500">
                  {isArabic ? 'استكشف مجموعتنا الكاملة من الأدوات' : 'Explore our complete suite of tools'}
                    </p>
                 </div>
              </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Link
                href={`/${locale}/web/products`}
                onClick={closeMenu}
                className="px-4 py-2 bg-white text-primary-600 text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all border border-primary-100 flex-1 md:flex-none text-center"
              >
                {isArabic ? 'عرض الكل' : 'View All'}
              </Link>
              <Link
                href={`/${locale}/web/contact`}
                onClick={closeMenu}
                className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary-700 transition-all flex-1 md:flex-none text-center"
              >
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
}
