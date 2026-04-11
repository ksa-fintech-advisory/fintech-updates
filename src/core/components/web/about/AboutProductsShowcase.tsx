'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useState, useCallback, useRef } from 'react';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Props = {
  isArabic: boolean;
      
  heading: string;
  sub?: string;
};

type Product = {
  id: string;
  title: string;
  desc: { en: string; ar: string };
  color: string;
  glowColor: string;
  Visual: (props: { active: boolean }) => JSX.Element;
};

/* ─────────────────────────────────────────
   Spotlight card — follows cursor
───────────────────────────────────────── */
function SpotlightCard({
  children,
  className = '',
  glowColor,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor: string;
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
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(500px circle at ${glow.x}px ${glow.y}px, ${glowColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Product Visuals — each one is a rich,
   purpose-built animated SVG
───────────────────────────────────────── */

function RoboAdvisoryVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-emerald-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 240 140" className="relative h-full w-full max-h-[200px]">
        <defs>
          <linearGradient id="robo-fill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(16,185,129,0)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.15)" />
          </linearGradient>
        </defs>
        {[30, 55, 80, 105].map((y) => (
          <line key={y} x1="20" y1={y} x2="220" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        ))}
        <motion.path
          d="M20,110 C50,100 70,85 95,75 C120,65 140,90 160,60 C180,35 200,45 220,30 L220,120 L20,120 Z"
          fill="url(#robo-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: inf, ease: 'easeInOut' }}
        />
        <motion.path
          d="M20,110 C50,100 70,85 95,75 C120,65 140,90 160,60 C180,35 200,45 220,30"
          fill="none" stroke="rgba(52,211,153,0.9)" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        {[{ cx: 95, cy: 75 }, { cx: 160, cy: 60 }, { cx: 220, cy: 30 }].map((p, i) => (
          <g key={i}>
            <motion.circle cx={p.cx} cy={p.cy} r="4" fill="#10b981"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: inf, delay: i * 0.7 }}
            />
            <motion.circle cx={p.cx} cy={p.cy} r="4" fill="none" stroke="#10b981" strokeWidth="1"
              animate={{ r: [4, 14], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: inf, delay: i * 0.7 }}
            />
          </g>
        ))}
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: inf, ease: 'easeInOut' }}>
          <rect x="180" y="14" width="42" height="16" rx="4" fill="rgba(16,185,129,0.2)" stroke="rgba(52,211,153,0.4)" strokeWidth="0.5" />
          <text x="201" y="25" textAnchor="middle" fontSize="8" fill="#34d399" fontFamily="monospace">+12.4%</text>
        </motion.g>
      </svg>
    </div>
  );
}

function PaymentGatewayVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-sky-500/8 blur-[30px] md:blur-[80px]" />
      <div className="relative w-full max-w-[220px] p-4">
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-sky-400/80 shadow-[0_0_12px_2px_rgba(56,189,248,0.7)] z-10"
          animate={{ top: ['-5%', '110%'] }}
          transition={{ duration: 3.5, repeat: inf, ease: 'linear' }}
        />
        <div className="rounded-lg border border-sky-500/20 bg-black/60 p-4 font-mono text-[10px] text-sky-400/90 shadow-[0_0_20px_rgba(56,189,248,0.08)]">
          <p className="text-zinc-600 mb-1">{'// POST /api/v1/settle'}</p>
          <p className="text-zinc-500">{'{'}</p>
          <motion.div className="ps-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: inf, ease: 'easeInOut' }}>
            <p><span className="text-zinc-500">&quot;trx_id&quot;</span>: <span className="text-sky-300">&quot;pay_9xa82k&quot;</span>,</p>
          </motion.div>
          <motion.div className="ps-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: inf, delay: 0.3 }}>
            <p><span className="text-zinc-500">&quot;amount&quot;</span>: <span className="text-sky-300">125,000</span>,</p>
          </motion.div>
          <motion.div className="ps-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: inf, delay: 0.6 }}>
            <p><span className="text-zinc-500">&quot;rail&quot;</span>: <span className="text-sky-300">&quot;SARIE&quot;</span>,</p>
          </motion.div>
          <motion.div className="ps-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: inf, delay: 0.9 }}>
            <p><span className="text-zinc-500">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;SETTLED ✓&quot;</span></p>
          </motion.div>
          <p className="text-zinc-500">{'}'}</p>
        </div>
      </div>
    </div>
  );
}

function IdentityAccessVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-amber-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 200 140" className="relative h-full w-full max-h-[200px]">
        <motion.path
          d="M100 20 L60 40 V72 C60 100 100 118 100 118 C100 118 140 100 140 72 V40 Z"
          fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.path
          d="M100 32 L72 47 V72 C72 92 100 106 100 106 C100 106 128 92 128 72 V47 Z"
          fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="1"
          animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: inf }}
          style={{ transformOrigin: '100px 70px' }}
        />
        <motion.path
          d="M86 70 L96 80 L118 58"
          fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: inf, times: [0, 0.3, 0.8, 1] }}
        />
        {[
          { dx: 50, dy: 25 }, { dx: -40, dy: -30 }, { dx: 35, dy: -40 },
        ].map((d, i) => (
          <motion.circle key={i} cx="100" cy="70" r="2.5" fill="#f59e0b"
            animate={{ cx: [100, 100 + d.dx], cy: [70, 70 + d.dy], opacity: [1, 0], scale: [1, 0.5] }}
            transition={{ duration: 1.5, repeat: inf, delay: i * 0.6, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </div>
  );
}

function CoreLedgerVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-violet-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 220 140" className="relative h-full w-full max-h-[200px]">
        {[35, 55, 75, 95].map((y) => (
          <motion.line key={y} x1="30" y1={y} x2="190" y2={y}
            stroke="rgba(139,92,246,0.15)" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: (y - 35) * 0.1 }}
          />
        ))}
        {[80, 130].map((x) => (
          <line key={x} x1={x} y1="25" x2={x} y2="110" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
        ))}
        {[
          { x: 55, delay: 0, text: 'DR' },
          { x: 105, delay: 0.4, text: 'CR' },
          { x: 160, delay: 0.8, text: 'BAL' },
        ].map((col, ci) => (
          <g key={ci}>
            <text x={col.x} y="28" textAnchor="middle" fontSize="7" fill="rgba(139,92,246,0.6)" fontFamily="monospace">{col.text}</text>
            {[38, 58, 78, 98].map((y, ri) => (
              <motion.rect key={ri} x={col.x - 18} y={y} width="36" height="12" rx="2"
                fill="rgba(139,92,246,0.06)" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: [0, 0.8, 0.8, 0], x: [-10, 0, 0, 10] }}
                transition={{ duration: 4, repeat: inf, delay: col.delay + ri * 0.3, ease: 'easeInOut' }}
              />
            ))}
          </g>
        ))}
        <motion.g animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: inf }}>
          <rect x="70" y="112" width="80" height="14" rx="3" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" />
          <text x="110" y="122" textAnchor="middle" fontSize="7" fill="#a78bfa" fontFamily="monospace">RECONCILED</text>
        </motion.g>
      </svg>
    </div>
  );
}

function OpenBankingVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  const nodes = [
    { cx: 40, cy: 30, label: 'SAB' },
    { cx: 200, cy: 30, label: 'SNB' },
    { cx: 30, cy: 100, label: 'NCB' },
    { cx: 210, cy: 100, label: 'RAJ' },
    { cx: 120, cy: 130, label: 'BSF' },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-cyan-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 240 140" className="relative h-full w-full max-h-[200px]">
        <circle cx="120" cy="70" r="18" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
        <motion.circle cx="120" cy="70" r="18" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1"
          animate={{ r: [18, 32, 18], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: inf, ease: 'easeInOut' }}
        />
        <text x="120" y="73" textAnchor="middle" fontSize="9" fill="rgba(6,182,212,0.95)" fontFamily="monospace" fontWeight="bold">API</text>

        {nodes.map((node, i) => (
          <g key={i}>
            <line x1={node.cx} y1={node.cy} x2="120" y2="70"
              stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 5"
            />
            <motion.circle cx={node.cx} cy={node.cy} r="12"
              fill="rgba(9,9,11,0.9)" stroke="rgba(6,182,212,0.4)" strokeWidth="1"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: inf, delay: i * 0.5 }}
            />
            <text x={node.cx} y={node.cy + 3.5} textAnchor="middle" fontSize="6" fill="rgba(6,182,212,0.85)" fontFamily="monospace">{node.label}</text>
            <motion.circle r="2" fill="rgba(6,182,212,0.9)"
              animate={{ cx: [node.cx, 120], cy: [node.cy, 70], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: inf, delay: i * 0.7, ease: 'easeIn' }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function WealthManagementVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-purple-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 240 140" className="relative h-full w-full max-h-[200px]">
        <defs>
          <linearGradient id="wm-area" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(168,85,247,0)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.18)" />
          </linearGradient>
        </defs>
        {[40, 65, 90, 115].map((y) => (
          <line key={y} x1="15" y1={y} x2="225" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        <motion.path
          d="M15,115 L15,90 C45,78 65,85 90,72 C115,58 135,80 155,52 C175,28 200,38 225,22 L225,125 L15,125 Z"
          fill="url(#wm-area)"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: inf, ease: 'easeInOut' }}
        />
        <motion.path
          d="M15,90 C45,78 65,85 90,72 C115,58 135,80 155,52 C175,28 200,38 225,22"
          fill="none" stroke="rgba(168,85,247,0.9)" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {[{ cx: 90, cy: 72 }, { cx: 155, cy: 52 }, { cx: 225, cy: 22 }].map((p, i) => (
          <g key={i}>
            <motion.circle cx={p.cx} cy={p.cy} r="5" fill="#a855f7"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: inf, delay: i * 0.6 }}
            />
            <motion.circle cx={p.cx} cy={p.cy} r="5" fill="none" stroke="#a855f7" strokeWidth="1"
              animate={{ r: [5, 15], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: inf, delay: i * 0.6 }}
            />
          </g>
        ))}
        <g transform="translate(30,25)">
          <motion.circle cx="0" cy="0" r="12" fill="none" stroke="rgba(168,85,247,0.6)" strokeWidth="4"
            strokeDasharray="25 75" strokeDashoffset="0"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: inf, ease: 'linear' }}
            style={{ transformOrigin: '0px 0px' }}
          />
          <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="4"
            strokeDasharray="18 82" strokeDashoffset="-25"
          />
          <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(192,132,252,0.3)" strokeWidth="4"
            strokeDasharray="12 88" strokeDashoffset="-43"
          />
        </g>
        <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: inf, ease: 'easeInOut' }}>
          <path d="M195,30 L201,18 L207,30" stroke="rgba(168,85,247,0.8)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M201,18 L201,40" stroke="rgba(168,85,247,0.8)" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </svg>
    </div>
  );
}

function DigitalWalletVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-rose-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 240 140" className="relative h-full w-full max-h-[200px]">
        <motion.rect x="50" y="30" width="140" height="80" rx="12"
          fill="rgba(244,63,94,0.06)" stroke="rgba(244,63,94,0.5)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.rect x="65" y="42" width="60" height="35" rx="4"
          fill="rgba(244,63,94,0.08)" stroke="rgba(244,63,94,0.3)" strokeWidth="0.8"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: inf }}
        />
        <text x="95" y="55" textAnchor="middle" fontSize="5" fill="rgba(244,63,94,0.6)" fontFamily="monospace">VIRTUAL</text>
        <text x="95" y="70" textAnchor="middle" fontSize="8" fill="rgba(244,63,94,0.9)" fontFamily="monospace" fontWeight="bold">IBAN</text>
        <rect x="70" y="48" width="10" height="8" rx="1.5" fill="rgba(244,63,94,0.25)" stroke="rgba(244,63,94,0.4)" strokeWidth="0.5" />
        <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: inf }}>
          <text x="160" y="55" textAnchor="middle" fontSize="6" fill="rgba(244,63,94,0.5)" fontFamily="monospace">BALANCE</text>
          <text x="160" y="70" textAnchor="middle" fontSize="10" fill="rgba(244,63,94,0.95)" fontFamily="monospace" fontWeight="bold">54,320</text>
          <text x="160" y="80" textAnchor="middle" fontSize="5" fill="rgba(244,63,94,0.4)" fontFamily="monospace">SAR</text>
        </motion.g>
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} r="2" fill="rgba(244,63,94,0.8)"
            animate={{
              cx: [50, 120, 190],
              cy: [70, 60 + i * 5, 70],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.5, repeat: inf, delay: i * 0.8, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  );
}

function EkycVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-teal-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 220 140" className="relative h-full w-full max-h-[200px]">
        <motion.circle cx="110" cy="55" r="28" fill="rgba(20,184,166,0.05)" stroke="rgba(20,184,166,0.5)" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.line x1="82" y1="55" x2="138" y2="55" stroke="rgba(20,184,166,0.3)" strokeWidth="0.8"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: inf }}
        />
        <motion.line x1="110" y1="27" x2="110" y2="83" stroke="rgba(20,184,166,0.3)" strokeWidth="0.8"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: inf, delay: 0.5 }}
        />
        <motion.line x1="82" y1="35" x2="138" y2="35" stroke="rgba(20,184,166,0.8)" strokeWidth="1.5"
          animate={{ y1: [30, 80, 30], y2: [30, 80, 30] }}
          transition={{ duration: 3, repeat: inf, ease: 'easeInOut' }}
          strokeLinecap="round"
        />
        <circle cx="100" cy="50" r="2" fill="rgba(20,184,166,0.7)" />
        <circle cx="120" cy="50" r="2" fill="rgba(20,184,166,0.7)" />
        {[
          { x: 55, y: 100, label: 'NID', delay: 0 },
          { x: 110, y: 100, label: 'FACE', delay: 0.5 },
          { x: 165, y: 100, label: 'AML', delay: 1 },
        ].map((step, i) => (
          <g key={i}>
            <motion.rect x={step.x - 22} y={step.y - 8} width="44" height="16" rx="4"
              fill="rgba(20,184,166,0.08)" stroke="rgba(20,184,166,0.3)" strokeWidth="0.8"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: inf, delay: step.delay }}
            />
            <text x={step.x} y={step.y + 4} textAnchor="middle" fontSize="7" fill="rgba(20,184,166,0.85)" fontFamily="monospace">{step.label}</text>
            <motion.path
              d={`M${step.x + 18},${step.y - 2} l3,3 l5,-5`}
              fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, repeat: inf, delay: step.delay + 0.8 }}
            />
          </g>
        ))}
        {[55, 110, 165].map((x, i) => (
          <line key={i} x1="110" y1="83" x2={x} y2="92"
            stroke="rgba(20,184,166,0.15)" strokeWidth="0.8" strokeDasharray="3 3"
          />
        ))}
      </svg>
    </div>
  );
}

function PooledAccountVisual({ active }: { active: boolean }) {
  const inf = active ? Infinity : 0;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-indigo-500/8 blur-[30px] md:blur-[80px]" />
      <svg viewBox="0 0 240 140" className="relative h-full w-full max-h-[200px]">
        {/* Central omnibus pool */}
        <motion.rect x="80" y="45" width="80" height="50" rx="8"
          fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: inf }}
        />
        <text x="120" y="65" textAnchor="middle" fontSize="7" fill="rgba(99,102,241,0.6)" fontFamily="monospace">OMNIBUS</text>
        <text x="120" y="80" textAnchor="middle" fontSize="9" fill="rgba(99,102,241,0.95)" fontFamily="monospace" fontWeight="bold">POOL</text>

        {/* Sub-accounts flowing in from left */}
        {[
          { y: 25, label: 'A-001' },
          { y: 55, label: 'A-002' },
          { y: 85, label: 'A-003' },
          { y: 115, label: 'A-004' },
        ].map((acc, i) => (
          <g key={i}>
            <motion.rect x="10" y={acc.y - 8} width="45" height="16" rx="3"
              fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.8"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, repeat: inf, delay: i * 0.3 }}
            />
            <text x="32" y={acc.y + 4} textAnchor="middle" fontSize="6" fill="rgba(99,102,241,0.75)" fontFamily="monospace">{acc.label}</text>
            {/* Flow line */}
            <motion.line x1="55" y1={acc.y} x2="80" y2="70"
              stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="3 4"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-28" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
            </motion.line>
            {/* Particle */}
            <motion.circle r="2" fill="rgba(99,102,241,0.8)"
              animate={{ cx: [55, 80], cy: [acc.y, 70], opacity: [1, 0] }}
              transition={{ duration: 1.2, repeat: inf, delay: i * 0.4, ease: 'easeIn' }}
            />
          </g>
        ))}

        {/* Reconciliation output on right */}
        <motion.line x1="160" y1="70" x2="195" y2="70"
          stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="3 4"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1.8s" repeatCount="indefinite" />
        </motion.line>
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: inf }}>
          <rect x="195" y="55" width="35" height="30" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" strokeWidth="0.8" />
          <text x="212" y="68" textAnchor="middle" fontSize="5" fill="rgba(99,102,241,0.6)" fontFamily="monospace">RECON</text>
          <motion.path d="M205,78 l4,4 l8,-8" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: inf, times: [0, 0.3, 0.8, 1] }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   Products data
