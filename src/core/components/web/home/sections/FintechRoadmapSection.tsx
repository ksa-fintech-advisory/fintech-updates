'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiArrowLeft, FiArrowRight, FiMap, FiBookOpen, FiLayers, FiCheckCircle, FiLock } from 'react-icons/fi';

const HIGHLIGHT_ICONS = [FiBookOpen, FiLayers, FiCheckCircle] as const;

export default function FintechRoadmapSection() {
  const t = useTranslations('web.home.roadmap');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const roadmapHref = `/${locale}/roadmap`;
  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <section
      id="fintech-roadmap"
      className="relative overflow-hidden border-b border-white/10 bg-zinc-900 py-20 md:py-28"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />
      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-emerald-500/6 blur-[140px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[300px] -translate-x-1/3 translate-y-1/4 rounded-full bg-emerald-500/4 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          {/* Promotional banner card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-800/60 via-zinc-900/80 to-zinc-950 p-8 shadow-[0_0_60px_-20px_rgba(16,185,129,0.12)] md:p-12">
            {/* Decorative corner glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-[80px]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-500/8 blur-[60px]" aria-hidden />

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
              {/* Left — text content */}
              <div className="flex-1 text-center lg:text-start">
                {/* Badge */}
                <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                  {t('badge')}
                </span>

                {/* Title */}
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  {t('title')}
                </h2>

                {/* Subtitle */}
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {t('intro')}
                </p>

                {/* Highlight points */}
                <ul className="mt-6 flex flex-col gap-3 sm:gap-2.5">
                  {([0, 1, 2] as const).map((i) => {
                    const Icon = HIGHLIGHT_ICONS[i];
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-start text-sm text-zinc-300"
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                        <span>{t(`highlights.${i}`)}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href={roadmapHref}
                    className="press-scale group inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-bold text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_24px_-4px_rgba(16,185,129,0.4)]"
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

              {/* Right — visual element (topic chips) - Blurred for anticipation */}
              <div className="mx-auto w-full max-w-xs shrink-0 lg:mx-0">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/50 p-5 backdrop-blur-sm">
                  
                  <div className="pointer-events-none select-none opacity-40 blur-[4px] transition-all duration-700 hover:blur-[3px]">
                    <div className="mb-4 flex items-center gap-2 text-sm font-bold text-emerald-400">
                      <FiMap className="h-4 w-4 shrink-0" aria-hidden />
                      <span>{t('topicsLabel')}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {([0, 1, 2, 3, 4, 5] as const).map((i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/5 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-300"
                        >
                          {t(`topics.${i}`)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lock Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/20">
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/90 px-4 py-3 shadow-2xl backdrop-blur-md">
                      <FiLock className="h-5 w-5 text-amber-400" aria-hidden />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                        {isArabic ? 'محتوى حصري' : 'Unlocking Soon'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
