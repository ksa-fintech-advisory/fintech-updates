import { aboutUsService } from '@/services/api/mock';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const content = await aboutUsService.getAboutUsContent();
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <div className="w-full">
      {/* Enhanced Hero Section with Animation */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-24 overflow-hidden">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6 animate-slide-down">
              <span className="text-sm font-semibold">
                {isArabic ? '👋 تعرف علينا' : '👋 Get to Know Us'}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent">
                {isArabic ? 'من نحن' : 'About Us'}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {isArabic
                ? 'مصدرك الموثوق لرؤى وتحليلات التقنية المالية السعودية'
                : 'Your trusted source for Saudi FinTech insights and analysis'}
            </p>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 fill-white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Author Profile Section - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-40"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center p-10 bg-gradient-to-br from-white to-grey-50 rounded-3xl shadow-hard border border-grey-100 animate-slide-up">
              {/* Avatar with Animation */}
              <div className="relative flex-shrink-0 animate-zoom-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-40 h-40 bg-gradient-saudi rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-glow transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                  MA
                </div>
                {/* Decorative Ring */}
                <div className="absolute inset-0 border-4 border-primary-200 rounded-full animate-ping opacity-20"></div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-4xl font-bold text-grey-900 mb-3">Mohammed Abdo</h2>
                <p className="text-2xl text-primary-700 mb-5 font-semibold">
                  {isArabic ? 'خبير التقنية المالية ومحلل الصناعة' : 'FinTech Expert & Industry Analyst'}
                </p>
                <p className="text-grey-700 leading-relaxed text-lg">
                  {isArabic
                    ? 'محترف متمرس في مجال التقنية المالية مع خبرة واسعة في مشهد التكنولوجيا المالية السعودية. متخصص في الامتثال التنظيمي، وابتكارات الخدمات المصرفية الرقمية، وتقنيات الدفع الناشئة، أقدم تحليلات عميقة ورؤى حول النظام البيئي للتقنية المالية سريع التطور في المملكة وعبر منطقة دول مجلس التعاون الخليجي.'
                    : 'A seasoned FinTech professional with extensive experience in the Saudi financial technology landscape. Specializing in regulatory compliance, digital banking innovations, and emerging payment technologies, I provide in-depth analysis and insights into the rapidly evolving FinTech ecosystem in the Kingdom and across the GCC region.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side with Cards */}
      <section className="py-20 bg-grey-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="group p-8 bg-white rounded-3xl shadow-medium hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 border border-grey-100 hover:border-primary-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🎯</div>
                <h3 className="text-3xl font-bold text-grey-900 mb-4 group-hover:text-primary transition-colors">
                  {isArabic ? 'مهمتنا' : 'Our Mission'}
                </h3>
                <p className="text-grey-700 leading-relaxed text-lg">
                  {isArabic ? content.mission.ar : content.mission.en}
                </p>
              </div>

              {/* Vision Card */}
              <div className="group p-8 bg-white rounded-3xl shadow-medium hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 border border-grey-100 hover:border-primary-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🔭</div>
                <h3 className="text-3xl font-bold text-grey-900 mb-4 group-hover:text-primary transition-colors">
                  {isArabic ? 'رؤيتنا' : 'Our Vision'}
                </h3>
                <p className="text-grey-700 leading-relaxed text-lg">
                  {isArabic ? content.vision.ar : content.vision.en}
                </p>
              </div>
            </div>

            {/* Description Highlight */}
            <div className="mt-12 p-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl text-white shadow-glow animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-xl leading-relaxed text-center">
                {isArabic ? content.description.ar : content.description.en}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Enhanced Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-saudi bg-clip-text text-transparent mb-4">
                {isArabic ? 'قيمنا الأساسية' : 'Our Core Values'}
              </h3>
              <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.values.map((value, idx) => (
                <div
                  key={value.id}
                  className="group p-8 bg-gradient-to-br from-white to-grey-50 border-2 border-grey-200 rounded-3xl hover:border-primary-300 hover:shadow-hard transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-zoom-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-5">
                    <div className="text-5xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {value.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-grey-900 text-xl mb-3 group-hover:text-primary transition-colors">
                        {isArabic ? value.title.ar : value.title.en}
                      </h4>
                      <p className="text-grey-600 leading-relaxed">
                        {isArabic ? value.description.ar : value.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise - Premium Cards */}
      <section className="py-20 bg-grey-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary-50 to-transparent opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-saudi bg-clip-text text-transparent mb-4">
                {isArabic ? 'مجالات الخبرة' : 'Areas of Expertise'}
              </h3>
              <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.expertise.map((area, idx) => (
                <div
                  key={area.id}
                  className="group p-8 bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-3xl border-2 border-primary-200 hover:border-primary-400 shadow-medium hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-5">
                    <div className="text-5xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary-900 text-xl mb-3 group-hover:text-primary-700 transition-colors">
                        {isArabic ? area.title.ar : area.title.en}
                      </h4>
                      <p className="text-primary-700 leading-relaxed">
                        {isArabic ? area.description.ar : area.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-grey-900 via-primary-900 to-grey-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              {isArabic ? 'ابق على اطلاع' : 'Stay Informed'}
            </h3>
            <p className="text-xl text-grey-300 mb-10 leading-relaxed">
              {isArabic
                ? 'اشترك لتلقي آخر تحديثات التقنية المالية والرؤى التنظيمية'
                : 'Subscribe to receive the latest FinTech updates and regulatory insights'}
            </p>
            <Link
              href={`/${locale}/web/contact`}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-accent hover:bg-accent-700 text-grey-900 font-bold rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-glow-accent text-lg"
            >
              <span>{isArabic ? 'تواصل معنا' : 'Contact Us'}</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
