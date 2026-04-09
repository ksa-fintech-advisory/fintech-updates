'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type DomainItem = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  isArabic: boolean;
  kicker: string;
  heading: string;
  domains: DomainItem[];
};

// Animated placeholder for 3D/Lottie
function AnimatedAssetPlaceholder({ type }: { type: string }) {
  // Return different SVG/CSS based on type to look cool until 3D is added.
  switch (type) {
    case 'payments':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[200px] w-[200px] animate-pulse rounded-full bg-emerald-500/20 blur-[60px]" />
          <svg viewBox="0 0 100 100" className="h-40 w-40 text-emerald-400 opacity-80">
            <motion.circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
            <motion.circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
            <path d="M50 25 L50 15 M50 75 L50 85 M25 50 L15 50 M75 50 L85 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'wealth':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[200px] w-[200px] animate-pulse rounded-full bg-sky-500/20 blur-[60px]" />
          <svg viewBox="0 0 100 100" className="h-40 w-40 text-sky-400 opacity-80">
             <motion.rect x="30" y="50" width="10" height="30" fill="currentColor" rx="2" animate={{ height: [30, 10, 40, 30], y: [50, 70, 40, 50] }} transition={{ duration: 4, repeat: Infinity }} />
             <motion.rect x="45" y="30" width="10" height="50" fill="currentColor" rx="2" animate={{ height: [50, 20, 60, 50], y: [30, 60, 20, 30] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
             <motion.rect x="60" y="40" width="10" height="40" fill="currentColor" rx="2" animate={{ height: [40, 50, 20, 40], y: [40, 30, 60, 40] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
             <path d="M20 85 L80 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'compliance':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[200px] w-[200px] animate-pulse rounded-full bg-amber-500/20 blur-[60px]" />
          <svg viewBox="0 0 100 100" className="h-40 w-40 text-amber-400 opacity-80">
            <path d="M50 15 L20 30 V50 C20 70 50 85 50 85 C50 85 80 70 80 50 V30 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <motion.path d="M40 50 L48 58 L65 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
          </svg>
        </div>
      );
    case 'crypto':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[200px] w-[200px] animate-pulse rounded-full bg-purple-500/20 blur-[60px]" />
          <svg viewBox="0 0 100 100" className="h-40 w-40 text-purple-400 opacity-80">
            <motion.rect x="25" y="25" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" animate={{ rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '35px 35px' }} />
            <motion.rect x="55" y="55" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" animate={{ rotate: [0, -90, -180, -270, -360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '65px 65px' }} />
            <path d="M45 45 L55 55 M55 45 L45 55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export function AboutDomainExpertise({ isArabic, kicker, heading, domains }: Props) {
  const [activeId, setActiveId] = useState(domains[0].id);

  return (
    <section
      id="about-domains"
      className="scroll-mt-28 border-b border-white/10 bg-[#030303] py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl text-center md:text-start">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">{kicker}</p>
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Side: Tabs */}
          <div className="flex flex-col gap-2 lg:col-span-5">
            {domains.map((domain) => {
              const isActive = activeId === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveId(domain.id)}
                  onMouseEnter={() => setActiveId(domain.id)}
                  className={`group relative flex cursor-pointer flex-col rounded-2xl p-5 text-start outline-none transition-all md:p-6 ${
                    isActive ? '' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="domain-active-bg"
                      className="absolute inset-0 rounded-2xl bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset]"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <h3
                    className={`relative z-10 text-lg font-bold transition-colors md:text-xl ${
                      isArabic ? 'font-arabic' : ''
                    } ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                  >
                    {domain.title}
                  </h3>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p
                          className={`relative z-10 text-sm leading-relaxed text-zinc-400 md:text-base ${
                            isArabic ? 'font-arabic' : ''
                          }`}
                        >
                          {domain.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right Side: Stage */}
          <div className="lg:col-span-7">
            <div className="relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0b] shadow-[0_0_40px_-20px_rgba(255,255,255,0.1)] md:h-[450px]">
              {/* Glassmorphism subtle backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <div className="absolute inset-0" style={{ backdropFilter: 'blur(20px)' }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <AnimatedAssetPlaceholder type={activeId} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
