'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiBookOpen, FiShield, FiCpu, FiGlobe, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const STEP_IDS = ['regulatory', 'product', 'engineering', 'region'] as const;

const STEP_ICONS = {
  regulatory: FiShield,
  product: FiBookOpen,
  engineering: FiCpu,
  region: FiGlobe,
} as const;

export default function BlogFeatureSection() {
  const t = useTranslations('web.home.blogFeature');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-950">
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

        <div className="relative hidden pb-4 md:block">
          <div
            className="absolute h-0.5 rounded-full bg-gradient-to-r from-zinc-200 via-primary-500/40 to-zinc-200 dark:from-zinc-800 dark:via-primary-400/30 dark:to-zinc-800"
            style={{
              top: '1.75rem',
              insetInlineStart: '8%',
              insetInlineEnd: '8%',
            }}
            aria-hidden
          />
          <StaggerContainer className="relative grid grid-cols-4 gap-6 lg:gap-8">
            {STEP_IDS.map((id, index) => {
              const Icon = STEP_ICONS[id];
              const step = String(index + 1).padStart(2, '0');
              return (
                <StaggerItem key={id} className="relative">
                  <article className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-zinc-900 font-mono text-sm font-bold text-white dark:border-zinc-900 dark:bg-white dark:text-black">
                      {step}
                    </div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">{t(`items.${id}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {t(`items.${id}.description`)}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Mobile timeline: step rail always first in DOM so it sits on inline-start (LTR=left, RTL=right).
            Do not use flex-row-reverse here — it moved badges away from the line in RTL. */}
        <StaggerContainer className="relative space-y-0 md:hidden">
          <div
            className="absolute top-3 bottom-3 w-0.5 rounded-full bg-gradient-to-b from-zinc-200 via-primary-500/40 to-zinc-200 dark:from-zinc-800 dark:via-primary-400/30 dark:to-zinc-800"
            style={{ insetInlineStart: 'calc(1.125rem - 1px)' }}
            aria-hidden
          />
          {STEP_IDS.map((id, index) => {
            const Icon = STEP_ICONS[id];
            const step = String(index + 1).padStart(2, '0');
            return (
              <StaggerItem key={id}>
                <article className="relative flex items-start gap-4 pb-10">
                  <div className="relative z-10 flex w-9 shrink-0 justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-900 font-mono text-[10px] font-bold text-white dark:border-zinc-900 dark:bg-white dark:text-black">
                      {step}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5 text-start">
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-zinc-900 dark:text-white">{t(`items.${id}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {t(`items.${id}.description`)}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-12 flex justify-center md:mt-16">
          <Link
            href={`/${locale}/web/blog`}
            className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:border-primary-500/50 hover:text-primary-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-primary-400/50 dark:hover:text-primary-300"
          >
            {t('cta')}
            {isArabic ? (
              <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            ) : (
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            )}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
