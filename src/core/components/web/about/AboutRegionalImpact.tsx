'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

type Props = {
  isArabic: boolean;
  kicker: string;
  heading: string;
  sub: string;
};

// Represents a city/hub in the network
type Hub = {
  id: string;
  name: { en: string; ar: string };
  x: number;
  y: number;
  size: number;
};

const HUBS: Hub[] = [
  { id: 'riyadh', name: { en: 'Riyadh', ar: 'الرياض' }, x: 300, y: 150, size: 8 },
  { id: 'dubai', name: { en: 'Dubai', ar: 'دبي' }, x: 500, y: 100, size: 6 },
  { id: 'manama', name: { en: 'Manama', ar: 'المنامة' }, x: 420, y: 120, size: 5 },
  { id: 'kuwait', name: { en: 'Kuwait City', ar: 'الكويت' }, x: 350, y: 80, size: 5 },
  { id: 'jeddah', name: { en: 'Jeddah', ar: 'جدة' }, x: 180, y: 180, size: 6 },
];

// Define paths between hubs (from, to)
const ROUTES = [
  { from: 'riyadh', to: 'dubai', cp: { x: 400, y: 80 } },
  { from: 'riyadh', to: 'manama', cp: { x: 360, y: 100 } },
  { from: 'riyadh', to: 'kuwait', cp: { x: 320, y: 100 } },
  { from: 'riyadh', to: 'jeddah', cp: { x: 240, y: 200 } },
  { from: 'dubai', to: 'manama', cp: { x: 460, y: 90 } },
];

export function AboutRegionalImpact({ isArabic, kicker, heading, sub }: Props) {
  const uid = useId().replace(/:/g, '');

  return (
    <section
      id="about-regional"
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-[#030303] py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        {/* Glowing backdrop */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">{kicker}</p>
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
            {heading}
          </h2>
          <p className={`mt-4 text-sm text-zinc-500 md:text-base ${isArabic ? 'font-arabic' : ''}`}>{sub}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl h-[300px] md:h-[400px] w-full rounded-2xl border border-white/10 bg-[#0a0a0b]/80 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* SVG Map Canvas */}
          <svg viewBox="0 0 600 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`${uid}-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(16,185,129,0)" />
                <stop offset="50%" stopColor="rgba(16,185,129,0.8)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </linearGradient>
            </defs>

            {/* Background decorative rings */}
            {HUBS.map((hub) => (
              <g key={`rings-${hub.id}`} transform={`translate(${hub.x}, ${hub.y})`}>
                <motion.circle
                  r={hub.size * 6}
                  fill="none"
                  stroke="rgba(16,185,129,0.2)"
                  strokeWidth="1"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle
                  r={hub.size * 4}
                  fill="none"
                  stroke="rgba(16,185,129,0.1)"
                  strokeWidth="1"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                />
              </g>
            ))}

            {/* Arcs / Routes */}
            {ROUTES.map((route, i) => {
              const start = HUBS.find((h) => h.id === route.from)!;
              const end = HUBS.find((h) => h.id === route.to)!;
              const pathD = `M ${start.x} ${start.y} Q ${route.cp.x} ${route.cp.y} ${end.x} ${end.y}`;
              
              return (
                <g key={`route-${i}`}>
                  {/* Base faint line */}
                  <path d={pathD} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Animated flowing line */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={`url(#${uid}-arc)`}
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                  />
                  
                  {/* Data packet (moving dot) */}
                  <motion.circle r="2" fill="#34d399">
                    <animateMotion
                      dur={`${3 + (i % 2)}s`}
                      repeatCount="indefinite"
                      path={pathD}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                  </motion.circle>
                </g>
              );
            })}

            {/* Nodes / Cities */}
            {HUBS.map((hub) => (
              <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                <circle r={hub.size} fill="#10b981" />
                <circle r={hub.size + 2} fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
                <text
                  y={hub.size + 15}
                  textAnchor="middle"
                  className={`fill-zinc-300 text-[10px] font-bold ${isArabic ? 'font-arabic' : 'font-mono tracking-widest'}`}
                >
                  {isArabic ? hub.name.ar : hub.name.en}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
