'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  isArabic: boolean;
  kicker: string;
  heading: string;
  companiesCaption: string;
  uptimeLabel: string;
  uptimeValue: string;
  quote: string;
};

const COMPANIES = [
  { name: 'STC Pay', role: 'Payment Gateway Integration' },
  { name: 'Tamara', role: 'BNPL Architecture' },
  { name: 'Lendo', role: 'Crowdfunding Platform' },
  { name: 'Lean Tech', role: 'Open Banking APIs' },
  { name: 'SAMA Sandbox', role: 'Compliance & Testing' },
];

function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const move = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  }, []);

  const leave = useCallback(() => setGlow((g) => ({ ...g, active: false })), []);

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(52,211,153,0.12), transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export function AboutExperienceBento({
  isArabic,
  kicker,
  heading,
  companiesCaption,
  uptimeLabel,
  uptimeValue,
  quote,
}: Props) {
  return (
    <section
      id="about-experience"
      className="scroll-mt-28 border-b border-white/10 bg-[#050505] py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Decorative grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">{kicker}</p>
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
            {heading}
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-5">
          <SpotlightCard className="md:col-span-2 md:row-span-2 min-h-[220px] p-6 md:min-h-[280px] md:p-8">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">{companiesCaption}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COMPANIES.map((company, i) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 ring-1 ring-white/10 transition-colors group-hover:ring-emerald-500/50">
                    <span className="font-mono text-sm font-bold text-zinc-400 group-hover:text-emerald-400">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-semibold text-zinc-300 group-hover:text-white">
                      {company.name}
                    </h3>
                    <p className="text-[10px] text-zinc-500">{company.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-2 min-h-[140px] p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{uptimeLabel}</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] text-emerald-500/70">LIVE</span>
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
            <p className="text-3xl font-bold tabular-nums text-emerald-400/95 md:text-4xl">{uptimeValue}</p>
            <div className="relative mt-3 h-12 w-full overflow-hidden mask-image-fade">
              <motion.svg
                viewBox="0 0 400 48"
                className="absolute inset-y-0 h-full w-[200%] text-emerald-500/40"
                preserveAspectRatio="none"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  points="0,40 20,35 40,38 60,28 80,32 100,18 120,22 140,12 160,16 180,8 200,10 220,35 240,38 260,28 280,32 300,18 320,22 340,12 360,16 380,8 400,10"
                />
              </motion.svg>
              {/* Fade out edges to blend into card background */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-transparent to-[#0a0a0b]" />
            </div>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-4 min-h-[120px] p-6 md:p-8">
            <p className={`text-lg font-medium leading-relaxed text-zinc-200 md:text-xl ${isArabic ? 'font-arabic' : ''}`}>
              {quote}
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
