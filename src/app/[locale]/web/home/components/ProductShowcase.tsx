'use client';

import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

export default function ProductShowcase({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
            {isArabic ? 'حلولنا الرقمية' : 'Our Solutions'}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto rounded-full mb-6"></div>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            {isArabic
              ? 'مجموعة متكاملة من الأدوات المصممة لتمكين شركات التقنية المالية'
              : 'A comprehensive suite of tools designed to empower FinTech companies'}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Compliance Checker */}
          <StaggerItem>
            <Link href={`/${locale}/web/products/compliance-checker`} className="group block h-full">
              <div className="h-full bg-white rounded-3xl p-8 shadow-medium hover:shadow-glow transition-all duration-500 border border-grey-100 hover:border-green-200 relative overflow-hidden group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    🛡️
                  </div>
                  
                  <h3 className="text-2xl font-bold text-grey-900 mb-3 group-hover:text-green-700 transition-colors">
                    {isArabic ? 'فاحص الامتثال' : 'Compliance Checker'}
                  </h3>
                  
                  <p className="text-grey-600 mb-6 leading-relaxed">
                    {isArabic 
                      ? 'تأكد من توافق منتجاتك مع لوائح البنك المركزي وهيئة السوق المالية بسهولة.'
                      : 'Ensure your products align with SAMA and CMA regulations effortlessly.'}
                  </p>
                  
                  <span className="inline-flex items-center text-green-600 font-bold group-hover:gap-2 transition-all">
                    {isArabic ? 'ابدأ الفحص' : 'Start Check'}
                    <svg className={`w-5 h-5 ml-2 transition-transform ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>

          {/* Fee Calculator */}
          <StaggerItem>
            <Link href={`/${locale}/web/products/fee-calculator`} className="group block h-full">
              <div className="h-full bg-white rounded-3xl p-8 shadow-medium hover:shadow-glow transition-all duration-500 border border-grey-100 hover:border-blue-200 relative overflow-hidden group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    🧮
                  </div>
                  
                  <h3 className="text-2xl font-bold text-grey-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {isArabic ? 'حاسبة الرسوم' : 'Fee Calculator'}
                  </h3>
                  
                  <p className="text-grey-600 mb-6 leading-relaxed">
                    {isArabic 
                      ? 'قارن بوابات الدفع واحسب صافي أرباحك بدقة متناهية.'
                      : 'Compare payment gateways and calculate your net profit with precision.'}
                  </p>
                  
                  <span className="inline-flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                    {isArabic ? 'احسب الآن' : 'Calculate Now'}
                    <svg className={`w-5 h-5 ml-2 transition-transform ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>

          {/* Market Analysis */}
          <StaggerItem>
            <Link href={`/${locale}/web/products/market-analysis`} className="group block h-full">
              <div className="h-full bg-white rounded-3xl p-8 shadow-medium hover:shadow-glow transition-all duration-500 border border-grey-100 hover:border-purple-200 relative overflow-hidden group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    📈
                  </div>
                  
                  <h3 className="text-2xl font-bold text-grey-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {isArabic ? 'تحليل السوق' : 'Market Analysis'}
                  </h3>
                  
                  <p className="text-grey-600 mb-6 leading-relaxed">
                    {isArabic 
                      ? 'رؤى وبيانات حصرية عن سوق التقنية المالية في المملكة.'
                      : 'Exclusive insights and data on the KSA FinTech market landscape.'}
                  </p>
                  
                  <span className="inline-flex items-center text-purple-600 font-bold group-hover:gap-2 transition-all">
                    {isArabic ? 'استكشف السوق' : 'Explore Market'}
                    <svg className={`w-5 h-5 ml-2 transition-transform ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
