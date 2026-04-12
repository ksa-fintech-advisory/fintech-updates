'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiTrendingUp, FiShield, FiCpu, FiGlobe, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const FOCUS_IDS = ['regulatory', 'product', 'engineering', 'region'] as const;

const FOCUS_ICONS = {
  regulatory: FiShield,
  product: FiTrendingUp,
  engineering: FiCpu,
  region: FiGlobe,
} as const;

export default function BlogFeatureSection() {
  const t = useTranslations('web.home.blogFeature');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 md:mb-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-3 block  text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t('title')}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">{t('intro')}</p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {FOCUS_IDS.map((id) => {
            const Icon = FOCUS_ICONS[id];
            return (
              <StaggerItem key={id}>
                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-800/40 p-6 shadow-[0_0_30px_-15px_rgba(16,185,129,0.1)] transition-all hover:border-emerald-500/30 hover:bg-white/[0.02] md:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 ring-1 ring-white/10 text-emerald-400 transition-colors group-hover:ring-emerald-500/50">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-zinc-100 transition-colors group-hover:text-white">{t(`items.${id}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{t(`items.${id}.description`)}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-12 flex justify-center md:mt-16">
          <Link
            href={`/${locale}/blog`}
            className="press-scale group inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-white transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
          >
            {t('cta')}
            <ArrowIcon
              className={`h-4 w-4 shrink-0 transition-transform ${
                isArabic ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
              }`}
              aria-hidden
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
