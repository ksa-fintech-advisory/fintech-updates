'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiTrendingUp, FiShield, FiCpu, FiGlobe, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const FOCUS_IDS = ['regulatory', 'product', 'engineering', 'region'] as const;

const FOCUS_ICONS = {
  regulatory: FiShield,
  product: FiTrendingUp,
  engineering: FiCpu,
  region: FiGlobe,
} as const;

export default function BlogFeatureSection() {
  const t = useTranslations('web.home.blogFeature');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 md:mb-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                {t('kicker')}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                {t('title')}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">{t('intro')}</p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {FOCUS_IDS.map((id) => {
            const Icon = FOCUS_ICONS[id];
            return (
              <StaggerItem key={id}>
                <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 md:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">{t(`items.${id}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{t(`items.${id}.description`)}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-12 flex justify-center md:mt-16">
          <Link
            href={`/${locale}/blog`}
            className="press-scale group inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:border-primary-500/50 hover:shadow-md hover:text-primary-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-primary-400/50 dark:hover:text-primary-300"
          >
            {t('cta')}
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
  );
}
