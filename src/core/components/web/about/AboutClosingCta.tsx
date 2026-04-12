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
    <section className="border-t border-zinc-200/50 bg-white py-16 pb-[max(4rem,env(safe-area-inset-bottom))] dark:border-zinc-800/50 dark:bg-zinc-950 md:py-24 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative mx-auto max-w-5xl overflow-hidden border-y border-zinc-200/80 bg-zinc-50/50 p-10 text-center dark:border-zinc-800/80 dark:bg-zinc-900/30 sm:p-14 md:p-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(0,0,0,0.03),transparent_55%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(255,255,255,0.04),transparent_55%)]" />
          {/* Subtle binary background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden p-4 text-start  text-[10px] leading-3 text-zinc-900 opacity-[0.02] dark:text-white dark:opacity-[0.03]">
            {Array(20).fill('010101011010010101110101010').join(' ')}
          </div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent dark:via-primary-400/20" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h3 className="mb-6 text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">{title}</h3>
            <p className="mb-12 text-pretty text-lg leading-[1.8] text-zinc-600 dark:text-zinc-400 md:text-xl">{subtitle}</p>

            <Link
              href={`/${locale}/contact`}
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 bg-zinc-900 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <span>{buttonLabel}</span>
              <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
              </span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
