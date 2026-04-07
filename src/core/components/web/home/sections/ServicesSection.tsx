'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiBriefcase, FiUsers, FiArrowRight, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { getWhatsAppWaMeUrl } from '@/core/data/publicContact';

const SERVICE_IDS = ['consulting', 'enablement'] as const;

const SERVICE_ICONS = {
  consulting: FiBriefcase,
  enablement: FiUsers,
} as const;

const MENTORING_CALENDAR_URL = 'https://calendar.app.google/Vb2tKVn1AiEKFMZt6';

export default function ServicesSection() {
  const t = useTranslations('web.home.services');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const contactHref = `/${locale}/contact`;
  const whatsappUrl = getWhatsAppWaMeUrl();

  const ctaArrow = isArabic ? (
    <FiArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
  ) : (
    <FiArrowRight className="h-4 w-4 shrink-0" aria-hidden />
  );

  const btnBase =
    'inline-flex w-fit items-center justify-center gap-2 rounded-button px-5 py-3 text-sm font-bold transition-colors';

  return (
    <section
      id="services"
      className="relative overflow-hidden scroll-mt-24 border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="max-w-3xl">
            <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              {t('kicker')}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              {t('title')}
            </h2>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 md:gap-8">
          {SERVICE_IDS.map((id) => {
            const Icon = SERVICE_ICONS[id];
            return (
              <StaggerItem key={id}>
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 md:p-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-zinc-900 dark:text-white md:text-xl">
                    {t(`items.${id}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(`items.${id}.description`)}
                  </p>

                  {id === 'enablement' ? (
                    <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <a
                        href={MENTORING_CALENDAR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${btnBase} border border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200`}
                      >
                        <FiCalendar className="h-4 w-4 shrink-0" aria-hidden />
                        {t('items.enablement.ctaCalendar')}
                      </a>
                      {whatsappUrl ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${btnBase} border border-zinc-300 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-600 dark:text-white dark:hover:border-zinc-500 dark:hover:bg-zinc-800/80 dark:hover:text-white`}
                        >
                          <SiWhatsapp className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden />
                          {t('items.enablement.ctaWhatsApp')}
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <Link
                      href={contactHref}
                      className={`${btnBase} mt-auto border border-zinc-300 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:text-white dark:hover:border-zinc-500 dark:hover:bg-zinc-900/80`}
                    >
                      {t(`items.${id}.cta`)}
                      {ctaArrow}
                    </Link>
                  )}
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
