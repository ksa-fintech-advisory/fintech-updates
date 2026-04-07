import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { ABOUT_EXPERTISE_ICONS } from '@/core/components/web/about/aboutUsIconMaps';
import { StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  expertiseKicker: string;
  expertiseHeading: string;
};

export function AboutExpertiseGrid({ content, isArabic, expertiseKicker, expertiseHeading }: Props) {
  return (
    <section className="relative z-10 border-t border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              {expertiseKicker}
            </span>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">{expertiseHeading}</h3>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.expertise.map((area) => {
            const Icon = ABOUT_EXPERTISE_ICONS[area.iconKey];
            return (
              <StaggerItem key={area.id}>
                <div className="press-scale group flex items-start gap-5 rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-primary-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-black dark:hover:border-primary-500/30">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-primary-500/10 group-hover:text-primary-600 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-primary-500/10 dark:group-hover:text-primary-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1.5 text-base font-bold text-zinc-900 dark:text-white">
                      {isArabic ? area.title.ar : area.title.en}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
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
