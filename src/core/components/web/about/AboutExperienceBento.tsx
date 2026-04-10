'use client';

import Image from 'next/image';
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
  { 
    name: 'Ikea', 
    role: 'Senior Micro Frontends',
    href: 'https://www.ikea.com/',
    logo: '/logos/ikea.svg',
    desc: 'Customer bank portal architecture'
  },
  { 
    name: 'Tide', 
    role: 'Fintech Engineering',
    href: 'https://www.tide.co/',
    logo: '/logos/tide.svg',
    desc: 'Business banking platform'
  },
  { 
    name: 'Seqa Group', 
    role: 'Senior Full Stack',
    href: 'https://www.seqagroup.com.sa/',
    logo: '/logos/seqa-lo.png',
    desc: 'E-commerce & payment gateways'
  },
  { 
    name: 'Siolla', 
    role: 'Backend Team Lead',
    href: 'https://www.siolla.com/',
    logo: '/logos/siolla.jpeg',
    desc: 'Financial technology infrastructure'
  },
  { 
    name: 'Awqef Capital', 
    role: 'Tech Lead',
    href: 'https://awqef.sa/',
    logo: '/logos/awqef.svg',
    desc: 'Digital endowment platform'
  },
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
      className="scroll-mt-28 border-b border-white/10 bg-zinc-900 py-20 md:py-28"
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
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 ring-1 ring-white/10 transition-colors group-hover:ring-emerald-500/50 p-1">
                    {company.logo ? (
                      <Image 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        fill
                        className="object-contain p-1.5 filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                      />
                    ) : (
                      <span className="font-mono text-sm font-bold text-zinc-400 group-hover:text-emerald-400">
                        {company.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                      {company.href ? (
                        <a href={company.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {company.name}
                        </a>
                      ) : (
                        company.name
                      )}
                    </h3>
                    <p className="text-[10px] text-zinc-500 mb-0.5">{company.role}</p>
                    {company.desc && (
                      <p className="text-[9px] text-zinc-600 line-clamp-1 group-hover:text-zinc-400 transition-colors">{company.desc}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-2 min-h-[140px] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Scale & Volume</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] text-emerald-500/70">PROCESSED</span>
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold tabular-nums text-emerald-400/95 md:text-4xl">100M+</p>
                <p className="font-mono text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Daily API Requests</p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              <div>
                <p className="text-xl font-bold tabular-nums text-zinc-200 md:text-2xl">$2B+</p>
                <p className="font-mono text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Transaction Volume</p>
              </div>
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
