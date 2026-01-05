import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import CourseShowcase from '@/core/components/web/course/CourseShowcase';

export default function CoursesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-24 md:py-32 overflow-hidden min-h-[50vh] flex items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-[100px] opacity-20"></div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['📚', '🎓', '💡', '🏆', '📈'].map((icon, index) => (
            <div
              key={index}
              className="absolute text-4xl opacity-20 animate-pulse"
              style={{
                top: `${20 + (index * 15) % 60}%`,
                left: `${10 + (index * 20) % 80}%`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                {isArabic ? 'تعلم • طور • انجح' : 'Learn • Grow • Succeed'}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent drop-shadow-xl">
                  {isArabic ? 'دوراتنا التعليمية' : 'Our Courses'}
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed mb-10">
                {isArabic
                  ? 'برامج تعليمية متخصصة مصممة لبناء الجيل القادم من خبراء التقنية المالية في المملكة'
                  : 'Specialized educational programs designed to build the next generation of fintech experts in the Kingdom'}
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection direction="up" delay={0.4}>
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">11+</div>
                  <div className="text-white/70 text-sm">{isArabic ? 'مراحل تعليمية' : 'Learning Phases'}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">60+</div>
                  <div className="text-white/70 text-sm">{isArabic ? 'ساعات محتوى' : 'Hours of Content'}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">2</div>
                  <div className="text-white/70 text-sm">{isArabic ? 'لغات' : 'Languages'}</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Courses Grid - Reusing Component */}
      <CourseShowcase />

      {/* Why Learn With Us Section */}
      <section className="py-24 bg-grey-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
              {isArabic ? 'لماذا تتعلم معنا؟' : 'Why Learn With Us?'}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full"></div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {isArabic ? 'محتوى عملي' : 'Practical Content'}
                </h3>
                <p className="text-grey-600">
                  {isArabic
                    ? 'دراسات حالة حقيقية وأمثلة من السوق السعودي والعالمي'
                    : 'Real case studies and examples from the Saudi and global markets'}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 mx-auto bg-accent-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  👨‍🏫
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {isArabic ? 'خبراء الصناعة' : 'Industry Experts'}
                </h3>
                <p className="text-grey-600">
                  {isArabic
                    ? 'تعلم من ممارسين لديهم سنوات من الخبرة في التقنية المالية'
                    : 'Learn from practitioners with years of experience in fintech'}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  🌍
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {isArabic ? 'ثنائي اللغة' : 'Bilingual'}
                </h3>
                <p className="text-grey-600">
                  {isArabic
                    ? 'محتوى متاح باللغتين العربية والإنجليزية لتناسب تفضيلاتك'
                    : 'Content available in both Arabic and English to suit your preferences'}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-[80px] opacity-20"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isArabic ? 'ابدأ رحلة التعلم اليوم' : 'Start Your Learning Journey Today'}
              </h2>
              <p className="text-xl text-primary-100 mb-10">
                {isArabic
                  ? 'انضم إلى مئات المتعلمين الذين يبنون مستقبل التقنية المالية في المملكة'
                  : 'Join hundreds of learners building the future of fintech in the Kingdom'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/web/courses/fintech-fundamentals`}
                  className="inline-flex items-center gap-2 bg-white text-primary-900 font-bold py-4 px-10 rounded-xl hover:bg-accent-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isArabic ? 'ابدأ الآن' : 'Start Now'}
                  <svg className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/web/contact`}
                  className="inline-flex items-center gap-2 bg-transparent text-white font-bold py-4 px-10 rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
                >
                  {isArabic ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
