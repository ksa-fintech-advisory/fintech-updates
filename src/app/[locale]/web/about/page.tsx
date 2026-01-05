
import { aboutUsApiService } from '@/services/api/aboutUsApi';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

const Network3D = dynamic(() => import('@/core/components/web/about/Network3D'), { ssr: false });

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const content = await aboutUsApiService.getAboutUsContent(locale);
  const isArabic = locale === 'ar';

  // Load translations
  const t = await getTranslations('web.about');

  return (
    <div className="w-full">
      {/* Enhanced Hero Section with Animation */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-24 md:py-32 overflow-hidden min-h-[70vh] flex items-center">
        {/* 3D Network Background */}
        <Network3D />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/60 to-primary-900 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="down">
              <div className="inline-block px-6 py-2 bg-white/10 rounded-full backdrop-blur-md mb-8 border border-white/20 shadow-lg">
                <span className="text-sm font-bold tracking-wider uppercase text-accent-300">
                  {isArabic ? '👋 تعرف علينا' : '👋 Get to Know Us'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent drop-shadow-xl">
                  {t('title')}
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <p className="text-xl md:text-3xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                {t('subtitle')}
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24 fill-white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Team/Profile Section - Enhanced */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent opacity-40 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="relative">
              <div className="flex flex-col md:flex-row gap-12 items-center p-10 md:p-14 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-hard border border-white/50 relative overflow-hidden group hover:shadow-glow transition-all duration-700">
                {/* Decorative Gradient Blob */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>

                {/* Brand Logo/Icon with Animation */}
                <div className="relative flex-shrink-0">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary-600 to-accent-600 rounded-[2rem] flex items-center justify-center text-white text-7xl font-bold shadow-2xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 relative z-10 border-4 border-white">
                    {isArabic ? 'ف' : 'F'}
                  </div>
                  {/* Decorative Rings */}
                  <div className="absolute inset-0 border-2 border-primary-200 rounded-[2rem] animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute -inset-4 border border-accent-200 rounded-[2.5rem] opacity-30 scale-110"></div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4 tracking-tight">
                    {t('authorName')}
                  </h2>
                  <p className="text-2xl text-accent-600 mb-8 font-semibold tracking-wide flex items-center justify-center md:justify-start gap-2">
                    <span className="w-8 h-0.5 bg-accent-600 rounded-full"></span>
                    {t('authorTitle')}
                  </p>
                  <p className="text-grey-600 leading-relaxed text-lg md:text-xl font-light">
                    {t('authorBio')}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side with Cards */}
      <section className="py-24 bg-grey-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Mission Card */}
              <StaggerItem>
                <div className="group h-full p-10 bg-white rounded-[2rem] shadow-medium hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 border border-grey-100 hover:border-primary-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                  <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">🎯</div>
                  <h3 className="text-3xl font-bold text-grey-900 mb-6 group-hover:text-primary-600 transition-colors relative z-10">
                    {isArabic ? 'مهمتنا' : 'Our Mission'}
                  </h3>
                  <p className="text-grey-600 leading-relaxed text-lg relative z-10">
                    {isArabic ? content.mission.ar : content.mission.en}
                  </p>
                </div>
              </StaggerItem>

              {/* Vision Card */}
              <StaggerItem>
                <div className="group h-full p-10 bg-white rounded-[2rem] shadow-medium hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 border border-grey-100 hover:border-primary-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                  <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">🔭</div>
                  <h3 className="text-3xl font-bold text-grey-900 mb-6 group-hover:text-primary-600 transition-colors relative z-10">
                    {isArabic ? 'رؤيتنا' : 'Our Vision'}
                  </h3>
                  <p className="text-grey-600 leading-relaxed text-lg relative z-10">
                    {isArabic ? content.vision.ar : content.vision.en}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Description Highlight */}
            <AnimatedSection delay={0.4}>
              <div className="p-10 md:p-14 bg-gradient-to-r from-primary-700 to-accent-700 rounded-[2.5rem] text-white shadow-glow relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>

                <p className="text-xl md:text-2xl leading-relaxed text-center font-medium relative z-10 max-w-4xl mx-auto">
                  {isArabic ? content.description.ar : content.description.en}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values - Enhanced Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
                {isArabic ? 'قيمنا الأساسية' : 'Our Core Values'}
              </h3>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto rounded-full"></div>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.values.map((value) => (
                <StaggerItem key={value.id}>
                  <div
                    className="group p-8 bg-gradient-to-br from-white to-grey-50 border border-grey-200 rounded-3xl hover:border-primary-300 hover:shadow-hard transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-6">
                      <div className="text-6xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 filter drop-shadow-md">
                        {value.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-grey-900 text-2xl mb-3 group-hover:text-primary-600 transition-colors">
                          {isArabic ? value.title.ar : value.title.en}
                        </h4>
                        <p className="text-grey-600 leading-relaxed text-lg">
                          {isArabic ? value.description.ar : value.description.en}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Areas of Expertise - Premium Cards */}
      <section className="py-24 bg-grey-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary-50 to-transparent opacity-30 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
                {isArabic ? 'مجالات الخبرة' : 'Areas of Expertise'}
              </h3>
              <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full"></div>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.expertise.map((area) => (
                <StaggerItem key={area.id}>
                  <div
                    className="group p-10 bg-white rounded-[2rem] border border-grey-100 hover:border-primary-300 shadow-medium hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden"
                  >
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex items-start gap-6 relative z-10">
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-primary-600 shadow-sm">
                        {area.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-grey-900 text-2xl mb-3 group-hover:text-primary-700 transition-colors">
                          {isArabic ? area.title.ar : area.title.en}
                        </h4>
                        <p className="text-grey-600 leading-relaxed text-lg">
                          {isArabic ? area.description.ar : area.description.en}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-grey-900 via-primary-900 to-grey-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent-500 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-primary-500 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h3 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
              {isArabic ? 'ابق على اطلاع' : 'Stay Informed'}
            </h3>
            <p className="text-xl md:text-2xl text-grey-300 mb-12 leading-relaxed font-light">
              {isArabic
                ? 'اشترك لتلقي آخر تحديثات التقنية المالية'
                : 'Subscribe to receive the latest FinTech updates and insights'}
            </p>
            <Link
              href={`/${locale}/web/contact`}
              className="group inline-flex items-center gap-3 px-12 py-5 bg-accent hover:bg-accent-400 text-grey-900 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow-accent text-xl"
            >
              <span>{isArabic ? 'تواصل معنا' : 'Contact Us'}</span>
              <svg className={`w-6 h-6 transition-transform ${isArabic ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
