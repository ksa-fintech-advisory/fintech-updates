'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { ProfileAvatar } from '@/core/components/web/layout/ProfileAvatar';
import { AuthorNameText } from '@/core/components/web/layout/AuthorNameText';

type Props = {
  isArabic: boolean;
  ideFileLabel: string;
  card1: string;
  card2: string;
  card3: string;
  authorName: string;
  authorTitle: string;
  avatarAlt: string;
};

const codeLine = (parts: { t: string; c: string }[]) =>
  parts.map((p, i) => (
    <span key={i}>
      <span className={p.c}>{p.t}</span>
    </span>
  ));

export function AboutSplitProfile({
  isArabic,
  ideFileLabel,
  card1,
  card2,
  card3,
  authorName,
  authorTitle,
  avatarAlt,
}: Props) {
  const reduce = useReducedMotion();
  const cards = [card1, card2, card3];

  return (
    <section
      id="about-profile"
      className="relative overflow-hidden scroll-mt-28 border-b border-white/10 bg-zinc-900 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sticky IDE & Profile */}
          <div className="lg:sticky lg:top-28 lg:self-start relative">
            {/* Ambient Background Effects */}
            <div className="absolute -inset-10 z-0 pointer-events-none">
              <motion.div
                className="absolute left-10 top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-[60px]"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-sky-500/10 blur-[60px]"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>

            <motion.div 
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-10 mb-10 flex flex-col items-center text-center lg:items-start lg:text-start"
            >
              <ProfileAvatar
                size={140}
                alt={avatarAlt}
                fallbackText={authorName}
                variant="rounded"
                className="mb-6 shadow-xl ring-1 ring-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                authorNameFont
              />
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                <AuthorNameText isArabic={isArabic} className="text-[1.06em]">
                  {authorName}
                </AuthorNameText>
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-400">
                {authorTitle}
              </p>
            </motion.div>

            <motion.div 
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-800/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_-24px_rgba(0,0,0,0.8)] transition-colors hover:border-emerald-500/40"
            >
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ms-3 font-mono text-[10px] text-zinc-500">{ideFileLabel}</span>
              </div>
              <pre
                className={`overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-zinc-300 md:text-xs ${
                  isArabic ? 'text-end' : 'text-start'
                }`}
              >
                <code className="block whitespace-pre">
                  {codeLine([
                    { t: 'export ', c: 'text-purple-400' },
                    { t: 'async ', c: 'text-purple-400' },
                    { t: 'function ', c: 'text-purple-400' },
                    { t: 'settlementPipeline', c: 'text-sky-300' },
                    { t: '(ctx: ', c: 'text-zinc-500' },
                    { t: 'ComplianceContext', c: 'text-amber-300' },
                    { t: ') ', c: 'text-zinc-500' },
                    { t: '{\n', c: 'text-zinc-400' },
                  ])}
                  {codeLine([
                    { t: '  ', c: '' },
                    { t: 'await ', c: 'text-purple-400' },
                    { t: 'auditLog', c: 'text-sky-300' },
                    { t: '.', c: 'text-zinc-500' },
                    { t: 'append', c: 'text-emerald-300' },
                    { t: '(ctx', c: 'text-zinc-300' },
                    { t: ');\n', c: 'text-zinc-400' },
                  ])}
                  {codeLine([
                    { t: '  ', c: '' },
                    { t: 'return ', c: 'text-purple-400' },
                    { t: 'orchestrator', c: 'text-sky-300' },
                    { t: '.', c: 'text-zinc-500' },
                    { t: 'route', c: 'text-emerald-300' },
                    { t: '(ctx', c: 'text-zinc-300' },
                    { t: ');\n', c: 'text-zinc-400' },
                  ])}
                  {codeLine([{ t: '}', c: 'text-zinc-400' }])}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-3.5 w-1.5 align-middle bg-emerald-500/80 ms-1"
                  />
                </code>
              </pre>
            </motion.div>
          </div>

          {/* Glass cards */}
          <div className="flex flex-col gap-6">
            {cards.map((text, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(12px)' }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                whileHover={reduce ? undefined : { scale: 1.02, x: isArabic ? -8 : 8 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_48px_-20px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:border-emerald-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.3)] md:p-8"
              >
                {/* Subtle shine effect that sweeps across on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                
                <span className="relative z-10 mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/90 transition-colors group-hover:text-emerald-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={`relative z-10 text-lg font-medium leading-relaxed text-zinc-100 transition-colors group-hover:text-white md:text-xl ${isArabic ? 'font-arabic' : ''}`}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
