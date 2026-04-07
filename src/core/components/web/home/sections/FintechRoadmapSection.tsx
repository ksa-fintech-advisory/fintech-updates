'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { fintechLearnerPhases } from '@/services/api/data/fintechRoadmap.data';
import { FiArrowLeft, FiArrowRight, FiLayers } from 'react-icons/fi';

export default function FintechRoadmapSection() {
  const t = useTranslations('web.home.roadmap');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const { totalTopics, phaseCount } = useMemo(() => {
    const list = fintechLearnerPhases;
    return {
      phaseCount: list.length,
      totalTopics: list.reduce((n, p) => n + p.topics.length, 0),
    };
  }, []);

  const roadmapHref = `/${locale}/roadmap`;
  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <section
      id="fintech-roadmap"
      className="relative overflow-hidden border-b border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-900 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
            <div className="max-w-xl text-center lg:text-start">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-base">
                {t('intro')}
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:max-w-xs">
              <div className="relative rounded-2xl p-[1px] shadow-sm">
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/35 via-zinc-200/80 to-zinc-300/40 dark:from-primary-500/25 dark:via-zinc-600/30 dark:to-zinc-800/60"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-5 rounded-2xl bg-white px-6 py-8 dark:bg-zinc-950">
                  <div className="flex items-center justify-center gap-2 font-mono text-sm font-bold text-primary-600 dark:text-primary-400 lg:justify-start">
                    <FiLayers className="h-5 w-5 shrink-0" aria-hidden />
                    <span>{t('statsLine', { phases: phaseCount, topics: totalTopics })}</span>
                  </div>
                  <Link
                    href={roadmapHref}
                    className="press-scale group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    {t('viewFull')}
                    <ArrowIcon
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isArabic ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
                      }`}
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
