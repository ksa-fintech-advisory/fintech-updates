
import Link from 'next/link';

export default function MarketAnalysisPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';

  const content = {
    en: {
      hero: {
        badge: 'Market Intelligence',
        title: 'KSA FinTech Market Analysis',
        subtitle: 'Deep dive into the Saudi financial technology landscape. Access real-time projected data, unlimited market breakdown, and regulatory impact assessments.',
        cta: 'Launch Simulator',
        secondary: 'View Reports',
      },
      stats: [
        { value: '150+', label: 'FinTech Companies' },
        { value: '$1.2B', label: 'Market Size (Est.)' },
        { value: '30%', label: 'YoY Growth' },
      ],
      features: [
        {
          title: 'Sector Breakdown',
          description: 'Analyze performance across Payments, Lending, InsurTech, and Capital Markets.',
          icon: '📊',
        },
        {
          title: 'Growth Projections',
          description: 'AI-driven forecasting for market size and user adoption through 2030.',
          icon: '📈',
        },
        {
          title: 'Competitive Landscape',
          description: 'Identify key players, market share leaders, and emerging challengers.',
          icon: '🏆',
        },
      ],
    },
    ar: {
      hero: {
        badge: 'ذكاء السوق',
        title: 'تحليل سوق التقنية المالية',
        subtitle: 'تعمق في مشهد التكنولوجيا المالية السعودي. احصل على بيانات متوقعة، وتفاصيل دقيقة للسوق، وتقييمات للأثر التنظيمي.',
        cta: 'تشغيل المحاكي',
        secondary: 'عرض التقارير',
      },
      stats: [
        { value: '150+', label: 'شركة تقنية مالية' },
        { value: '1.2 مليار', label: 'حجم السوق (تقديري)' },
        { value: '30%', label: 'نمو سنوي' },
      ],
      features: [
        {
          title: 'توزيع القطاعات',
          description: 'تحليل الأداء عبر المدفوعات، التمويل، التقنية التأمينية، وأسواق المال.',
          icon: '📊',
        },
        {
          title: 'توقعات النمو',
          description: 'تنبؤات مدعومة بالذكاء الاصطناعي لحجم السوق ونمو المستخدمين حتى عام 2030.',
          icon: '📈',
        },
        {
          title: 'المشهد التنافسي',
          description: 'تحديد اللاعبين الرئيسيين، وحصص السوق، والمنافسين الصاعدين.',
          icon: '🏆',
        },
      ],
    },
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-slate-900 opacity-90">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 font-medium text-sm mb-6 backdrop-blur-sm border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              {t.hero.badge}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href={`/${locale}/web/products/market-analysis/demo`}
                className="w-full sm:w-auto px-8 py-4 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.hero.cta}
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-medium rounded-xl border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm">
                {t.hero.secondary}
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto border-t border-white/10 pt-8">
              {t.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-purple-300 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.features.map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-grey-100 hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-grey-900 mb-3">{feature.title}</h3>
              <p className="text-grey-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
