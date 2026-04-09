import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

const Network3D = dynamic(() => import('@/core/components/web/about/Network3D'), { ssr: false });

type Props = {
  heroBadge: string;
  title: string;
  subtitle: string;
  isArabic: boolean;
};

export function AboutHero({ heroBadge, title, subtitle, isArabic }: Props) {
  const accentEdge = isArabic
    ? 'border-e-2 border-s-0 pe-6 ps-0 md:pe-10 md:ps-0'
    : 'border-s-2 border-e-0 ps-6 pe-0 md:ps-10 md:pe-0';

  return (
    <section className="relative overflow-hidden border-b border-zinc-200/90 bg-gradient-to-b from-white via-white/95 to-zinc-50/80 pt-28 pb-16 backdrop-blur-sm dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950/95 dark:to-zinc-900/90 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,theme(colors.primary.500/14),transparent_55%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,theme(colors.primary.500/12),transparent_55%)]" />
      <div className="absolute inset-0 z-0 opacity-[0.35] mix-blend-multiply grayscale dark:opacity-[0.22] dark:mix-blend-screen">
        <Network3D />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl" dir={isArabic ? 'rtl' : 'ltr'}>
          <AnimatedSection direction="up" delay={0.12}>
            <div className={`relative ${accentEdge} border-primary-500`}>
              <span className="mb-4 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                {heroBadge}
              </span>
              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                {title}
              </h1>
              <p className="max-w-3xl text-lg font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl md:leading-relaxed">
                {subtitle}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
