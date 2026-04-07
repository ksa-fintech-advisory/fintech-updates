import Link from 'next/link';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

type Props = {
  locale: string;
  isArabic: boolean;
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export function AboutClosingCta({ locale, isArabic, title, subtitle, buttonLabel }: Props) {
  return (
    <section className="border-t border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-white shadow-2xl dark:bg-black md:p-16">
          {/* Subtle binary background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden p-4 text-start font-mono text-[10px] leading-3 text-white opacity-[0.06]">
            {Array(20).fill('010101011010010101110101010').join(' ')}
          </div>
          {/* Top gradient glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h3 className="mb-5 text-3xl font-bold tracking-tight md:text-4xl">{title}</h3>
            <p className="mb-10 text-base text-zinc-400 leading-relaxed md:text-lg">{subtitle}</p>

            <Link
              href={`/${locale}/contact`}
              className="press-scale inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-bold text-black shadow-sm transition-all hover:bg-zinc-100 hover:shadow-md"
            >
              <span>{buttonLabel}</span>
              {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
