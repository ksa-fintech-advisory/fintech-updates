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
      className="relative overflow-hidden border-b border-white/10 bg-zinc-900 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
            <div className="max-w-xl text-center lg:text-start">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
                {t('intro')}
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:max-w-xs">
              <div className="relative rounded-2xl p-[1px] shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/50 via-zinc-800/80 to-[#0a0a0b]"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-5 rounded-2xl bg-zinc-800/40 px-6 py-8 backdrop-blur-md">
                  <div className="flex items-center justify-center gap-2  text-sm font-bold text-emerald-400 lg:justify-start">
                    <FiLayers className="h-5 w-5 shrink-0" aria-hidden />
                    <span>{t('statsLine', { phases: phaseCount, topics: totalTopics })}</span>
                  </div>
                  <Link
                    href={roadmapHref}
                    className="press-scale group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-zinc-950 transition-all hover:bg-emerald-400"
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
