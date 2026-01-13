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
import StatisticsSection from './components/Statics';

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
      {/* Hero Section with 3D Animation - Engineering Style */}
      <section className="relative bg-zinc-950 text-white py-32 md:py-40 overflow-hidden min-h-[90vh] flex items-center border-b border-zinc-800">

        {/* 1. The 3D Scene */}
        <Hero3D />

        {/* 2. Engineering Grid Overlay (Optional but recommended for depth) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

        {/* 3. Vignette/Spotlight Effect to focus on text */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/60 to-zinc-950 z-0 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">

            {/* Title */}
            <AnimatedSection direction="up" delay={0.2} distance={20}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
                {/* Metallic Text Gradient */}
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent drop-shadow-2xl">
                  {hero.title}
                </span>
              </h1>
            </AnimatedSection>

            {/* Subtitle */}
            <AnimatedSection direction="up" delay={0.4} distance={20}>
              <p className="text-xl md:text-2xl mb-6 text-zinc-300 font-light max-w-3xl mx-auto">
                {hero.subtitle}
              </p>
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection direction="up" delay={0.5} distance={20}>
              <p className="text-base md:text-lg mb-12 text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                {hero.description}
              </p>
            </AnimatedSection>

            {/* Buttons - Command Line Style */}
            <AnimatedSection direction="up" delay={0.6} distance={20}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                {hero.ctaButtons.map((button: any, index: number) => (
                  <Link
                    key={index}
                    href={button.href}
                    className={`
                      group relative px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-3
                      ${button.variant === 'primary'
                        ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-600'
                      }
                    `}
                  >
                    <span>{button.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isArabic
                          ? 'rotate-180 group-hover:-translate-x-1'
                          : 'group-hover:translate-x-1'
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </AnimatedSection>

            {/* Optional: Trusted by / Tech Stack hint at bottom of hero */}
            <AnimatedSection direction="up" delay={0.8} distance={10}>
              <div className="mt-16 pt-8 border-t border-zinc-800/50 inline-flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono mb-4">
                  {isArabic ? 'متوافق مع المعايير:' : 'COMPLIANT WITH:'}
                </span>
                <div className="flex gap-6 opacity-50 grayscale mix-blend-screen">
                  {/* You can replace these with actual SVGs later */}
                  <div className="h-6 w-auto text-zinc-500 font-bold font-mono">PCI-DSS</div>
                  <div className="h-6 w-auto text-zinc-500 font-bold font-mono">ISO-27001</div>
                  <div className="h-6 w-auto text-zinc-500 font-bold font-mono">SAMA</div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>

        {/* Clean Fade at bottom instead of Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-20" />
      </section>
      {/* Statistics Section with Enhanced Cards */}
      <StatisticsSection statistics={statistics} />
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