───────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: 'robo',
    title: 'Robo-advisory Engine',
    desc: {
      en: 'Algorithmic portfolio management with real-time rebalancing, built to SAMA regulatory standards.',
      ar: 'إدارة محافظ خوارزمية مع إعادة توازن لحظية، مبنية وفق معايير مؤسسة النقد (ساما).',
    },
    color: 'emerald',
    glowColor: 'rgba(16,185,129,0.12)',
    Visual: RoboAdvisoryVisual,
  },
  {
    id: 'pg',
    title: 'Payment Gateway Stack',
    desc: {
      en: 'High-throughput payment orchestration layer handling multi-rail routing and strict idempotent processing.',
      ar: 'طبقة توجيه مدفوعات عالية الكفاءة تتعامل مع مسارات متعددة ومعالجة صارمة لتجنب التكرار.',
    },
    color: 'sky',
    glowColor: 'rgba(56,189,248,0.12)',
    Visual: PaymentGatewayVisual,
  },
  {
    id: 'iam',
    title: 'Identity & Access (IAM)',
    desc: {
      en: 'Centralized auth provider featuring RBAC, zero-trust tokens, and strict audit logging for compliance.',
      ar: 'مزود مصادقة مركزي يتميز بصلاحيات مبنية على الأدوار وتسجيل تدقيق صارم للامتثال.',
    },
    color: 'amber',
    glowColor: 'rgba(245,158,11,0.12)',
    Visual: IdentityAccessVisual,
  },
  {
    id: 'ledger',
    title: 'Core Ledger System',
    desc: {
      en: 'Centralized core ledger handling all financial accounting and reconciliation for fintech products.',
      ar: 'سجل أساسي مركزي يعالج جميع الحسابات المالية والتسويات لمنتجات التقنية المالية.',
    },
    color: 'violet',
    glowColor: 'rgba(139,92,246,0.12)',
    Visual: CoreLedgerVisual,
  },
  {
    id: 'openbanking',
    title: 'Open Banking Aggregator',
    desc: {
      en: 'Multi-bank data aggregation platform connecting consumers to all their accounts via standardized Open Banking APIs — fully compliant with SAMA framework.',
      ar: 'منصة تجميع بيانات متعددة البنوك تربط المستهلكين بجميع حساباتهم المالية عبر واجهات برمجية موحدة — ممتثلة لإطار ساما.',
    },
    color: 'cyan',
    glowColor: 'rgba(6,182,212,0.12)',
    Visual: OpenBankingVisual,
  },
  {
    id: 'wealth',
    title: 'Wealth Management App',
    desc: {
      en: 'Digital wealth platform offering automated portfolio construction, goal-based investing, and real-time performance dashboards — engineered to CMA standards.',
      ar: 'منصة ثروات رقمية تتيح بناء محافظ آلية واستثماراً يعتمد على الأهداف ولوحات أداء لحظية — مبنية وفق معايير هيئة السوق المالية.',
    },
    color: 'purple',
    glowColor: 'rgba(168,85,247,0.12)',
    Visual: WealthManagementVisual,
  },
  {
    id: 'wallet',
    title: 'Digital Wallet & Virtual IBAN',
    desc: {
      en: 'Secure ledger architecture for individual and corporate fund management, tightly integrated with local banking infrastructure.',
      ar: 'بنية سجل آمنة لإدارة أموال الأفراد والشركات، متكاملة تماماً مع البنية التحتية المصرفية المحلية.',
    },
    color: 'rose',
    glowColor: 'rgba(244,63,94,0.12)',
    Visual: DigitalWalletVisual,
  },
  {
    id: 'ekyc',
    title: 'Automated eKYC & AML',
    desc: {
      en: 'Identity verification, e-KYC/KYB workflows, and AML screening embedded seamlessly into the customer acquisition journey.',
      ar: 'التحقق من الهوية، إجراءات اعرف عميلك، وفحص مكافحة غسيل الأموال مدمجة بسلاسة في رحلة اكتساب العملاء.',
    },
    color: 'teal',
    glowColor: 'rgba(20,184,166,0.12)',
    Visual: EkycVisual,
  },
  {
    id: 'pooled',
    title: 'Pooled Account Management',
    desc: {
      en: 'Real-time reconciliation, ledger segregation, and transparent fund management to satisfy strict regulatory compliance.',
      ar: 'تسوية لحظية، فصل السجلات، وإدارة شفافة للأموال لضمان الامتثال الصارم للمتطلبات الرقابية.',
    },
    color: 'indigo',
    glowColor: 'rgba(99,102,241,0.12)',
    Visual: PooledAccountVisual,
  },
];

