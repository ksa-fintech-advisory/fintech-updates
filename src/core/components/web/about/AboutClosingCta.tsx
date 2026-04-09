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
    <section className="border-t border-zinc-200 bg-white py-16 pb-[max(4rem,env(safe-area-inset-bottom))] dark:border-zinc-800 dark:bg-zinc-950 md:py-24 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center text-white shadow-apple dark:bg-black sm:p-10 md:p-16">
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
              className="apple-btn inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black shadow-apple hover:bg-zinc-100 hover:shadow-apple-hover"
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
