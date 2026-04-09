'use client';

import { motion } from 'framer-motion';

type Props = {
  isArabic: boolean;
  kicker: string;
  heading: string;
  sub: string;
};

// Define our tech nodes (planets orbiting the core)
const ORBITS = [
  {
    radius: 80,
    duration: 20,
    nodes: [
      { id: 'javascript', label: 'Javascript', angle: 0 },
      { id: 'react', label: 'React', angle: 180 },
    ],
  },
  {
    radius: 140,
    duration: 35,
    nodes: [
      { id: 'java', label: 'Java', angle: 90 },
      { id: 'postgres', label: 'PostgreSQL', angle: 210 },
      { id: 'redis', label: 'Redis', angle: 330 },
    ],
  },
  {
    radius: 200,
    duration: 50,
    nodes: [
      { id: 'infrastructure', label: 'Infrastructure', angle: 45 },
      { id: 'cloud', label: 'Cloud', angle: 165 },
      { id: 'policy', label: 'Policy as Service', angle: 285 },
    ],
  },
];

export function AboutTechStack({ isArabic, kicker, heading, sub }: Props) {
  return (
    <section
      id="about-tech"
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-zinc-900 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">{kicker}</p>
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
            {heading}
          </h2>
          <p className={`mt-4 text-sm text-zinc-500 md:text-base ${isArabic ? 'font-arabic' : ''}`}>{sub}</p>
        </div>

        <div className="relative mx-auto mt-16 flex h-[500px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-zinc-800/40 backdrop-blur-sm">
          {/* Center Core */}
          <div className="absolute z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-white/10 bg-zinc-950 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-400">FINTECH</span>
            <span className="font-mono text-xs font-bold tracking-widest text-white">CORE</span>
            {/* Core pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border border-emerald-500/30"
              animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>

          {/* Orbits */}
          <div className="absolute z-10 h-[500px] w-[500px]">
            {ORBITS.map((orbit, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.05]"
                style={{
                  width: orbit.radius * 2,
                  height: orbit.radius * 2,
                  marginLeft: -orbit.radius,
                  marginTop: -orbit.radius,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
              >
                {orbit.nodes.map((node) => {
                  // Calculate position on the circle based on angle
                  const rad = (node.angle * Math.PI) / 180;
                  const x = orbit.radius * Math.cos(rad);
                  const y = orbit.radius * Math.sin(rad);

                  return (
                    <div
                      key={node.id}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: orbit.radius + x,
                        top: orbit.radius + y,
                        width: 0,
                        height: 0,
                      }}
                    >
                      {/* Counter-rotate the label so it stays upright */}
                      <motion.div
                        className="flex items-center justify-center"
                        animate={{ rotate: -360 }}
                        transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
                      >
                        <div className="relative flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                          <div className="absolute top-4 whitespace-nowrap rounded-md border border-white/10 bg-black/80 px-2 py-1 font-mono text-[9px] tracking-wider text-zinc-300 backdrop-blur-md">
                            {node.label}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
