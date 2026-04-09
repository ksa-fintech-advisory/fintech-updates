'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const LINKEDIN_URL = 'https://www.linkedin.com/in/mohfintech/';

type Props = {
  locale: string;
  isArabic: boolean;
  kicker: string;
  heading: string;
  placeholder: string;
  actionMvp: string;
  actionReview: string;
  actionWhatsApp: string;
  linkedInLabel: string;
  whatsappUrl?: string;
};

export function AboutCommandPalette({
  locale,
  isArabic,
  kicker,
  heading,
  placeholder,
  actionMvp,
  actionReview,
  actionWhatsApp,
  linkedInLabel,
  whatsappUrl,
}: Props) {
  const contactHref = `/${locale}/contact`;

  const actions = [
    { label: actionMvp, href: `${contactHref}?topic=mvp`, external: false },
    { label: actionReview, href: `${contactHref}?topic=review`, external: false },
    ...(whatsappUrl
      ? [{ label: actionWhatsApp, href: whatsappUrl, external: true as const }]
      : []),
  ];

  return (
    <section
      id="about-connect"
      className="scroll-mt-28 bg-[#050505] py-20 pb-28 md:py-28 md:pb-32"
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_0_80px_-30px_rgba(16,185,129,0.35)] backdrop-blur-xl"
        >
          <div className="border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5">
              <span className="font-mono text-emerald-500/80">⌘</span>
              <span className={`font-mono text-sm text-zinc-500 ${isArabic ? 'font-arabic text-end' : ''}`}>{placeholder}</span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          <ul className="p-2">
            {actions.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-3.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <span className={isArabic ? 'font-arabic' : ''}>{a.label}</span>
                  <FiArrowUpRight
                    className={`h-4 w-4 shrink-0 text-zinc-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400 ${
                      isArabic ? 'rotate-[270deg] group-hover:translate-x-[-2px]' : ''
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 px-4 py-3">
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-medium text-zinc-500 transition-colors hover:text-emerald-400/90"
            >
              <span>{linkedInLabel}</span>
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
