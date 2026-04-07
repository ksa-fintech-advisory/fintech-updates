import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { ABOUT_VALUE_ICONS } from '@/core/components/web/about/aboutUsIconMaps';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  principlesHeading: string;
};

export function AboutValuesGrid({ content, isArabic, principlesHeading }: Props) {
  return (
    <section className="relative z-10 border-t border-zinc-200 py-20 dark:border-zinc-800 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 text-center">
          <h3 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">{principlesHeading}</h3>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary-500/40" />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {content.values.map((value, idx) => {
            const ValueIcon = ABOUT_VALUE_ICONS[value.iconKey];
            return (
              <StaggerItem key={value.id}>
                <div className="press-scale group h-full rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-primary-500/40">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 transition-colors group-hover:bg-primary-500/20 dark:text-primary-400">
                      <ValueIcon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="font-mono text-xs font-bold text-zinc-300 dark:text-zinc-700">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                    {isArabic ? value.title.ar : value.title.en}
                  </h4>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
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
