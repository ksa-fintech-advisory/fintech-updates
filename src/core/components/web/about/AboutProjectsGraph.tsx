'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useId } from 'react';
import { AboutProjectsGrid } from './AboutProjectsGrid';

type NodeDef = { id: string; label: string; short: string; x: number; y: number };

type Props = {
  isArabic: boolean;
  kicker: string;
  heading: string;
  sub: string;
  node1: string;
  node2: string;
  node3: string;
};

export function AboutProjectsGraph({
  isArabic,
  kicker,
  heading,
  sub,
  node1,
  node2,
  node3,
}: Props) {
  const uid = useId().replace(/:/g, '');
  const nodes: NodeDef[] = [
    { id: 'n1', label: node1, short: 'RA', x: 200, y: 70 },
    { id: 'n2', label: node2, short: 'PG', x: 80, y: 230 },
    { id: 'n3', label: node3, short: 'IAM', x: 320, y: 230 },
  ];
  const edges: [string, string][] = [
    ['n1', 'n2'],
    ['n1', 'n3'],
    ['n2', 'n3'],
  ];

  const [hovered, setHovered] = useState<string | null>(null);

  const pathBetween = (a: NodeDef, b: NodeDef) => {
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  };

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section
      id="about-projects"
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-zinc-950 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Decorative heat map dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[50%] w-[40%] rounded-full bg-emerald-500/5 blur-[100px]" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">{kicker}</p>
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
            {heading}
          </h2>
          <p className={`mt-4 text-sm text-zinc-500 md:text-base ${isArabic ? 'font-arabic' : ''}`}>{sub}</p>
        </div>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <svg
            viewBox="0 0 400 300"
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label={heading}
          >
            <defs>
              <linearGradient id={`${uid}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(16 185 129 / 0.15)" />
                <stop offset="50%" stopColor="rgb(52 211 153 / 0.5)" />
                <stop offset="100%" stopColor="rgb(16 185 129 / 0.15)" />
              </linearGradient>
            </defs>

            {edges.map(([from, to], i) => {
              const a = getNode(from);
              const b = getNode(to);
              const dim = hovered && hovered !== from && hovered !== to;
              return (
                <g key={`${from}-${to}`} opacity={dim ? 0.2 : 1}>
                  <motion.path
                    d={pathBetween(a, b)}
                    fill="none"
                    stroke={`url(#${uid}-line)`}
                    strokeWidth={1.5}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: i * 0.15 }}
                  />
                  <path
                    d={pathBetween(a, b)}
                    fill="none"
                    stroke="rgb(52 211 153 / 0.35)"
                    strokeWidth={2}
                    strokeDasharray="6 14"
                    strokeLinecap="round"
                    style={{ opacity: dim ? 0.2 : 1 }}
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-80" dur="3s" repeatCount="indefinite" />
                  </path>
                </g>
              );
            })}

            {nodes.map((n) => {
              const dim = hovered && hovered !== n.id;
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x}, ${n.y})`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.circle
                    r={36}
                    fill="rgb(9 9 11 / 0.9)"
                    stroke="rgb(52 211 153 / 0.45)"
                    strokeWidth={1.5}
                    animate={{
                      scale: hovered === n.id ? 1.06 : 1,
                      opacity: dim ? 0.35 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  />
                  <motion.circle
                    r={36}
                    fill="none"
                    stroke="rgb(52 211 153 / 0.25)"
                    strokeWidth={1}
                    animate={{ scale: hovered === n.id ? [1, 1.15, 1] : 1, opacity: hovered === n.id ? [0.6, 0, 0.6] : 0.3 }}
                    transition={{ duration: 2, repeat: hovered === n.id ? Infinity : 0 }}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-emerald-200/90 font-mono text-[11px] font-bold tracking-widest"
                    style={{ opacity: dim ? 0.4 : 1 }}
                  >
                    {n.short}
                  </text>
                </g>
              );
            })}
          </svg>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className={`pointer-events-none absolute bottom-4 start-1/2 z-10 w-[min(90%,20rem)] -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-950/95 px-4 py-3 text-center text-sm text-zinc-200 shadow-xl backdrop-blur-md ${isArabic ? 'font-arabic' : ''}`}
              >
                {nodes.find((n) => n.id === hovered)?.label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detail cards mapping to the nodes */}
        <AboutProjectsGrid isArabic={isArabic} projectsLabel={heading} />
      </div>
    </section>
  );
}
