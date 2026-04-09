import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

type Props = {
  kicker: string;
  quote: string;
  isArabic: boolean;
};

export function AboutPullQuote({ kicker, quote, isArabic }: Props) {
  return (
    <section
      className="relative z-10 scroll-mt-28 overflow-hidden border-y border-zinc-800 bg-zinc-950 py-16 text-white dark:border-zinc-700 md:py-20"
      aria-label={kicker}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_0%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_100%,rgba(255,255,255,0.04),transparent_45%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-4xl text-center" dir={isArabic ? 'rtl' : 'ltr'}>
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-primary-400/90">{kicker}</p>
            <blockquote
              className={
                isArabic
                  ? 'font-arabic text-2xl font-medium leading-snug text-zinc-100 md:text-3xl md:leading-snug'
                  : 'font-portfolio text-[1.45rem] font-normal italic leading-snug tracking-tight text-zinc-100 md:text-3xl md:leading-[1.35]'
              }
            >
              <span className="text-primary-400/85">&ldquo;</span>
              {quote}
              <span className="text-primary-400/85">&rdquo;</span>
            </blockquote>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
