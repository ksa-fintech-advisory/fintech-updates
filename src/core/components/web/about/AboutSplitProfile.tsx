'use client';

import { motion, useReducedMotion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ProfileAvatar } from '@/core/components/web/layout/ProfileAvatar';
import { AuthorNameText } from '@/core/components/web/layout/AuthorNameText';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Props = {
  isArabic: boolean;
  ideFileLabel: string;
  authorName: string;
  authorTitle: string;
  avatarAlt: string;
};

/* ─────────────────────────────────────────
   Bilingual helper
───────────────────────────────────────── */
type Bi = { en: string; ar: string };
const bi = (en: string, ar: string): Bi => ({ en, ar });
const t = (o: Bi, isAr: boolean) => (isAr ? o.ar : o.en);

/* ─────────────────────────────────────────
   Code snippets — cycling in the IDE panel
───────────────────────────────────────── */
const CODE_SNIPPETS = [
  {
    file: 'settlement.ts',
    lines: [
      { tokens: [{ t: 'export ', c: 'text-purple-400' }, { t: 'async ', c: 'text-purple-400' }, { t: 'function ', c: 'text-blue-300' }, { t: 'settlementPipeline', c: 'text-sky-300' }, { t: '(ctx: ', c: 'text-zinc-500' }, { t: 'ComplianceCtx', c: 'text-amber-300' }, { t: ') {', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  ', c: '' }, { t: 'await ', c: 'text-purple-400' }, { t: 'auditLog', c: 'text-sky-300' }, { t: '.', c: 'text-zinc-500' }, { t: 'append', c: 'text-emerald-300' }, { t: '(ctx);', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  ', c: '' }, { t: 'const ', c: 'text-purple-400' }, { t: 'result', c: 'text-zinc-100' }, { t: ' = ', c: 'text-zinc-500' }, { t: 'await ', c: 'text-purple-400' }, { t: 'router', c: 'text-sky-300' }, { t: '.', c: 'text-zinc-500' }, { t: 'route', c: 'text-emerald-300' }, { t: '(ctx);', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  ', c: '' }, { t: 'return ', c: 'text-purple-400' }, { t: 'result', c: 'text-zinc-100' }, { t: ';', c: 'text-zinc-400' }] },
      { tokens: [{ t: '}', c: 'text-zinc-400' }] },
    ],
  },
  {
    file: 'kyc-flow.ts',
    lines: [
      { tokens: [{ t: 'const ', c: 'text-purple-400' }, { t: 'verifyIdentity', c: 'text-sky-300' }, { t: ' = ', c: 'text-zinc-500' }, { t: 'async ', c: 'text-purple-400' }, { t: '(user: ', c: 'text-zinc-500' }, { t: 'User', c: 'text-amber-300' }, { t: ') => {', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  ', c: '' }, { t: 'const ', c: 'text-purple-400' }, { t: 'doc', c: 'text-zinc-100' }, { t: ' = ', c: 'text-zinc-500' }, { t: 'await ', c: 'text-purple-400' }, { t: 'eKYC', c: 'text-sky-300' }, { t: '.', c: 'text-zinc-500' }, { t: 'scan', c: 'text-emerald-300' }, { t: '(user.nid);', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  ', c: '' }, { t: 'await ', c: 'text-purple-400' }, { t: 'aml', c: 'text-sky-300' }, { t: '.', c: 'text-zinc-500' }, { t: 'screen', c: 'text-emerald-300' }, { t: '({ doc, user });', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  ', c: '' }, { t: 'return ', c: 'text-purple-400' }, { t: 'doc', c: 'text-zinc-100' }, { t: '.', c: 'text-zinc-500' }, { t: 'status', c: 'text-emerald-300' }, { t: ';', c: 'text-zinc-400' }] },
      { tokens: [{ t: '};', c: 'text-zinc-400' }] },
    ],
  },
  {
    file: 'ledger.ts',
    lines: [
      { tokens: [{ t: 'interface ', c: 'text-purple-400' }, { t: 'LedgerEntry ', c: 'text-amber-300' }, { t: '{', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  id', c: 'text-sky-300' }, { t: ': ', c: 'text-zinc-500' }, { t: 'string', c: 'text-emerald-400' }, { t: ';', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  amount', c: 'text-sky-300' }, { t: ': ', c: 'text-zinc-500' }, { t: 'Dinero', c: 'text-amber-300' }, { t: '<', c: 'text-zinc-500' }, { t: 'number', c: 'text-emerald-400' }, { t: '>;', c: 'text-zinc-400' }] },
      { tokens: [{ t: '  rail', c: 'text-sky-300' }, { t: ': ', c: 'text-zinc-500' }, { t: "'SARIE' | 'RTGS' | 'FAST'", c: 'text-emerald-400' }, { t: ';', c: 'text-zinc-400' }] },
      { tokens: [{ t: '}', c: 'text-zinc-400' }] },
    ],
  },
];

/* ─────────────────────────────────────────
   Value pillars — bilingual
───────────────────────────────────────── */
const PILLARS = [
  {
    icon: '🧭',
    label: bi('Product strategy', 'استراتيجية المنتج'),
    description: bi(
      'Turning financial regulation into a product roadmap that investors and regulators both approve.',
      'تحويل المتطلبات التنظيمية إلى خارطة منتج يوافق عليها المستثمرون والجهات الرقابية على حد سواء.'
    ),
    accent: 'from-emerald-500/15 to-teal-500/5 border-emerald-500/20 hover:border-emerald-500/50',
  },
  {
    icon: '⚖️',
    label: bi('Regulatory navigation', 'التوجيه التنظيمي'),
    description: bi(
      'Deep familiarity with SAMA, CMA and GCC supervisory frameworks — translating policy into architecture.',
      'معرفة عميقة بأنظمة ساما وهيئة السوق المالية والأطر الرقابية الخليجية — لتحويل السياسات إلى بنية تقنية.'
    ),
    accent: 'from-amber-500/15 to-orange-500/5 border-amber-500/20 hover:border-amber-500/50',
  },
  {
    icon: '🏗️',
    label: bi('System design', 'تصميم الأنظمة'),
    description: bi(
      'Designing platforms that scale to millions of users while remaining auditable and compliant by default.',
      'تصميم منصات تتوسع لملايين المستخدمين مع الحفاظ على قابلية التدقيق والامتثال التلقائي.'
    ),
    accent: 'from-sky-500/15 to-blue-500/5 border-sky-500/20 hover:border-sky-500/50',
  },
  {
    icon: '🤝',
    label: bi('Founder & advisor', 'مؤسس ومستشار'),
    description: bi(
      'Working alongside founding teams and C-suite to close the gap between a vision and a licensed product.',
      'العمل جنبًا إلى جنب مع فرق التأسيس والإدارة العليا لسد الفجوة بين الرؤية والمنتج المرخّص.'
    ),
    accent: 'from-violet-500/15 to-purple-500/5 border-violet-500/20 hover:border-violet-500/50',
  },
];

/* ─────────────────────────────────────────
   Role badges — bilingual
───────────────────────────────────────── */
const ROLE_BADGES = [
  bi('FinTech Advisor', 'مستشار تقنية مالية'),
  bi('Product Builder', 'بناء المنتجات'),
  bi('Regulatory Expert', 'خبير تنظيمي'),
  bi('GCC Markets', 'أسواق الخليج'),
];

/* ─────────────────────────────────────────
   Section text — bilingual
───────────────────────────────────────── */
const SECTION_HEADING = bi('About Me', 'عني');
const SECTION_SUB = bi(
  'I sit at the intersection of financial product strategy, regulatory expertise, and systems thinking — helping teams build what lasts.',
  'أقف عند تقاطع استراتيجية المنتجات المالية والخبرة التنظيمية والتفكير المنهجي — أساعد الفرق على بناء ما يدوم.'
);
const QUOTE_TEXT = bi(
  "Architecture isn't about making things complex — it's about making complexity manageable.",
  'العمارة التقنية ليست عن تعقيد الأشياء — بل عن جعل التعقيد قابلًا للإدارة.'
);

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

function TypewriterCode({ snippet, idx }: { snippet: typeof CODE_SNIPPETS[number]; idx: number }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    setVisibleLines(0);
    if (reduce) { setVisibleLines(snippet.lines.length); return; }
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setVisibleLines(current);
      if (current >= snippet.lines.length) clearInterval(timer);
    }, 230);
    return () => clearInterval(timer);
  }, [idx, snippet.lines.length, reduce]);

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <pre className="overflow-x-auto p-5 font-mono text-[11px] leading-[1.9] text-zinc-300 md:text-xs">
        <code className="block whitespace-pre">
          {snippet.lines.slice(0, visibleLines).map((line, li) => (
            <motion.span
              key={li}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="block"
            >
              <span className="select-none text-zinc-700 me-4 text-[9px]">{String(li + 1).padStart(2, '0')}</span>
              {line.tokens.map((tok, ti) => (
                <span key={ti} className={tok.c}>{tok.t}</span>
              ))}
            </motion.span>
          ))}
          {visibleLines < snippet.lines.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block h-3.5 w-1.5 align-middle bg-emerald-500/80 ms-1"
            />
          )}
        </code>
      </pre>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export function AboutSplitProfile({
  isArabic,
  authorName,
  authorTitle,
  avatarAlt,
}: Props) {
  const reduce = useReducedMotion();
  const [codeIdx, setCodeIdx] = useState(0);
  const arFont = isArabic ? 'font-arabic' : '';

  useEffect(() => {
    const iv = setInterval(() => setCodeIdx((i) => (i + 1) % CODE_SNIPPETS.length), 5000);
    return () => clearInterval(iv);
  }, []);


  return (
    <section
      id="about-profile"
      className="relative overflow-hidden scroll-mt-28 border-b border-white/10 bg-zinc-900 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="pointer-events-none absolute -top-40 -start-40 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -end-40 h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">// ABOUT_ME</p>
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${arFont}`}>
            {t(SECTION_HEADING, isArabic)}
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 ${arFont}`}>
            {t(SECTION_SUB, isArabic)}
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ── LEFT: Profile card + Code Editor + Quote ── */}
          <div className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-6">

            {/* Profile identity card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/50 p-7 shadow-[0_0_40px_-20px_rgba(16,185,129,0.15)] transition-all hover:border-emerald-500/30 hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.3)]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

              <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                <div className="relative">
                  <ProfileAvatar
                    size={96}
                    alt={avatarAlt}
                    fallbackText={authorName}
                    variant="rounded"
                    className="shadow-2xl ring-2 ring-emerald-500/30 grayscale hover:grayscale-0 transition-all duration-700"
                    authorNameFont
                  />
                  <span className="absolute bottom-1 end-1 h-3.5 w-3.5 rounded-full border-2 border-zinc-800 bg-emerald-400">
                    <motion.span
                      animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-emerald-400"
                    />
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    <AuthorNameText isArabic={isArabic} className="text-[1.06em]">{authorName}</AuthorNameText>
                  </h2>
                  <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400 ${arFont}`}>{authorTitle}</p>

                  {/* Role badges — bilingual */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {ROLE_BADGES.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-400/50 hover:bg-emerald-500/20 ${arFont}`}
                      >
                        {t(badge, isArabic)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Code Editor */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_-24px_rgba(0,0,0,0.8)] transition-all hover:border-emerald-500/30"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-500">{CODE_SNIPPETS[codeIdx].file}</span>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">TS</span>
                </div>
                <div className="flex gap-1">
                  {CODE_SNIPPETS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCodeIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === codeIdx ? 'w-4 bg-emerald-400' : 'w-1.5 bg-zinc-600 hover:bg-zinc-400'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="min-h-[136px]">
                <TypewriterCode snippet={CODE_SNIPPETS[codeIdx]} idx={codeIdx} />
              </div>
            </motion.div>

            {/* Terminal philosophy quote — bilingual */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-950/70 p-6"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-emerald-500 text-sm flex-shrink-0 mt-0.5">$_</span>
                <div>
                  <p className={`font-mono text-sm text-zinc-300 leading-relaxed ${arFont}`}>
                    {t(QUOTE_TEXT, isArabic)}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-zinc-600">— {authorName}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Stats + Value Pillars + Philosophy Cards ── */}
          <div className="flex flex-col gap-6">



            {/* Value pillars — bilingual */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  whileHover={reduce ? undefined : { y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all ${pillar.accent}`}
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <div className="relative z-10">
                    <span className="mb-3 block text-2xl transition-transform duration-300 group-hover:scale-110">{pillar.icon}</span>
                    <h3 className={`mb-1.5 text-sm font-bold text-white ${arFont}`}>{t(pillar.label, isArabic)}</h3>
                    <p className={`text-[11px] leading-relaxed text-zinc-400 group-hover:text-zinc-300 ${arFont}`}>
                      {t(pillar.description, isArabic)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
}
