import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { ABOUT_EXPERTISE_ICONS } from '@/core/components/web/about/aboutUsIconMaps';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  expertiseKicker: string;
  expertiseHeading: string;
};

export function AboutExpertiseGrid({ content, isArabic, expertiseKicker, expertiseHeading }: Props) {
  return (
    <section className="relative z-10 border-t border-zinc-200/80 bg-zinc-100/60 py-20 dark:border-zinc-800 dark:bg-zinc-900/60 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 md:mb-14">
          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {expertiseKicker}
          </span>
          <h3 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
            {expertiseHeading}
          </h3>
          <div className="mt-4 h-1 w-16 rounded-full bg-primary-500/40" />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.expertise.map((area) => {
            const Icon = ABOUT_EXPERTISE_ICONS[area.iconKey];
            return (
              <StaggerItem key={area.id}>
                <div className="press-scale group flex h-full items-start gap-5 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-500/35 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-primary-500/30">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-primary-500/12 group-hover:text-primary-600 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-primary-500/15 dark:group-hover:text-primary-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-2 text-base font-bold text-zinc-900 dark:text-white">
                      {isArabic ? area.title.ar : area.title.en}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {isArabic ? area.description.ar : area.description.en}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
