'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { fintechLearnerPhases } from '@/services/api/data/fintechRoadmap.data';
import type { RoadmapResource } from '@/services/api/data/fintechRoadmap.data';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { getPhaseIcon } from './phaseIcons';
import { FiArrowLeft, FiArrowRight, FiCheck, FiExternalLink, FiLayers } from 'react-icons/fi';

/** Per-phase accent (one entry per phase index). */
const PHASE_ACCENTS = [
  {
    border: 'border-s-indigo-500 dark:border-s-indigo-400',
    iconRing: 'ring-indigo-500/25 dark:ring-indigo-400/20',
    iconTint: 'text-indigo-600 dark:text-indigo-400',
    topicHover: 'hover:border-indigo-500/40 hover:bg-indigo-500/[0.06] dark:hover:border-indigo-400/35',
    dot: 'bg-indigo-500 dark:bg-indigo-400',
  },
  {
    border: 'border-s-primary-500 dark:border-s-primary-400',
    iconRing: 'ring-primary-500/25 dark:ring-primary-400/20',
    iconTint: 'text-primary-600 dark:text-primary-400',
    topicHover: 'hover:border-primary-500/40 hover:bg-primary-500/[0.06] dark:hover:border-primary-400/35',
    dot: 'bg-primary-500 dark:bg-primary-400',
  },
  {
    border: 'border-s-sky-500 dark:border-s-sky-400',
    iconRing: 'ring-sky-500/25 dark:ring-sky-400/20',
    iconTint: 'text-sky-600 dark:text-sky-400',
    topicHover: 'hover:border-sky-500/40 hover:bg-sky-500/[0.06] dark:hover:border-sky-400/35',
    dot: 'bg-sky-500 dark:bg-sky-400',
  },
  {
    border: 'border-s-violet-500 dark:border-s-violet-400',
    iconRing: 'ring-violet-500/25 dark:ring-violet-400/20',
    iconTint: 'text-violet-600 dark:text-violet-400',
    topicHover: 'hover:border-violet-500/40 hover:bg-violet-500/[0.06] dark:hover:border-violet-400/35',
    dot: 'bg-violet-500 dark:bg-violet-400',
  },
  {
    border: 'border-s-amber-500 dark:border-s-amber-400',
    iconRing: 'ring-amber-500/25 dark:ring-amber-400/20',
    iconTint: 'text-amber-600 dark:text-amber-400',
    topicHover: 'hover:border-amber-500/40 hover:bg-amber-500/[0.06] dark:hover:border-amber-400/35',
    dot: 'bg-amber-500 dark:bg-amber-400',
  },
  {
    border: 'border-s-teal-500 dark:border-s-teal-400',
    iconRing: 'ring-teal-500/25 dark:ring-teal-400/20',
    iconTint: 'text-teal-600 dark:text-teal-400',
    topicHover: 'hover:border-teal-500/40 hover:bg-teal-500/[0.06] dark:hover:border-teal-400/35',
    dot: 'bg-teal-500 dark:bg-teal-400',
  },
  {
    border: 'border-s-rose-500 dark:border-s-rose-400',
    iconRing: 'ring-rose-500/25 dark:ring-rose-400/20',
    iconTint: 'text-rose-600 dark:text-rose-400',
    topicHover: 'hover:border-rose-500/40 hover:bg-rose-500/[0.06] dark:hover:border-rose-400/35',
    dot: 'bg-rose-500 dark:bg-rose-400',
  },
] as const;

