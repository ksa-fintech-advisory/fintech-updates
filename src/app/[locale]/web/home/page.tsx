import { statisticService } from '@/services/server/statisticService';
import { heroService } from '@/services/server/heroService';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import SubscriptionForm from '@/core/components/web/home/SubscriptionForm';
import ProductShowcase from './components/ProductShowcase';
import LatestUpdates from './components/LatestUpdates';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedCourses from './components/FeaturedCourses';

const Hero3D = dynamic(() => import('@/core/components/web/home/Hero3D'), { ssr: false });

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const isArabic = locale === 'ar';

  // Fetch real statistics from API
  const statistics = await statisticService.getStatistics(locale);

  // Fetch real hero from API
  const hero = await heroService.getHero(locale) as any

  if (!hero) {
    return null; // or return proper Null State / 404
  }

  return (
    <div className="w-full">
      {/* Hero Section with 3D Animation */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* 3D Background */}
        <Hero3D />

        {/* Overlay Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/50 to-primary-900 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                  {hero.title}
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <p className="text-xl md:text-2xl mb-4 text-white/90 font-light tracking-wide">
                {hero.subtitle}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.6}>
              <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
                {hero.description}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.8}>
              <div className="flex flex-wrap gap-4 justify-center">
                {hero.ctaButtons.map((button: any, index: number) => (
                  <Link
                    key={index}
                    href={button.href}
                    className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-glow-accent ${button.variant === 'primary'
                        ? 'bg-accent hover:bg-accent-600 text-white shadow-lg shadow-accent/30'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {button.label}
                      <svg className={`w-5 h-5 transition-transform ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24 fill-grey-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Statistics Section with Enhanced Cards */}
      <section className="py-20 bg-grey-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-100 to-transparent rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat: any) => (
              <StaggerItem key={stat.id}>
                <div
                  className="relative group bg-white rounded-3xl p-8 text-center shadow-soft hover:shadow-hard transition-all duration-500 transform hover:-translate-y-2 border border-grey-100 hover:border-primary-200 h-full flex flex-col justify-center items-center"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className="relative z-10 text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-primary-500">
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <div className="relative z-10 text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="relative z-10 text-sm font-semibold text-grey-600 group-hover:text-primary-700 transition-colors leading-tight">
                    {stat.label}
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Products Section */}
      <ProductShowcase locale={locale} />

      {/* Featured Courses Section */}
      <FeaturedCourses />

      <FeaturedArticles locale={locale} />

      <LatestUpdates locale={locale} />

      {/* General Subscription Section */}
      <section className="py-20 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SubscriptionForm locale={locale} />
        </div>
      </section>
    </div>
  );
}
