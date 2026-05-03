'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiBriefcase, FiUsers, FiCalendar, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { getWhatsAppWaMeUrl } from '@/core/data/publicContact';

const SERVICE_IDS = ['consulting', 'enablement'] as const;

const SERVICE_ICONS = {
  consulting: FiBriefcase,
  enablement: FiUsers,
} as const;

const SERVICE_AUDIENCE = {
  consulting: { en: 'For companies', ar: 'للشركات' },
  enablement: { en: 'For engineers & teams', ar: 'للمهندسين والفرق' },
} as const;

const MENTORING_CALENDAR_URL = 'https://calendar.app.google/GHWhrmccKBtf6vma8';

export default function ServicesSection() {
  const t = useTranslations('web.home.services');
  const locale = useLocale();
  const lang = locale === 'ar' ? 'ar' : 'en';

  const contactHref = `/${locale}/contact`;
  const whatsappUrl = getWhatsAppWaMeUrl();

  return (
    <section
      id="services"
      className="relative overflow-hidden scroll-mt-24 border-b border-white/10 bg-zinc-950 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        {/* ── Section heading ── */}
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="max-w-3xl">
            <span className="mb-3 block  text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t('title')}
            </h2>
          </div>
        </AnimatedSection>

        {/* ── Service cards (informational only — no CTAs) ── */}
        <StaggerContainer className="grid gap-6 md:grid-cols-2 md:gap-8">
          {SERVICE_IDS.map((id) => {
            const Icon = SERVICE_ICONS[id];
            return (
              <StaggerItem key={id}>
                <div className="group h-full">
                  <article className="press-scale flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/40 p-6 shadow-[0_0_40px_-20px_rgba(16,185,129,0.1)] transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.02] md:p-8">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 ring-1 ring-white/10 text-emerald-400 transition-colors group-hover:ring-emerald-500/50">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70">
                      {SERVICE_AUDIENCE[id][lang]}
                    </span>
                    <h3 className="text-lg font-bold leading-snug text-zinc-100 transition-colors group-hover:text-white md:text-xl">
                      {t(`items.${id}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {t(`items.${id}.description`)}
                    </p>
                  </article>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ── Unified action strip ── */}
        <AnimatedSection className="mt-10 md:mt-14">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-6 py-8 md:px-10 md:py-10">
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-zinc-500">
              {t('actionsTitle')}
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
              {/* Primary — WhatsApp */}
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-scale inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 text-sm font-bold text-white transition-all hover:bg-[#20bd5a] hover:shadow-[0_0_24px_-4px_rgba(37,211,102,0.4)]"
                >
                  <SiWhatsapp className="h-4 w-4 shrink-0" aria-hidden />
                  {t('ctaWhatsApp')}
                </a>
              ) : null}

              {/* Secondary — Book a 1:1 session */}
              <a
                href={MENTORING_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press-scale inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-white transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
              >
                <FiCalendar className="h-4 w-4 shrink-0" aria-hidden />
                {t('ctaBookSession')}
              </a>

              {/* Secondary — Contact page */}
              <Link
                href={contactHref}
                className="press-scale inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-white transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
              >
                <FiMail className="h-4 w-4 shrink-0" aria-hidden />
                {t('ctaContact')}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
