'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const Network3D = dynamic(() => import('@/core/components/web/about/Network3D'), { ssr: false });

type Perspective = 'business' | 'engineering';

type Props = {
  isArabic: boolean;
  labelBusiness: string;
  labelEngineering: string;
  titleBusiness: string;
  subtitleBusiness: string;
  titleEngineering: string;
  subtitleEngineering: string;
};

export function AboutHeroV2({
  isArabic,
  labelBusiness,
  labelEngineering,
  titleBusiness,
  subtitleBusiness,
  titleEngineering,
  subtitleEngineering,
}: Props) {
  const [perspective, setPerspective] = useState<Perspective>('business');
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  }, []);

  const title = perspective === 'business' ? titleBusiness : titleEngineering;
  const subtitle = perspective === 'business' ? subtitleBusiness : subtitleEngineering;

  return (
    <section
      id="about-overview"
      className="relative min-h-[85vh] scroll-mt-28 overflow-hidden border-b border-white/10 bg-[#030303] py-20 md:min-h-[90vh] md:py-28"
      onMouseMove={onMove}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Moving grid — subtle parallax from mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          backgroundPosition: `${mouse.x * 24}px ${mouse.y * 24}px`,
          transition: 'background-position 0.4s ease-out',
        }}
      />
      {/* Glowing orbs for more visual depth */}
      <div
        className="pointer-events-none absolute left-0 top-[20%] h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]"
      />
      <div
        className="pointer-events-none absolute right-0 top-[60%] h-[60vh] w-[60vh] translate-x-1/2 rounded-full bg-sky-500/5 blur-[120px]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] via-transparent to-black/80" />
      <div className="absolute inset-0 z-0 opacity-[0.4] mix-blend-screen">
        <Network3D />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Glass perspective switcher */}
        <div className="mb-12 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[0_0_40px_-12px_rgba(16,185,129,0.25)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => setPerspective('business')}
            className={`relative rounded-full px-5 py-2 text-xs font-semibold transition-colors md:px-6 md:text-sm ${
              perspective === 'business'
                ? 'text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {perspective === 'business' && (
              <motion.span
                layoutId="hero-pill"
                className="absolute inset-0 rounded-full bg-emerald-400/90"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{labelBusiness}</span>
          </button>
          <button
            type="button"
            onClick={() => setPerspective('engineering')}
            className={`relative rounded-full px-5 py-2 text-xs font-semibold transition-colors md:px-6 md:text-sm ${
              perspective === 'engineering'
                ? 'text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {perspective === 'engineering' && (
              <motion.span
                layoutId="hero-pill"
                className="absolute inset-0 rounded-full bg-emerald-400/90"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{labelEngineering}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={perspective}
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl"
          >
            <h1
              className={`text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl ${
                isArabic ? 'font-arabic' : ''
              }`}
            >
              {title}
            </h1>
            <p
              className={`mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg ${
                isArabic ? 'font-arabic' : ''
              }`}
            >
              {subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