function ResourceRow({
  resource,
  lang,
  locale,
}: {
  resource: RoadmapResource;
  lang: 'en' | 'ar';
  locale: string;
}) {
  const t = useTranslations('web.roadmapPage');
  const label = resource.label[lang];
  const internal = resource.href.startsWith('internal:');
  const path = internal ? resource.href.replace(/^internal:/, '') : resource.href;

  if (internal) {
    return (
      <li>
        <Link
          href={`/${locale}${path}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline dark:text-primary-400 dark:hover:text-primary-300"
        >
          <span>{label}</span>
          <FiArrowRight className="h-3.5 w-3.5 opacity-60 rtl:hidden" aria-hidden />
          <FiArrowLeft className="hidden h-3.5 w-3.5 opacity-60 rtl:inline" aria-hidden />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={resource.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-700 underline-offset-2 hover:text-primary-600 hover:underline dark:text-zinc-300 dark:hover:text-primary-400"
      >
        <span>{label}</span>
        <FiExternalLink className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden />
        <span className="sr-only">{t('opensNewTab')}</span>
      </a>
    </li>
  );
}

export default function FintechLearnerRoadmap() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang: 'en' | 'ar' = isArabic ? 'ar' : 'en';
  const t = useTranslations('web.roadmapPage');

  return (
    <div className="relative w-full bg-zinc-50 dark:bg-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.18),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
          aria-hidden
        />

        <div className="container relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:max-w-6xl lg:px-8 lg:pb-24 lg:pt-14">
          <AnimatedSection>
            <Link
              href={`/${locale}/web/home`}
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/50 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 backdrop-blur transition-colors hover:border-zinc-600 hover:text-white"
            >
              {isArabic ? <FiArrowRight className="h-3.5 w-3.5" aria-hidden /> : <FiArrowLeft className="h-3.5 w-3.5" aria-hidden />}
              {t('backHome')}
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-300">
              <FiLayers className="h-3.5 w-3.5 text-primary-400" aria-hidden />
              {t('kicker')}
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {t('subtitle')}
            </p>
            <p className="mt-4 max-w-3xl border-s-2 border-primary-500/50 ps-4 text-sm leading-relaxed text-zinc-500">
              {t('journeyNote')}
            </p>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-10">
              {fintechLearnerPhases.map((phase, i) => {
                const accent = PHASE_ACCENTS[i % PHASE_ACCENTS.length];
                return (
                  <a
                    key={phase.id}
                    href={`#${phase.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-700/90 bg-zinc-900/40 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                  >
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} aria-hidden />
                    <span className="font-mono text-[10px] text-zinc-500">{String(i + 1).padStart(2, '0')}</span>
                    {phase.title[lang]}
                  </a>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="relative z-20 -mt-10 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="container mx-auto max-w-5xl lg:max-w-6xl">
          <StaggerContainer className="flex flex-col gap-6 md:gap-8">
            {fintechLearnerPhases.map((phase, index) => {
              const Icon = getPhaseIcon(phase.id);
              const step = String(index + 1).padStart(2, '0');
              const accent = PHASE_ACCENTS[index % PHASE_ACCENTS.length];
              const isLast = index === fintechLearnerPhases.length - 1;
              const outcomes = phase.outcomes[lang];

              return (
                <StaggerItem key={phase.id}>
                  <article
                    id={phase.id}
                    className={`scroll-mt-24 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/90 shadow-hard backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-none ${accent.border} border-s-4`}
                  >
                    <div className="relative p-6 sm:p-8 md:p-10">
                      <span
                        className="pointer-events-none absolute -end-2 -top-4 font-mono text-[7rem] font-black leading-none text-zinc-100 select-none dark:text-zinc-800/90 sm:text-[8.5rem]"
                        aria-hidden
                      >
                        {step}
                      </span>

                      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 ring-2 dark:bg-zinc-800/80 ${accent.iconRing} ${accent.iconTint}`}
                        >
                          <Icon className="h-8 w-8" aria-hidden />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-400`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} aria-hidden />
                              {t('phaseLabel', { n: step })}
                            </span>
                          </div>
                          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
                            {phase.title[lang]}
                          </h2>
                          <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {phase.summary[lang]}
                          </p>

                          <div className="mt-6 rounded-xl border border-zinc-200/90 bg-zinc-50/90 p-4 dark:border-zinc-700/80 dark:bg-zinc-950/50">
                            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                              {t('outcomesHeading')}
                            </p>
                            <ul className="space-y-2">
                              {outcomes.map((line, oi) => (
                                <li key={oi} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                  <FiCheck className={`mt-0.5 h-4 w-4 shrink-0 ${accent.iconTint}`} aria-hidden />
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <p className="mt-10 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                            {t('topicsHeading')}
                          </p>
                          <p className="mt-1 max-w-2xl text-xs text-zinc-500 dark:text-zinc-400">{t('topicsSub')}</p>

                          <ul className="mt-6 flex flex-col gap-4" role="list">
                            {phase.topics.map((topic, ti) => (
                              <li key={topic.id}>
                                <div
                                  className={`rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm transition-colors dark:border-zinc-700/80 dark:bg-zinc-900/60 sm:p-5 ${accent.topicHover}`}
                                >
                                  <div className="flex flex-wrap items-start gap-3">
                                    <span
                                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold text-white ${accent.dot}`}
                                      aria-hidden
                                    >
                                      {ti + 1}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <h3 className="text-base font-bold text-zinc-900 dark:text-white md:text-lg">
                                        {topic.title[lang]}
                                      </h3>
                                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {topic.description[lang]}
                                      </p>
                                      {topic.resources.length > 0 ? (
                                        <details className="group mt-4 rounded-xl border border-zinc-200 bg-zinc-50/80 dark:border-zinc-700 dark:bg-zinc-950/40">
                                          <summary className="cursor-pointer list-none px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wide text-zinc-600 marker:content-none dark:text-zinc-400 [&::-webkit-details-marker]:hidden">
                                            <span className="inline-flex items-center gap-2">
                                              {t('resourcesHeading')}
                                              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                                {topic.resources.length}
                                              </span>
                                              <span className="inline-block text-zinc-400 transition-transform group-open:rotate-90 rtl:group-open:-rotate-90">
                                                ›
                                              </span>
                                            </span>
                                          </summary>
                                          <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-700">
                                            <p className="mb-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                                              {t('resourcesHint')}
                                            </p>
                                            <ul className="space-y-2.5">
                                              {topic.resources.map((res) => (
                                                <ResourceRow key={res.id} resource={res} lang={lang} locale={locale} />
                                              ))}
                                            </ul>
                                          </div>
                                        </details>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                  {!isLast && (
                    <div className="flex justify-center py-1" aria-hidden>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-zinc-300/90 bg-zinc-50/80 dark:border-zinc-700 dark:bg-zinc-900/50">
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-sm" />
                      </div>
                    </div>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="mt-12 md:mt-16">
            <div className="relative overflow-hidden rounded-2xl p-[1px] shadow-glow md:rounded-3xl">
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary-500/40 via-zinc-300/20 to-accent-500/30 dark:from-primary-500/20 dark:via-zinc-600/10 dark:to-accent-500/20"
                aria-hidden
              />
              <div className="relative rounded-[15px] bg-white px-6 py-10 text-center dark:rounded-[23px] dark:bg-zinc-950 md:px-10 md:py-12">
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
                  {t('disclaimer')}
                </p>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <Link
                    href={`/${locale}/web/blog`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-3.5 text-sm font-bold text-zinc-800 transition-all hover:border-primary-500/50 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-primary-400/50"
                  >
                    {t('ctaBlog')}
                  </Link>
                  <Link
                    href={`/${locale}/web/contact`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-primary-100"
                  >
                    {t('ctaContact')}
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
