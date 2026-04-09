import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { ABOUT_VALUE_ICONS } from '@/core/components/web/about/aboutUsIconMaps';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  principlesHeading: string;
  sectionKicker: string;
};

export function AboutValuesGrid({ content, isArabic, principlesHeading, sectionKicker }: Props) {
  return (
    <section
      id="about-methodology"
      className="scroll-mt-28 relative z-10 py-20 md:py-32 border-t border-zinc-200/50 dark:border-zinc-800/50"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 md:mb-20">
          <div className="max-w-3xl">
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
              {sectionKicker}
            </span>
            <h3 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">
              {principlesHeading}
            </h3>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {content.values.map((value, idx) => {
            const ValueIcon = ABOUT_VALUE_ICONS[value.iconKey];
            return (
              <StaggerItem key={value.id}>
                <div className="group relative flex flex-col h-full border-t border-zinc-200 pt-6 transition-colors hover:border-primary-500/50 dark:border-zinc-800 dark:hover:border-primary-400/50">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600 dark:bg-zinc-800/50 dark:text-zinc-400 dark:group-hover:bg-primary-900/20 dark:group-hover:text-primary-400">
                      <ValueIcon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="font-mono text-[10px] font-bold tabular-nums tracking-widest text-zinc-400 transition-colors group-hover:text-primary-500 dark:text-zinc-600 dark:group-hover:text-primary-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
                    {isArabic ? value.title.ar : value.title.en}
                  </h4>
                  <p className="text-base leading-[1.8] text-zinc-600 dark:text-zinc-400">
                    {isArabic ? value.description.ar : value.description.en}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