/* border color map */
const borderMap: Record<string, string> = {
  emerald: 'hover:border-emerald-500/40',
  sky: 'hover:border-sky-500/40',
  amber: 'hover:border-amber-500/40',
  violet: 'hover:border-violet-500/40',
  cyan: 'hover:border-cyan-500/40',
  purple: 'hover:border-purple-500/40',
  rose: 'hover:border-rose-500/40',
  teal: 'hover:border-teal-500/40',
  indigo: 'hover:border-indigo-500/40',
};

/* ─────────────────────────────────────────
   Product Card — viewport-gated animations
   Infinite loops only run while the card
   is visible, so off-screen cards cost zero.
───────────────────────────────────────── */
function ProductCard({
  product,
  index: i,
  hoveredIdx,
  setHoveredIdx,
  isArabic,
  arFont,
  reduce,
}: {
  product: Product;
  index: number;
  hoveredIdx: number | null;
  setHoveredIdx: (v: number | null) => void;
  isArabic: boolean;
  arFont: string;
  reduce: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { margin: '200px 0px', amount: 0 as const });

  return (
    <motion.div
      ref={cardRef}
      key={product.id}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      onMouseEnter={() => setHoveredIdx(i)}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      <SpotlightCard
        glowColor={product.glowColor}
        className={`group flex h-[360px] flex-col rounded-2xl border border-white/10 bg-zinc-900/60 transition-all duration-300 ${borderMap[product.color] || ''} ${
          hoveredIdx !== null && hoveredIdx !== i ? 'opacity-60 scale-[0.98]' : 'opacity-100'
        }`}
      >
        <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-t-2xl border-b border-white/5 bg-zinc-950/60">
          <product.Visual active={isInView} />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="mb-2 font-mono text-sm font-bold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
              {product.title}
            </h3>
            <p className={`text-xs leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300 ${arFont}`}>
              {isArabic ? product.desc.ar : product.desc.en}
            </p>
          </div>
          <motion.div
            className="mt-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
          />
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export function AboutProductsShowcase({ isArabic, heading, sub }: Props) {
  const reduce = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const arFont = isArabic ? 'font-arabic' : '';

  return (
    <section
      id="about-projects"
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-zinc-950 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[50%] w-[40%] rounded-full bg-emerald-500/5 blur-[40px] md:blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${arFont}`}>{heading}</h2>
          {sub && <p className={`mt-4 text-sm text-zinc-500 md:text-base ${arFont}`}>{sub}</p>}
        </motion.div>

        {/* Products grid — 2×3 */}
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              hoveredIdx={hoveredIdx}
              setHoveredIdx={setHoveredIdx}
              isArabic={isArabic}
              arFont={arFont}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
