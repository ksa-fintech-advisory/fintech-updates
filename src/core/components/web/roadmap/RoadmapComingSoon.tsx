'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FiMap, FiArrowLeft, FiArrowRight, FiMail, FiCheck, FiX, FiLock } from 'react-icons/fi';
import { fintechLearnerPhases } from '@/services/api/data/fintechRoadmap.data';

export default function RoadmapComingSoon() {
  const t = useTranslations('web.roadmapPage');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';
  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const phases = useMemo(
    () => fintechLearnerPhases.map((p) => ({
      title: p.title[lang],
      topicCount: p.topics.length,
    })),
    [lang],
  );

  useEffect(() => {
    if (showForm && inputRef.current) inputRef.current.focus();
  }, [showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-zinc-950">
      {/* ── Backgrounds ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/6 blur-[180px]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-emerald-500/4 blur-[120px]" aria-hidden />

      {/* ── Back link ── */}
      <div className="container relative z-10 mx-auto px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowIcon
            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
              isArabic ? 'rotate-180 group-hover:translate-x-0.5' : 'rotate-180 group-hover:-translate-x-0.5'
            }`}
            aria-hidden
          />
          {t('backHome')}
        </Link>
      </div>

      {/* ── Hero ── */}
      <div className="container relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-12 sm:px-6 md:pt-16 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left — content */}
          <div className="flex-1 text-center lg:text-start">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20 lg:mx-0">
              <FiMap className="h-7 w-7 text-emerald-400" aria-hidden />
            </div>

            {/* Badge */}
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              {t('comingSoonBadge')}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base lg:max-w-lg">
              {t('comingSoonDescription')}
            </p>

            {/* ── Notify card ── */}
            <div className="mt-8 lg:max-w-md">
              {status === 'success' ? (
                <div className="animate-[fadeScale_0.35s_ease-out] rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center backdrop-blur-sm lg:text-start">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 lg:mx-0">
                    <FiCheck className="h-5 w-5 text-emerald-400" aria-hidden />
                  </div>
                  <p className="text-sm font-bold text-emerald-400">{t('notifySuccess')}</p>
                </div>
              ) : showForm ? (
                <div className="animate-[fadeScale_0.3s_ease-out] rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-[0_0_50px_-10px_rgba(16,185,129,0.12)] backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold text-white">
                      <FiMail className="h-4 w-4 text-emerald-400" aria-hidden />
                      {t('notifyButton')}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setStatus('idle'); }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label="Close"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                      placeholder={t('emailPlaceholder')}
                      disabled={status === 'loading'}
                      className="h-11 w-full flex-1 rounded-xl border border-white/10 bg-zinc-800/80 px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.08)] disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="press-scale inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 px-5 text-sm font-bold text-zinc-950 transition-all hover:bg-emerald-400 disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950" />
                      ) : (
                        t('notifyCta')
                      )}
                    </button>
                  </form>
                  {status === 'error' && (
                    <p className="mt-2.5 text-xs font-medium text-red-400">{t('notifyError')}</p>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="press-scale group inline-flex h-12 items-center gap-2.5 rounded-xl bg-emerald-500 px-6 text-sm font-bold text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_24px_-4px_rgba(16,185,129,0.4)]"
                >
                  <FiMail className="h-4 w-4 shrink-0" aria-hidden />
                  {t('notifyButton')}
                </button>
              )}
            </div>
          </div>

          {/* Right — roadmap preview timeline */}
          <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:max-w-xs lg:pt-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-zinc-500">
                {t('previewLabel')}
              </p>

              {/* Phase list - Blurred for anticipation */}
              <div className="relative">
                <div className="pointer-events-none select-none opacity-40 blur-[5px] transition-all duration-700 hover:blur-[4px]">
                  <ol className="relative space-y-0">
                    {phases.map((phase, i) => {
                      const isLast = i === phases.length - 1;
                      return (
                        <li key={i} className="relative flex gap-3 pb-5 last:pb-0">
                          {/* Vertical line */}
                          {!isLast && (
                            <div className="absolute start-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 to-emerald-500/5" aria-hidden />
                          )}
                          {/* Dot */}
                          <div className="relative mt-1 flex h-[15px] w-[15px] shrink-0 items-center justify-center">
                            <span className="absolute h-[15px] w-[15px] rounded-full bg-emerald-500/10" />
                            <span className="relative h-[7px] w-[7px] rounded-full bg-emerald-400" />
                          </div>
                          {/* Text */}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold leading-snug text-zinc-200">
                              {phase.title}
                            </p>
                            <p className="mt-0.5 text-xs text-zinc-500">
                              {phase.topicCount} {isArabic ? 'مواضيع' : 'topics'}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* Lock Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex animate-pulse flex-col items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-4 shadow-2xl backdrop-blur-md">
                    <FiLock className="h-6 w-6 text-emerald-400" aria-hidden />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                      {isArabic ? 'يتم التجهيز' : 'Curating Content'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe */}
      <style jsx global>{`
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </main>
  );
}
