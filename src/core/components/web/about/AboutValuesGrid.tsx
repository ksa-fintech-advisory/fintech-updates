import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiCheckSquare } from 'react-icons/fi';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  principlesHeading: string;
};

export function AboutValuesGrid({ content, isArabic, principlesHeading }: Props) {
  return (
    <section className="relative z-10 border-t border-zinc-200 py-24 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <h3 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">{principlesHeading}</h3>
          <div className="mx-auto h-1 w-20 bg-zinc-200 dark:bg-zinc-800" />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.values.map((value, idx) => (
            <StaggerItem key={value.id}>
              <div className="group h-full border border-zinc-200 bg-white p-6 transition-colors duration-300 hover:border-primary-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-primary-500">
                <span className="mb-4 block font-mono text-xs text-zinc-400">0{idx + 1}</span>
                <div className="mb-4 text-zinc-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {value.icon ? (
                    <span className="text-2xl" aria-hidden>
                      {value.icon}
                    </span>
                  ) : (
                    <FiCheckSquare className="h-6 w-6" />
                  )}
                </div>
                <h4 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                  {isArabic ? value.title.ar : value.title.en}
                </h4>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {isArabic ? value.description.ar : value.description.en}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
