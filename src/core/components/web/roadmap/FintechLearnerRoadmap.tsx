'use client';

import { useCallback, useId, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { fintechLearnerPhases } from '@/services/api/data/fintechRoadmap.data';
import type { RoadmapPhase, RoadmapResource, RoadmapTopic } from '@/services/api/data/fintechRoadmap.data';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { getPhaseIcon } from './phaseIcons';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiExternalLink,
  FiLayers,
  FiShield,
} from 'react-icons/fi';

/** Per-phase accent (one entry per phase index). */
const PHASE_ACCENTS = [
  {
    border: 'border-s-indigo-500 dark:border-s-indigo-400',
    rail: 'bg-indigo-500/70 dark:bg-indigo-400/60',
    iconTint: 'text-indigo-600 dark:text-indigo-400',
    dot: 'border-indigo-500 dark:border-indigo-400',
    topicHover: 'hover:bg-indigo-500/[0.04] dark:hover:bg-indigo-400/[0.06]',
  },
  {
    border: 'border-s-primary-500 dark:border-s-primary-400',
    rail: 'bg-primary-500/70 dark:bg-primary-400/60',
    iconTint: 'text-primary-600 dark:text-primary-400',
    dot: 'border-primary-500 dark:border-primary-400',
    topicHover: 'hover:bg-zinc-500/[0.08] dark:hover:bg-zinc-400/[0.08]',
  },
  {
    border: 'border-s-sky-500 dark:border-s-sky-400',
    rail: 'bg-sky-500/70 dark:bg-sky-400/60',
    iconTint: 'text-sky-600 dark:text-sky-400',
    dot: 'border-sky-500 dark:border-sky-400',
    topicHover: 'hover:bg-sky-500/[0.04] dark:hover:bg-sky-400/[0.06]',
  },
  {
    border: 'border-s-violet-500 dark:border-s-violet-400',
    rail: 'bg-violet-500/70 dark:bg-violet-400/60',
    iconTint: 'text-violet-600 dark:text-violet-400',
    dot: 'border-violet-500 dark:border-violet-400',
    topicHover: 'hover:bg-violet-500/[0.04] dark:hover:bg-violet-400/[0.06]',
  },
  {
    border: 'border-s-amber-500 dark:border-s-amber-400',
    rail: 'bg-amber-500/70 dark:bg-amber-400/60',
    iconTint: 'text-amber-600 dark:text-amber-400',
    dot: 'border-amber-500 dark:border-amber-400',
    topicHover: 'hover:bg-amber-500/[0.04] dark:hover:bg-amber-400/[0.06]',
  },
  {
    border: 'border-s-teal-500 dark:border-s-teal-400',
    rail: 'bg-teal-500/70 dark:bg-teal-400/60',
    iconTint: 'text-teal-600 dark:text-teal-400',
    dot: 'border-teal-500 dark:border-teal-400',
    topicHover: 'hover:bg-teal-500/[0.04] dark:hover:bg-teal-400/[0.06]',
  },
  {
    border: 'border-s-rose-500 dark:border-s-rose-400',
    rail: 'bg-rose-500/70 dark:bg-rose-400/60',
    iconTint: 'text-rose-600 dark:text-rose-400',
    dot: 'border-rose-500 dark:border-rose-400',
    topicHover: 'hover:bg-rose-500/[0.04] dark:hover:bg-rose-400/[0.06]',
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
          className="group inline-flex items-center gap-2 text-xs font-medium text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline dark:text-primary-400 dark:hover:text-primary-300 sm:text-sm"
        >
          <span>{label}</span>
          <FiArrowRight className="h-3 w-3 opacity-60 rtl:hidden" aria-hidden />
          <FiArrowLeft className="hidden h-3 w-3 opacity-60 rtl:inline" aria-hidden />
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
        className="group inline-flex items-center gap-2 text-xs font-medium text-zinc-600 underline-offset-2 hover:text-primary-600 hover:underline dark:text-zinc-400 dark:hover:text-primary-400 sm:text-sm"
      >
        <span>{label}</span>
        <FiExternalLink className="h-3 w-3 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden />
        <span className="sr-only">{t('opensNewTab')}</span>
      </a>
    </li>
  );
}

