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
    <section className="border-t border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-white shadow-2xl dark:bg-black md:p-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden p-4 text-start font-mono text-[10px] leading-3 text-white opacity-10">
            {Array(20).fill('010101011010010101110101010').join(' ')}
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h3 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{title}</h3>
            <p className="mb-10 text-lg text-zinc-400">{subtitle}</p>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-zinc-200"
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
