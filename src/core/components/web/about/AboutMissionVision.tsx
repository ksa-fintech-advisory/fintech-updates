import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiTarget, FiEye } from 'react-icons/fi';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  strategicKicker: string;
  missionVisionHeading: string;
  missionLabel: string;
  visionLabel: string;
  terminalPrompt: string;
  terminalFile: string;
};

export function AboutMissionVision({
  content,
  isArabic,
  strategicKicker,
  missionVisionHeading,
  missionLabel,
  visionLabel,
  terminalPrompt,
  terminalFile,
}: Props) {
  const mission = isArabic ? content.mission.ar : content.mission.en;
  const vision = isArabic ? content.vision.ar : content.vision.en;
  const description = isArabic ? content.description.ar : content.description.en;

  return (
    <section className="relative z-10 border-t border-zinc-200 bg-zinc-50/50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {strategicKicker}
          </span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{missionVisionHeading}</h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <StaggerItem>
            <div className="group h-full rounded-lg border border-zinc-200 bg-white p-8 transition-all duration-300 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded bg-zinc-100 p-2 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                  <FiTarget className="h-5 w-5" />
                </div>
                <h3 className="font-mono text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                  {missionLabel}
                </h3>
              </div>
              <p className="border-s-2 border-zinc-200 ps-4 text-base leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                {mission}
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="group h-full rounded-lg border border-zinc-200 bg-white p-8 transition-all duration-300 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded bg-zinc-100 p-2 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                  <FiEye className="h-5 w-5" />
                </div>
                <h3 className="font-mono text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                  {visionLabel}
                </h3>
              </div>
              <p className="border-s-2 border-zinc-200 ps-4 text-base leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                {vision}
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-8">
          <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 p-8 font-mono text-sm leading-relaxed text-zinc-300 dark:bg-black">
            <div className="absolute start-0 top-0 h-full w-1 bg-primary-600" />
            <p className="relative z-10">
              <span className="me-2 text-primary-500">{terminalPrompt}</span>
              {terminalFile}
            </p>
            <p className="relative z-10 mt-4 text-white">{description}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
