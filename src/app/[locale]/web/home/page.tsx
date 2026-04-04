import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import { homeData } from '@/services/api/data/home.data';
import type { HeroSection } from '@/core/types/web/home';
import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import ServicesSection from './components/ServicesSection';
import FintechRoadmapSection from './components/FintechRoadmapSection';
import BlogFeatureSection from './components/BlogFeatureSection';

const Hero3D = dynamic(() => import('@/core/components/web/home/Hero3D'), { ssr: false });

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'web.home' });
  return buildPageMetadata({
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/web/home',
  });
}

function localizedHero(hero: HeroSection, locale: string) {
  const lang = locale === 'ar' ? 'ar' : 'en';
  return {
    title: hero.title[lang],
    subtitle: hero.subtitle[lang],
    description: hero.description[lang],
    ctaButtons: hero.ctaButtons.map((btn) => ({
      label: btn.label[lang],
      href: btn.href.startsWith('#') ? btn.href : `/${locale}${btn.href}`,
      variant: btn.variant,
    })),
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const isArabic = locale === 'ar';

  const hero = localizedHero(homeData.hero, locale);
  const tHome = await getTranslations('web.home');

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

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative isolate mx-auto max-w-5xl text-center">
            {/* Title — light gradient end (no to-zinc-500): dark stops sit on the bottom of each glyph and read like a muddy overlay on Arabic descenders */}
            <AnimatedSection direction="up" delay={0.2} distance={20}>
              <h1
                className={
                  isArabic
                    ? 'mb-8 max-w-4xl mx-auto text-4xl font-bold leading-[1.2] tracking-normal text-zinc-50 sm:text-5xl md:text-6xl md:leading-[1.15] lg:text-6xl lg:leading-[1.12] [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]'
                    : 'mb-8 text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-7xl lg:text-8xl'
                }
              >
                {isArabic ? (
                  <span lang="ar" className="block px-1">
                    {hero.title}
                  </span>
                ) : (
                  <span className="box-decoration-clone bg-gradient-to-b from-white via-zinc-100 to-zinc-300 bg-clip-text px-1 py-0.5 text-transparent [-webkit-box-decoration-break:clone]">
                    {hero.title}
                  </span>
                )}
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
                {hero.ctaButtons.map((button, index) => (
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

            <AnimatedSection direction="up" delay={0.65} distance={12}>
              <p className="mt-12 text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {tHome('heroSignoff')}
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Clean Fade at bottom instead of Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-20" />
      </section>
      {/* Statistics Section with Enhanced Cards */}
      
      {/* Services */}
      <ServicesSection />

      <FintechRoadmapSection />

      <BlogFeatureSection />

      {/* Featured Courses Section */}
      {/* <FeaturedCourses /> */}

      {/* <LatestUpdates locale={locale} /> */}

      <section className="border-t border-zinc-200 bg-zinc-100/80 py-16 dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="container mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{tHome('closingLead')}</p>
          <Link
            href={`/${locale}/web/contact`}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {tHome('closingCta')}
            <svg
              className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
