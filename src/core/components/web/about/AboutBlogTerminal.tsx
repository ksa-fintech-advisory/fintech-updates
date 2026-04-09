'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  locale: string;
  isArabic: boolean;
  kicker: string;
  heading: string;
  command: string;
  line1: string;
  line2: string;
  cta: string;
};

export function AboutBlogTerminal({
  locale,
  isArabic,
  kicker,
  heading,
  command,
  line1,
  line2,
  cta,
}: Props) {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (phase === 0) {
      let i = 0;
      const t = setInterval(() => {
        i += 1;
        setTyped(command.slice(0, i));
        if (i >= command.length) {
          clearInterval(t);
          setPhase(1);
        }
      }, 42);
      return () => clearInterval(t);
    }
  }, [phase, command]);

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <section
      id="about-blog"
      className="scroll-mt-28 border-b border-white/10 bg-zinc-950 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90">
          {kicker}
        </p>
        <h2 className={`mb-10 text-center text-2xl font-bold text-white md:text-3xl ${isArabic ? 'font-arabic' : ''}`}>
          {heading}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-zinc-800/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-500/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
            <span className="ms-2 font-mono text-[10px] text-zinc-500">zsh — maal-tech</span>
          </div>
          <div className="min-h-[200px] p-5 font-mono text-sm leading-relaxed text-zinc-300 md:p-6 md:text-[15px]">
            <p>
              <span className="text-emerald-400">➜</span> <span className="text-cyan-400">~</span>{' '}
              <span className="text-zinc-100">{typed}</span>
              {phase === 0 && (
                <span className="ms-0.5 inline-block h-4 w-2 animate-pulse bg-emerald-400/80 align-[-2px]" />
              )}
            </p>
            {phase >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mt-4 space-y-2">
                <p className="text-zinc-400">{line1}</p>
                <p className="text-zinc-400">{line2}</p>
                <p className="pt-4">
                  <Link
                    href={`/${locale}/blog`}
                    className="text-emerald-400/95 underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:text-emerald-300"
                  >
                    {cta}
                  </Link>
                </p>
                <p className="pt-4 text-emerald-400">
                  ➜ <span className="text-cyan-400">~</span> <span className="ms-1 inline-block h-4 w-2 animate-pulse bg-zinc-500/80 align-[-2px]" />
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