function topicKey(phaseId: string, topicId: string) {
  return `${phaseId}:${topicId}`;
}

function RoadmapTopicRow({
  topic,
  topicIndex,
  totalTopics,
  accent,
  lang,
  locale,
  isOpen,
  onToggle,
}: {
  topic: RoadmapTopic;
  topicIndex: number;
  totalTopics: number;
  accent: (typeof PHASE_ACCENTS)[number];
  lang: 'en' | 'ar';
  locale: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations('web.roadmapPage');
  const showConnector = topicIndex < totalTopics - 1;

  return (
    <li className="flex gap-2 sm:gap-3">
      {/* Vertical spine + node (devops/roadmap.sh style) */}
      <div className="flex w-5 shrink-0 flex-col items-center pt-2.5 sm:w-6" aria-hidden>
        <div
          className={`z-10 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white bg-zinc-50 shadow-sm dark:border-zinc-950 dark:bg-zinc-900 ${accent.dot}`}
        />
        {showConnector ? (
          <div className="mt-0.5 w-px flex-1 min-h-[1.25rem] bg-zinc-200 dark:bg-zinc-700" />
        ) : null}
      </div>

      <div className={`min-w-0 flex-1 border-b border-zinc-100 pb-3 dark:border-zinc-800/90 last:border-b-0 ${accent.topicHover} rounded-e-md transition-colors`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-start gap-2 rounded-md py-2 pe-2 text-start outline-none ring-primary-500 focus-visible:ring-2"
        >
          <span className="mt-0.5 font-mono text-[11px] font-bold tabular-nums text-zinc-400">{topicIndex + 1}</span>
          <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-zinc-900 dark:text-white sm:text-base">
            {topic.title[lang]}
          </span>
          <FiChevronDown
            className={`mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden
          />
          <span className="sr-only">{isOpen ? t('collapseTopic') : t('expandTopic')}</span>
        </button>

        {isOpen ? (
          <div className="space-y-3 ps-0 sm:ps-7">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{topic.description[lang]}</p>
            {topic.resources.length > 0 ? (
              <div className="rounded-md border border-zinc-200/90 bg-zinc-50/80 px-3 py-2.5 dark:border-zinc-700/80 dark:bg-zinc-950/40">
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                  {t('resourcesHeading')}
                </p>
                <ul className="space-y-1.5">
                  {topic.resources.map((res) => (
                    <ResourceRow key={res.id} resource={res} lang={lang} locale={locale} />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  );
}

function PhaseAccordion({
  phase,
  index,
  accent,
  lang,
  locale,
  isOpen,
  onTogglePhase,
  openTopics,
  toggleTopic,
}: {
  phase: RoadmapPhase;
  index: number;
  accent: (typeof PHASE_ACCENTS)[number];
  lang: 'en' | 'ar';
  locale: string;
  isOpen: boolean;
  onTogglePhase: () => void;
  openTopics: Set<string>;
  toggleTopic: (key: string) => void;
}) {
  const t = useTranslations('web.roadmapPage');
  const Icon = getPhaseIcon(phase.id);
  const step = String(index + 1).padStart(2, '0');
  const panelId = useId();
  const outcomes = phase.outcomes[lang];

  return (
    <article
      id={phase.id}
      className={`scroll-mt-24 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none ${accent.border} border-s-[3px] sm:border-s-4`}
    >
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${panelId}-panel`}
        onClick={onTogglePhase}
        className="flex w-full items-center gap-3 px-3 py-3 text-start transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/70 sm:gap-4 sm:px-4 sm:py-3.5"
      >
        <span className="font-mono text-[11px] font-bold tabular-nums text-zinc-400 sm:text-xs">{step}</span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800/90 ${accent.iconTint}`}
        >
          <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold leading-snug text-zinc-900 dark:text-white sm:text-base">
            {phase.title[lang]}
          </span>
          <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-500">
            {t('topicCount', { count: phase.topics.length })}
          </span>
        </span>
        <FiChevronDown
          className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
        <span className="sr-only">{isOpen ? t('collapsePhase') : t('expandPhase')}</span>
      </button>

      <div
        id={`${panelId}-panel`}
        role="region"
        aria-labelledby={`${panelId}-trigger`}
        hidden={!isOpen}
        className={isOpen ? 'border-t border-zinc-100 dark:border-zinc-800' : ''}
      >
        {isOpen ? (
          <div className="space-y-4 px-3 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{phase.summary[lang]}</p>

            <div className="rounded-md border border-dashed border-zinc-200 bg-zinc-50/50 px-3 py-2.5 dark:border-zinc-700/80 dark:bg-zinc-900/30">
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                {t('outcomesHeading')}
              </p>
              <ul className="space-y-1.5">
                {outcomes.map((line, oi) => (
                  <li key={oi} className="flex gap-2 text-xs text-zinc-700 dark:text-zinc-300 sm:text-sm">
                    <FiCheck className={`mt-0.5 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${accent.iconTint}`} aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {t('topicsHeading')}
              </p>
              <ul className="mt-2" role="list">
                {phase.topics.map((topic, ti) => (
                  <RoadmapTopicRow
                    key={topic.id}
                    topic={topic}
                    topicIndex={ti}
                    totalTopics={phase.topics.length}
                    accent={accent}
                    lang={lang}
                    locale={locale}
                    isOpen={openTopics.has(topicKey(phase.id, topic.id))}
                    onToggle={() => toggleTopic(topicKey(phase.id, topic.id))}
                  />
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function FintechLearnerRoadmap() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang: 'en' | 'ar' = isArabic ? 'ar' : 'en';
  const t = useTranslations('web.roadmapPage');

  const defaultOpenPhase = fintechLearnerPhases[0]?.id ?? '';

  const [openPhases, setOpenPhases] = useState<Set<string>>(() => new Set(defaultOpenPhase ? [defaultOpenPhase] : []));
  const [openTopics, setOpenTopics] = useState<Set<string>>(() => new Set());

  const togglePhase = useCallback((id: string) => {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleTopic = useCallback((key: string) => {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const phaseAnchors = useMemo(
    () =>
      fintechLearnerPhases.map((phase, i) => ({
        phase,
        i,
        accent: PHASE_ACCENTS[i % PHASE_ACCENTS.length],
      })),
    []
  );

  return (
    <div className="relative w-full bg-zinc-50 dark:bg-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/45 to-transparent"
          aria-hidden
        />

        <div className="container relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:max-w-6xl lg:pb-28 lg:pt-14 xl:max-w-7xl">
          <AnimatedSection className="flex flex-col">
            <div className="mb-8 sm:mb-10">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700/80 bg-zinc-900/50 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 backdrop-blur transition-colors hover:border-zinc-600 hover:text-white sm:text-xs"
              >
                {isArabic ? <FiArrowRight className="h-3.5 w-3.5" aria-hidden /> : <FiArrowLeft className="h-3.5 w-3.5" aria-hidden />}
                {t('backHome')}
              </Link>
            </div>

            <header className="flex w-full flex-col gap-6 sm:gap-7">
              <div className="inline-flex w-fit items-center gap-2 rounded border border-primary-500/25 bg-primary-500/10 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-300 sm:px-3">
                <FiLayers className="h-3 w-3 shrink-0 text-primary-400" aria-hidden />
                {t('kicker')}
              </div>

              <h1
                className={`text-3xl font-bold tracking-tight sm:text-4xl sm:leading-[1.2] lg:text-[2.75rem] lg:leading-[1.16] ${
                  isArabic ? 'leading-[1.34]' : 'leading-[1.18]'
                }`}
              >
                <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h1>

              <p className="w-full text-base leading-[1.65] text-zinc-400 sm:text-lg sm:leading-relaxed">
                {t('subtitle')}
              </p>

              <div className="w-full rounded-xl border border-primary-500/25 bg-primary-500/[0.07] px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-sm leading-[1.65] text-zinc-300 sm:text-base sm:leading-relaxed">{t('journeyNote')}</p>
              </div>
            </header>

            <div className="mt-12 border-t border-zinc-800/70 pt-10 sm:mt-14 sm:pt-12">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 sm:mb-5">
                {t('phasesNavLabel')}
              </p>
              <nav className="flex flex-wrap gap-2 sm:gap-2.5" aria-label={t('phasesNavLabel')}>
                {phaseAnchors.map(({ phase, i, accent }) => (
                  <a
                    key={phase.id}
                    href={`#${phase.id}`}
                    className="inline-flex max-w-full min-h-[2.5rem] items-center gap-2 rounded-lg border border-zinc-700/90 bg-zinc-900/45 px-3 py-2 text-start text-[11px] font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-900/70 hover:text-white sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-xs"
                  >
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2 ${accent.rail}`} aria-hidden />
                    <span className="font-mono text-[10px] tabular-nums text-zinc-500">{String(i + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 truncate">{phase.title[lang]}</span>
                  </a>
                ))}
              </nav>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="relative z-10 px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="container mx-auto max-w-5xl pt-10 sm:pt-12 lg:max-w-6xl lg:pt-14 xl:max-w-7xl">
          <div className="mb-10 sm:mb-12">
            <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 shadow-sm dark:border-zinc-700/90 dark:bg-zinc-900/85 sm:px-7 sm:py-6">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {t('topicsSubLabel')}
              </p>
              <p className="text-sm leading-[1.7] text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-relaxed">
                {t('topicsSub')}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {fintechLearnerPhases.map((phase, index) => {
              const accent = PHASE_ACCENTS[index % PHASE_ACCENTS.length];
              return (
                <PhaseAccordion
                  key={phase.id}
                  phase={phase}
                  index={index}
                  accent={accent}
                  lang={lang}
                  locale={locale}
                  isOpen={openPhases.has(phase.id)}
                  onTogglePhase={() => togglePhase(phase.id)}
                  openTopics={openTopics}
                  toggleTopic={toggleTopic}
                />
              );
            })}
          </div>

          <AnimatedSection className="mt-12 sm:mt-16">
            <aside
              aria-labelledby="roadmap-disclaimer-title"
              className="overflow-hidden rounded-sm border border-zinc-300 bg-zinc-100/90 shadow-sm dark:border-zinc-600 dark:bg-zinc-900/80 sm:rounded-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-stretch">
                <div
                  className="flex items-center justify-center border-b border-zinc-300 bg-zinc-200/95 px-4 py-4 dark:border-zinc-600 dark:bg-zinc-800/95 sm:w-[4.5rem] sm:shrink-0 sm:flex-col sm:border-b-0 sm:border-e sm:px-2 sm:py-8"
                  aria-hidden
                >
                  <FiShield className="h-7 w-7 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="min-w-0 flex-1 px-5 py-6 sm:px-8 sm:py-8">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-500 dark:text-zinc-400">
                    {t('disclaimerKicker')}
                  </p>
                  <h2
                    id="roadmap-disclaimer-title"
                    className="mt-2.5 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-xl"
                  >
                    {t('disclaimerTitle')}
                  </h2>
                  <p className="mt-4 text-sm leading-[1.85] text-zinc-800 dark:text-zinc-300 sm:text-[0.9375rem] sm:leading-[1.8]">
                    {t('disclaimerBody')}
                  </p>
                </div>
              </div>
            </aside>

            <div className="mt-8 flex flex-col gap-2.5 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:pt-10">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
              >
                {t('ctaBlog')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:border-zinc-300 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {t('ctaContact')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
