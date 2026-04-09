import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

const Network3D = dynamic(() => import('@/core/components/web/about/Network3D'), { ssr: false });

type Props = {
  heroBadge: string;
  title: string;
  subtitle: string;
  isArabic: boolean;
  tagArchitecture: string;
  tagCompliance: string;
  tagMarkets: string;
  practiceLensesCaption: string;
};

export function AboutHero({
  heroBadge,
  title,
  subtitle,
  isArabic,
  tagArchitecture,
  tagCompliance,
  tagMarkets,
  practiceLensesCaption,
}: Props) {
  const accentEdge = isArabic
    ? 'border-e-2 border-s-0 pe-6 ps-0 md:pe-10 md:ps-0'
    : 'border-s-2 border-e-0 ps-6 pe-0 md:ps-10 md:pe-0';

  const tags = [
    { text: tagArchitecture, rotate: '-rotate-1', offset: 'top-0 start-0' },
    { text: tagCompliance, rotate: 'rotate-2', offset: 'top-[38%] -end-2 md:end-4' },
    { text: tagMarkets, rotate: '-rotate-2', offset: 'bottom-2 start-4 md:start-8' },
  ] as const;

  return (
    <section
      id="about-overview"
      className="scroll-mt-28 relative overflow-hidden border-b border-zinc-200/90 bg-gradient-to-b from-white via-white/95 to-zinc-50/80 pt-10 pb-16 backdrop-blur-sm dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950/95 dark:to-zinc-900/90 md:pt-14 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,rgba(0,0,0,0.04),transparent_55%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 z-0 opacity-[0.35] mix-blend-multiply grayscale dark:opacity-[0.22] dark:mix-blend-screen">
        <Network3D />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <AnimatedSection direction="up" delay={0.12} className="lg:col-span-7">
            <div className={`relative ${accentEdge} border-primary-600 dark:border-primary-400`}>
              <span className="mb-4 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                {heroBadge}
              </span>
              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                {title}
              </h1>
              <p className="max-w-2xl text-lg font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl md:leading-relaxed">
                {subtitle}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start lg:hidden">
                {[tagArchitecture, tagCompliance, tagMarkets].map((text) => (
                  <span
                    key={text}
                    className="rounded-full border border-primary-500/25 bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm dark:border-primary-500/30 dark:bg-zinc-900/90 dark:text-zinc-100"
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.22} className="relative mx-auto hidden h-[min(22rem,50vw)] w-full max-w-sm lg:col-span-5 lg:block">
            <div className="absolute inset-0 rounded-none border border-zinc-200 bg-white/40 shadow-none backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30" />
            <div className="absolute inset-x-4 top-4 h-px bg-zinc-200/50 dark:bg-zinc-800/50" />
            <div className="absolute inset-y-4 start-4 w-px bg-zinc-200/50 dark:bg-zinc-800/50" />
            {tags.map(({ text, rotate, offset }) => (
              <div
                key={text}
                className={`absolute ${offset} max-w-[11rem] rounded-none border border-zinc-200/80 bg-white/95 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-800 shadow-sm backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-950/95 dark:text-zinc-300 ${rotate}`}
              >
                <div className="absolute -start-1 -top-1 h-2 w-2 border-s border-t border-primary-500/50" />
                <div className="absolute -end-1 -bottom-1 h-2 w-2 border-b border-e border-primary-500/50" />
                {text}
              </div>
            ))}
            <p className="absolute bottom-6 end-6 max-w-[10rem] text-end font-mono text-[9px] uppercase leading-tight tracking-widest text-primary-600/80 dark:text-primary-400/70">
              {practiceLensesCaption}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
