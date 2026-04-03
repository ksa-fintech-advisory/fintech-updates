'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { fintechLearnerPhases } from '@/services/api/data/fintechRoadmap.data';
import { getPhaseIcon } from '@/core/components/web/roadmap/phaseIcons';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const PREVIEW_PHASE_COUNT = 4;

export default function FintechRoadmapSection() {
  const t = useTranslations('web.home.roadmap');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';
  const previewPhases = fintechLearnerPhases.slice(0, PREVIEW_PHASE_COUNT);

  return (
    <section
      id="fintech-roadmap"
      className="relative overflow-hidden border-b border-zinc-200 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

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
            <p className="max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{t('intro')}</p>
          </div>
        </AnimatedSection>

        {/* Desktop: horizontal spine */}
        <div className="relative hidden pb-4 md:block">
          <div
            className="absolute h-0.5 rounded-full bg-gradient-to-r from-zinc-200 via-primary-500/40 to-zinc-200 dark:from-zinc-800 dark:via-primary-400/30 dark:to-zinc-800"
            style={{
              top: '1.75rem',
              insetInlineStart: '6%',
              insetInlineEnd: '6%',
            }}
            aria-hidden
          />
          <StaggerContainer className="relative grid grid-cols-4 gap-6 lg:gap-8">
            {previewPhases.map((phase, index) => {
              const Icon = getPhaseIcon(phase.id);
              const step = String(index + 1).padStart(2, '0');
              return (
                <StaggerItem key={phase.id} className="relative">
                  <article className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-zinc-900 font-mono text-sm font-bold text-white dark:border-zinc-900 dark:bg-white dark:text-black">
                      {step}
                    </div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">{phase.title[lang]}</h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{phase.summary[lang]}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Mobile: vertical timeline */}
        <StaggerContainer className="relative space-y-0 ps-1 md:hidden">
          <div
            className="absolute top-3 bottom-3 w-0.5 rounded-full bg-gradient-to-b from-zinc-200 via-primary-500/40 to-zinc-200 dark:from-zinc-800 dark:via-primary-400/30 dark:to-zinc-800"
            style={{ insetInlineStart: '1.125rem' }}
            aria-hidden
          />
          {previewPhases.map((phase, index) => {
            const Icon = getPhaseIcon(phase.id);
            const step = String(index + 1).padStart(2, '0');
            return (
              <StaggerItem key={phase.id}>
                <article
                  className={`relative flex gap-4 pb-10 ${isArabic ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zinc-900 font-mono text-[10px] font-bold text-white dark:border-zinc-900 dark:bg-white dark:text-black">
                    {step}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-zinc-900 dark:text-white">{phase.title[lang]}</h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{phase.summary[lang]}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-12 flex justify-center md:mt-16">
          <Link
            href={`/${locale}/web/roadmap`}
            className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-3 text-sm font-bold text-zinc-900 transition-all hover:border-primary-500 hover:bg-white hover:text-primary-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-primary-400 dark:hover:bg-zinc-800"
          >
            {t('viewFull')}
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
