import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

const Network3D = dynamic(() => import('@/core/components/web/about/Network3D'), { ssr: false });

type Props = {
  heroBadge: string;
  title: string;
  subtitle: string;
};

export function AboutHero({ heroBadge, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white/50 pt-32 pb-20 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 md:pt-48 md:pb-32">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply grayscale dark:mix-blend-screen">
        <Network3D />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection direction="up">
            <div className="mb-6 inline-flex items-center gap-2 rounded border border-zinc-300 bg-zinc-100 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">{heroBadge}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-7xl">
              {title}
            </h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.3}>
            <div className="relative border-s-2 border-primary-500 ps-6 md:ps-8">
              <p className="text-xl font-light leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-2xl">
                {subtitle}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
