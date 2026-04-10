'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

type Props = {
  isArabic: boolean;
  projectsLabel: string;
};

const PROJECTS = [
  {
    id: 'robo',
    title: { en: 'Robo-advisory Engine', ar: 'محرك الاستثمار الآلي' },
    desc: {
      en: 'Algorithmic portfolio management with real-time rebalancing, built to SAMA regulatory standards.',
      ar: 'إدارة محافظ خوارزمية مع إعادة توازن لحظية، مبنية وفق معايير مؤسسة النقد (ساما).',
    },
    visual: (uid: string) => (
      <svg viewBox="0 0 200 100" className="h-full w-full opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        <defs>
          <linearGradient id={`${uid}-robo`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(16,185,129,0)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.2)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,100 L0,70 Q50,40 100,50 T200,20 L200,100 Z"
          fill={`url(#${uid}-robo)`}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,70 Q50,40 100,50 T200,20"
          fill="none"
          stroke="rgba(52,211,153,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="100" cy="50" r="4" fill="#10b981"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="200" cy="20" r="4" fill="#10b981"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
        />
      </svg>
    ),
  },
  {
    id: 'pg',
    title: { en: 'Payment Gateway Stack', ar: 'بنية تحتية للمدفوعات' },
    desc: {
      en: 'High-throughput payment orchestration layer handling multi-rail routing and strict idempotent processing.',
      ar: 'طبقة توجيه مدفوعات عالية الكفاءة تتعامل مع مسارات متعددة ومعالجة صارمة لتجنب التكرار.',
    },
    visual: (uid: string) => (
      <div className="relative flex h-full w-full items-center justify-center p-6 opacity-60 transition-opacity duration-500 group-hover:opacity-100 overflow-hidden">
        {/* Scanning laser effect */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-emerald-400/80 shadow-[0_0_12px_2px_rgba(52,211,153,0.8)] z-10"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <div className="w-full rounded-lg border border-emerald-500/20 bg-black/60 p-4 font-mono text-[9px] text-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.1)] relative z-0">
          <p className="text-zinc-500">{'// POST /api/v1/payments'}</p>
          <p>{'{'}</p>
          <motion.p className="ps-4" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-zinc-400">&quot;trx_id&quot;</span>: <span className="text-emerald-300">&quot;pay_9xa82&quot;</span>,
          </motion.p>
          <motion.p className="ps-4" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}>
            <span className="text-zinc-400">&quot;amount&quot;</span>: <span className="text-emerald-300">125000</span>,
          </motion.p>
          <motion.p className="ps-4" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}>
            <span className="text-zinc-400">&quot;status&quot;</span>: <span className="text-emerald-300">&quot;SETTLED&quot;</span>
          </motion.p>
          <p>{'}'}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'iam',
    title: { en: 'Identity & Access (IAM)', ar: 'إدارة الهوية والوصول' },
    desc: {
      en: 'Centralized auth provider featuring RBAC, zero-trust tokens, and strict audit logging for compliance.',
      ar: 'مزود مصادقة مركزي يتميز بصلاحيات مبنية على الأدوار وتسجيل تدقيق صارم للامتثال.',
    },
    visual: (uid: string) => (
      <svg viewBox="0 0 200 100" className="h-full w-full opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        <motion.circle
          cx="100" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 50px' }}
        />
        <motion.circle
          cx="100" cy="50" r="22" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1"
          animate={{ rotate: -360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ transformOrigin: '100px 50px' }}
        />
        {/* Core Lock Icon */}
        <g className="drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
          <rect x="94" y="46" width="12" height="10" rx="2" fill="#10b981" />
          <path d="M96,46 V42 A4,4 0 0,1 104,42 V46" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Data packets (tokens) flying outward */}
        <motion.circle cx="100" cy="50" r="2" fill="#10b981" animate={{ x: [0, 40], y: [0, 20], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
        <motion.circle cx="100" cy="50" r="2" fill="#10b981" animate={{ x: [0, -30], y: [0, -25], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
        <motion.circle cx="100" cy="50" r="2" fill="#10b981" animate={{ x: [0, 25], y: [0, -35], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
      </svg>
    ),
  },
  {
    id: 'ledger',
    title: { en: 'Core Ledger System', ar: 'نظام السجل الأساسي' },
    desc: {
      en: 'Centralized core ledger handling all financial accounting and reconciliation for fintech products.',
      ar: 'سجل أساسي مركزي يعالج جميع الحسابات المالية والتسويات لمنتجات التقنية المالية.',
    },
    visual: (uid: string) => (
      <svg viewBox="0 0 200 100" className="h-full w-full opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        <defs>
          <linearGradient id={`${uid}-ledger`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(16,185,129,0)" />
            <stop offset="50%" stopColor="rgba(16,185,129,0.5)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
        </defs>
        <motion.rect x="40" y="35" width="120" height="2" fill={`url(#${uid}-ledger)`} animate={{ x: [-20, 20, -20] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.rect x="40" y="50" width="120" height="2" fill={`url(#${uid}-ledger)`} animate={{ x: [20, -20, 20] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.rect x="40" y="65" width="120" height="2" fill={`url(#${uid}-ledger)`} animate={{ x: [-10, 30, -10] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        {/* Ledger columns */}
        <line x1="100" y1="20" x2="100" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="70" y1="20" x2="70" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="130" y1="20" x2="130" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        {/* Glowing data points */}
        <motion.circle cx="70" cy="35" r="3" fill="#10b981" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.1 }} />
        <motion.circle cx="130" cy="50" r="3" fill="#10b981" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} />
        <motion.circle cx="100" cy="65" r="3" fill="#10b981" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
      </svg>
    ),
  },
  {
    id: 'openbanking',
    title: { en: 'Open Banking Aggregator', ar: 'تطبيق التجميع المصرفي المفتوح' },
    desc: {
      en: 'Multi-bank data aggregation platform connecting consumers to all their financial accounts via standardized Open Banking APIs — fully compliant with SAMA Open Banking framework.',
      ar: 'منصة تجميع بيانات متعددة البنوك تربط المستهلكين بجميع حساباتهم المالية عبر واجهات برمجية موحدة — ممتثلة تماماً لإطار البنوك المفتوحة لدى ساما.',
    },
    visual: (uid: string) => (
      <svg viewBox="0 0 200 100" className="h-full w-full opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        <defs>
          <radialGradient id={`${uid}-ob`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.25)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>
        </defs>
        {/* Central hub */}
        <circle cx="100" cy="50" r="12" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.6)" strokeWidth="1.5" />
        <motion.circle cx="100" cy="50" r="12" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1"
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 50px' }}
        />
        <text x="100" y="54" textAnchor="middle" fontSize="8" fill="rgba(56,189,248,0.9)" fontFamily="monospace">API</text>
        {/* Bank nodes */}
        {[
          { cx: 30, cy: 20, label: 'BNK' },
          { cx: 170, cy: 20, label: 'BNK' },
          { cx: 20, cy: 70, label: 'BNK' },
          { cx: 180, cy: 70, label: 'BNK' },
          { cx: 100, cy: 88, label: 'BNK' },
        ].map((node, i) => (
          <g key={i}>
            <motion.line
              x1={node.cx} y1={node.cy} x2="100" y2="50"
              stroke="rgba(56,189,248,0.25)" strokeWidth="1" strokeDasharray="3 4"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-28" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </motion.line>
            <motion.circle cx={node.cx} cy={node.cy} r="8"
              fill="rgba(9,9,11,0.9)" stroke="rgba(56,189,248,0.45)" strokeWidth="1"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
            <text x={node.cx} y={node.cy + 3} textAnchor="middle" fontSize="5" fill="rgba(56,189,248,0.8)" fontFamily="monospace">{node.label}</text>
          </g>
        ))}
        {/* Data packets flowing inward */}
        {[{ x1: 30, y1: 20 }, { x1: 170, y1: 20 }, { x1: 20, y1: 70 }].map((pos, i) => (
          <motion.circle key={i} r="2" fill="rgba(56,189,248,0.9)"
            animate={{ cx: [pos.x1, 100], cy: [pos.y1, 50], opacity: [1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.5, ease: 'easeIn' }}
          />
        ))}
      </svg>
    ),
  },
  {
    id: 'wealth',
    title: { en: 'Wealth Management App', ar: 'تطبيق إدارة الثروات' },
    desc: {
      en: 'Digital wealth platform offering automated portfolio construction, goal-based investing, and real-time performance dashboards — engineered to CMA standards.',
      ar: 'منصة ثروات رقمية تتيح بناء محافظ آلية واستثماراً يعتمد على الأهداف ولوحات أداء لحظية — مبنية وفق معايير هيئة السوق المالية.',
    },
    visual: (uid: string) => (
      <svg viewBox="0 0 200 100" className="h-full w-full opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        <defs>
          <linearGradient id={`${uid}-wm`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(168,85,247,0)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.2)" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <motion.path
          d="M10,90 L10,65 Q40,50 70,58 Q100,65 130,35 Q160,10 190,20 L190,90 Z"
          fill={`url(#${uid}-wm)`}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Line */}
        <motion.path
          d="M10,65 Q40,50 70,58 Q100,65 130,35 Q160,10 190,20"
          fill="none" stroke="rgba(168,85,247,0.9)" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Data points */}
        {[{ cx: 70, cy: 58 }, { cx: 130, cy: 35 }, { cx: 190, cy: 20 }].map((p, i) => (
          <motion.circle key={i} cx={p.cx} cy={p.cy} r="3.5"
            fill="#a855f7"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
        {/* Portfolio allocation mini-bars */}
        {[{ x: 15, h: 20, c: 'rgba(168,85,247,0.7)' }, { x: 25, h: 35, c: 'rgba(168,85,247,0.5)' }, { x: 35, h: 15, c: 'rgba(168,85,247,0.3)' }].map((b, i) => (
          <motion.rect key={i} x={b.x} y={90 - b.h} width="7" height={b.h} rx="1" fill={b.c}
            animate={{ height: [b.h, b.h * 1.2, b.h], y: [90 - b.h, 90 - b.h * 1.2, 90 - b.h] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
        {/* Up arrow indicator */}
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M160,45 L165,38 L170,45" stroke="rgba(168,85,247,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M165,38 L165,52" stroke="rgba(168,85,247,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </svg>
    ),
  },
];

export function AboutProjectsGrid({ isArabic, projectsLabel }: Props) {
  const uid = useId().replace(/:/g, '');

  return (
    <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      {PROJECTS.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group relative flex h-[320px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/40 transition-colors hover:border-emerald-500/30"
        >
          {/* Visual Area */}
          <div className="relative h-[140px] w-full shrink-0 border-b border-white/5 bg-white/[0.01] overflow-hidden">
            {p.visual(uid)}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Content Area */}
          <div className="flex flex-1 flex-col p-6 z-10 bg-gradient-to-b from-[#0a0a0b] to-[#050505]">
            <h3 className="mb-2 font-mono text-sm font-bold text-zinc-100">{isArabic ? p.title.ar : p.title.en}</h3>
            <p className={`mb-4 text-xs leading-relaxed text-zinc-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? p.desc.ar : p.desc.en}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
