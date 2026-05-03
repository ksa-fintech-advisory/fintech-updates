import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import { homeData } from '@/services/api/data/home.data';
import type { HeroSection } from '@/core/types/web/home';
import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { AuthorNameText } from '@/core/components/web/layout/AuthorNameText';
import { ProfileAvatar } from '@/core/components/web/layout/ProfileAvatar';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const Hero3D = dynamic(() => import('@/core/components/web/home/Hero3D'), { ssr: false, loading: () => null });

const ServicesSection = dynamic(
  () => import('@/core/components/web/home/sections/ServicesSection'),
  { loading: () => null }
);
const FintechRoadmapSection = dynamic(
  () => import('@/core/components/web/home/sections/FintechRoadmapSection'),
  { loading: () => null }
);
const BlogFeatureSection = dynamic(
  () => import('@/core/components/web/home/sections/BlogFeatureSection'),
  { loading: () => null }
);

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
    path: '',
  });
}

function localizedHero(hero: HeroSection, locale: string) {
  const lang = locale === 'ar' ? 'ar' : 'en';
  return {
    title: hero.title[lang],
    titleArParts: hero.titleArParts,
    subtitle: hero.subtitle[lang],
    subtitleLeadHighlight: hero.subtitleLeadHighlight?.[lang],

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

  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <div className="w-full">
      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-zinc-800 bg-zinc-950 py-28 text-white sm:py-32 md:min-h-[90vh] md:py-36">
        <Hero3D />

        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-radial-gradient from-transparent via-zinc-950/60 to-zinc-950" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative isolate mx-auto max-w-5xl text-center sm:max-w-4xl md:max-w-5xl">
            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
              <AnimatedSection direction="up" delay={0.15} distance={18}>
                <h1
                  className={
                    isArabic
                      ? 'mx-auto max-w-4xl text-4xl font-normal leading-[1.34] tracking-normal text-[#f0f0f0] sm:text-5xl sm:leading-[1.3] md:text-6xl md:leading-[1.26] lg:text-6xl lg:leading-[1.22] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]'
                      : 'text-5xl font-bold leading-[1.12] tracking-tight text-[#f0f0f0] md:text-7xl md:leading-[1.08] lg:text-8xl lg:leading-[1.06]'
                  }
                >
                  {isArabic && hero.titleArParts ? (
                    <span lang="ar" className="block px-1">
                      {hero.titleArParts.before}
                      <span className="font-bold">{hero.titleArParts.emphasis}</span>
                      {hero.titleArParts.after}
                    </span>
                  ) : isArabic ? (
                    <span lang="ar" className="block px-1 font-bold">
                      {hero.title}
                    </span>
                  ) : (
                    <span className="block px-1 py-0.5">{hero.title}</span>
                  )}
                </h1>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.32} distance={18}>
                <div className="flex flex-col items-center gap-5">
                  <ProfileAvatar
                    size={72}
                    alt={isArabic ? 'محمد عبده' : 'Mohammed Abdo'}
                    fallbackText="Mohammed"
                    variant="circle"
                    className="ring-2 ring-emerald-400/30 shadow-[0_0_30px_rgba(52,211,153,0.15)]"
                  />
                  <p
                    lang={isArabic ? 'ar' : undefined}
                    className={`mx-auto max-w-xl whitespace-pre-line font-light text-[#999] sm:max-w-2xl md:max-w-3xl ${
                      isArabic
                        ? 'text-[1.125rem] leading-[1.85] sm:text-xl sm:leading-[1.82] md:text-2xl md:leading-[1.78]'
                        : 'text-lg leading-[1.7] sm:text-xl sm:leading-[1.68] md:text-2xl md:leading-[1.62]'
                    }`}
                  >
                    {hero.subtitleLeadHighlight ? (
                      <>
                        <AuthorNameText
                          isArabic={isArabic}
                          className={
                            isArabic
                              ? 'text-[1.22em] leading-none text-primary-400 [text-shadow:0_0_28px_rgba(52,211,153,0.45)] sm:text-[1.28em]'
                              : 'text-primary-400 [text-shadow:0_0_28px_rgba(52,211,153,0.45)]'
                          }
                        >
                          {hero.subtitleLeadHighlight.name}
                        </AuthorNameText>
                        {hero.subtitleLeadHighlight.tail}
                      </>
                    ) : (
                      hero.subtitle
                    )}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.5} distance={16}>
                <div className="mx-auto flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                  {hero.ctaButtons.map((button, index) => (
                    <Link
                      key={index}
                      href={button.href}
                      className={`
                        apple-btn group flex h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold tracking-wide sm:w-auto
                        ${
                          button.variant === 'primary'
                            ? 'bg-white text-black shadow-apple hover:bg-zinc-100 hover:shadow-apple-hover'
                            : 'border-2 border-white/80 bg-transparent text-white shadow-none hover:border-white hover:bg-white/[0.12]'
                        }
                      `}
                    >
                      <span>{button.label}</span>
                      <ArrowIcon
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                          isArabic ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
                        }`}
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
      </section>

      {/* ─── Sections ─── */}
      <ServicesSection />
      <FintechRoadmapSection />
      <BlogFeatureSection />

      {/* ─── Closing CTA ─── */}
      <section className="relative border-t border-white/10 bg-zinc-900 py-20 overflow-hidden md:py-28">
        {/* Decorative Grid & Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
        
        <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {tHome('closingTitle')}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-zinc-400 md:text-lg">
              {tHome('closingLead')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="apple-btn group inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-200 hover:bg-emerald-500 hover:text-zinc-950 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              {tHome('closingCta')}
              <ArrowIcon
                className={`h-4 w-4 shrink-0 transition-transform ${
                  isArabic ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
                }`}
                aria-hidden
              />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
