'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiTool, FiLayers, FiUsers, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const SERVICE_IDS = ['consulting', 'mentorship', 'architecture'] as const;

const SERVICE_ICONS = {
  consulting: FiTool,
  architecture: FiLayers,
  mentorship: FiUsers,
} as const;

export default function ServicesSection() {
  const t = useTranslations('web.home.services');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <AnimatedSection className="mb-8 md:mb-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            {t('kicker')}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
            {t('title')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t('intro')}
          </p>
        </AnimatedSection>

        {/* One panel, three lanes — spec-sheet feel instead of separate cards */}
        <StaggerContainer>
          <StaggerItem>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
              <div className="grid divide-y divide-zinc-200 dark:divide-zinc-800 md:grid-cols-3 md:divide-x md:divide-y-0">
                {SERVICE_IDS.map((id, index) => {
                  const Icon = SERVICE_ICONS[id];
                  const isMentorship = id === 'mentorship';
                  const step = String(index + 1).padStart(2, '0');

                  return (
                    <article
                      key={id}
                      className={
                        isMentorship
                          ? 'relative bg-primary-500/[0.06] px-5 py-7 dark:bg-primary-500/[0.08] md:px-6 md:py-8 lg:px-8'
                          : 'px-5 py-7 md:px-6 md:py-8 lg:px-8'
                      }
                    >
                      {isMentorship ? (
                        <span className="mb-3 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-primary-700 dark:text-primary-300">
                          {t('items.mentorship.badge')}
                        </span>
                      ) : null}

                      <div className="flex gap-3">
                        <div className="flex shrink-0 items-center gap-2 pt-0.5" aria-hidden>
                          <span className="font-mono text-sm font-bold tabular-nums text-zinc-300 dark:text-zinc-600">
                            {step}
                          </span>
                          <Icon
                            className={`h-4 w-4 ${isMentorship ? 'text-primary-600 dark:text-primary-400' : 'text-zinc-400 dark:text-zinc-500'}`}
                          />
                        </div>
                        <h3 className="min-w-0 flex-1 text-base font-bold leading-snug text-zinc-900 dark:text-white">
                          {t(`items.${id}.title`)}
                        </h3>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {t(`items.${id}.description`)}
                      </p>

                      {isMentorship ? (
                        <Link
                          href={`/${locale}/web/contact`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline dark:text-primary-300"
                        >
                          {t('items.mentorship.cta')}
                          {isArabic ? (
                            <FiArrowLeft className="h-3.5 w-3.5" aria-hidden />
                          ) : (
                            <FiArrowRight className="h-3.5 w-3.5" aria-hidden />
                          )}
                        </Link>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
