import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiBriefcase, FiCpu, FiShield, FiAward } from 'react-icons/fi';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  expertiseKicker: string;
  expertiseHeading: string;
};

const FALLBACK_ICONS = [FiBriefcase, FiCpu, FiShield, FiAward] as const;

export function AboutExpertiseGrid({ content, isArabic, expertiseKicker, expertiseHeading }: Props) {
  return (
    <section className="relative z-10 border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              {expertiseKicker}
            </span>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">{expertiseHeading}</h3>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {content.expertise.map((area, idx) => {
            const Icon = FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
            return (
              <StaggerItem key={area.id}>
                <div className="group flex items-start gap-6 border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-black dark:hover:border-zinc-600">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-zinc-200 bg-zinc-100 text-zinc-900 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:group-hover:bg-primary-900/20 dark:group-hover:text-primary-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-2 font-mono text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
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
