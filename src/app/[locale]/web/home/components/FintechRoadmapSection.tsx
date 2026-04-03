'use client';

import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiCompass, FiLayers, FiShield, FiTrendingUp } from 'react-icons/fi';

const PHASE_IDS = ['foundation', 'architecture', 'compliance', 'launch'] as const;

const PHASE_ICONS = {
  foundation: FiCompass,
  architecture: FiLayers,
  compliance: FiShield,
  launch: FiTrendingUp,
} as const;

export default function FintechRoadmapSection() {
  const t = useTranslations('web.home.roadmap');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <section className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="mb-14 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 block">
                {t('kicker')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {t('title')}
              </h2>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </AnimatedSection>

        {/* Desktop: horizontal spine */}
        <div className="hidden md:block relative pb-4">
          <div
            className="absolute h-0.5 bg-gradient-to-r from-zinc-200 via-primary-500/40 to-zinc-200 dark:from-zinc-800 dark:via-primary-400/30 dark:to-zinc-800 rounded-full"
            style={{
              top: '1.75rem',
              insetInlineStart: '8%',
              insetInlineEnd: '8%',
            }}
            aria-hidden
          />
          <StaggerContainer className="grid grid-cols-4 gap-6 lg:gap-8 relative">
            {PHASE_IDS.map((id, index) => {
              const Icon = PHASE_ICONS[id];
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
                    <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                      {t(`items.${id}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {t(`items.${id}.description`)}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Mobile: vertical timeline */}
        <StaggerContainer className="relative md:hidden space-y-0 ps-1">
          <div
            className="absolute top-3 bottom-3 w-0.5 bg-gradient-to-b from-zinc-200 via-primary-500/40 to-zinc-200 dark:from-zinc-800 dark:via-primary-400/30 dark:to-zinc-800 rounded-full"
            style={{ insetInlineStart: '1.125rem' }}
            aria-hidden
          />
          {PHASE_IDS.map((id, index) => {
            const Icon = PHASE_ICONS[id];
            const step = String(index + 1).padStart(2, '0');
            return (
              <StaggerItem key={id}>
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
                    <h3 className="mb-2 text-base font-bold text-zinc-900 dark:text-white">
                      {t(`items.${id}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {t(`items.${id}.description`)}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
