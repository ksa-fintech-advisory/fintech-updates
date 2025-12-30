
import Link from 'next/link';

export default function FeeCalculatorPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';

  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-90">
             <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm mb-8 backdrop-blur-sm border border-blue-500/30">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              {isArabic ? 'قريباً' : 'Coming Soon'}
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
             {isArabic ? 'حاسبة الرسوم' : 'Fee Calculator'}
           </h1>
           
           <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-light mb-12">
             {isArabic 
               ? 'أداة متقدمة لحساب رسوم المدفوعات والخدمات البنكية بدقة متناهية.' 
               : 'An advanced tool to calculate banking and payment fees with precision.'}
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${locale}/web/contact`} className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
                 {isArabic ? 'أخبرني عند الإطلاق' : 'Notify Me at Launch'}
              </Link>
              <Link href={`/${locale}/web/home`} className="px-8 py-4 bg-transparent text-white font-medium rounded-xl border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm">
                 {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
           </div>
        </div>
      </div>
      
      {/* Features Preview */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-grey-100">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
                 🧮
               </div>
               <h3 className="text-xl font-bold text-grey-900 mb-3">{isArabic ? 'حساب دقيق' : 'Precise Calculation'}</h3>
               <p className="text-grey-500 leading-relaxed">
                 {isArabic ? 'خوارزميات مخصصة لكل أنواع العمليات المالية.' : 'Custom algorithms for all types of financial transactions.'}
               </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-grey-100">
               <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
                 📊
               </div>
               <h3 className="text-xl font-bold text-grey-900 mb-3">{isArabic ? 'مقارنة السيناريوهات' : 'Scenario Comparison'}</h3>
               <p className="text-grey-500 leading-relaxed">
                 {isArabic ? 'قارن بين مزودي الخدمة المختلفين لاختيار الأفضل.' : 'Compare different providers to find the best option.'}
               </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-grey-100">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
                 💾
               </div>
               <h3 className="text-xl font-bold text-grey-900 mb-3">{isArabic ? 'تصدير التقارير' : 'Export Reports'}</h3>
               <p className="text-grey-500 leading-relaxed">
                 {isArabic ? 'حمل النتائج المفصلة بصيغة PDF أو Excel.' : 'Download detailed results in PDF or Excel format.'}
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
