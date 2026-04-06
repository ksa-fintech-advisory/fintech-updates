import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

const Network3D = dynamic(() => import('@/core/components/web/about/Network3D'), { ssr: false });

type Props = {
  heroBadge: string;
  title: string;
  subtitle: string;
};

export function AboutHero({ subtitle }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white/50 pt-32 pb-20 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 md:pt-48 md:pb-32">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply grayscale dark:mix-blend-screen">
        <Network3D />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
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
