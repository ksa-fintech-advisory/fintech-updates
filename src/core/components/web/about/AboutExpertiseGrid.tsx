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
    <section
      id="about-expertise"
      className="scroll-mt-28 relative z-10 py-24 md:py-32 bg-[#fcfcfc] dark:bg-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          <div className="lg:sticky lg:top-32 lg:col-span-4">
            <AnimatedSection>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-8 bg-primary-500/50" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                  {expertiseKicker}
                </span>
              </div>
              <h3 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">
                {expertiseHeading}
              </h3>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-8">
            <StaggerContainer className="flex flex-col">
              {content.expertise.map((area, idx) => {
                const Icon = ABOUT_EXPERTISE_ICONS[area.iconKey];
                return (
                  <StaggerItem key={area.id}>
                    <div className="group relative flex flex-col gap-6 border-b border-zinc-200/60 py-10 transition-colors hover:border-primary-500/50 dark:border-zinc-800/60 dark:hover:border-primary-500/50">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-zinc-300 transition-colors group-hover:text-primary-500 dark:text-zinc-700 dark:group-hover:text-primary-400">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200/50 bg-white text-zinc-500 transition-colors group-hover:border-primary-500/20 group-hover:bg-primary-50 group-hover:text-primary-600 dark:border-zinc-800/50 dark:bg-zinc-900 dark:text-zinc-500 dark:group-hover:border-primary-500/20 dark:group-hover:bg-primary-500/10 dark:group-hover:text-primary-400">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
                          {isArabic ? area.title.ar : area.title.en}
                        </h4>
                        <p className="max-w-2xl text-lg leading-[1.8] text-zinc-600 dark:text-zinc-400">
                          {isArabic ? area.description.ar : area.description.en}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
