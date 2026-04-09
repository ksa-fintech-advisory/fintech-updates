import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiHelpCircle, FiTarget } from 'react-icons/fi';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
  strategicKicker: string;
  missionVisionHeading: string;
  missionLabel: string;
  missionBody: string;
  visionLabel: string;
  whyKnowledge: string;
  whyGuidance: string;
  whyEnablement: string;
  terminalPrompt: string;
  terminalFile: string;
};

export function AboutMissionVision({
  content,
  isArabic,
  strategicKicker,
  missionVisionHeading,
  missionLabel,
  missionBody,
  visionLabel,
  whyKnowledge,
  whyGuidance,
  whyEnablement,
  terminalPrompt,
  terminalFile,
}: Props) {
  const description = isArabic ? content.description.ar : content.description.en;
  const whyItems = [whyKnowledge, whyGuidance, whyEnablement];

  return (
    <section className="relative z-10 border-t border-zinc-200 bg-zinc-50/50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {strategicKicker}
          </span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{missionVisionHeading}</h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <StaggerItem>
            <div className="press-scale group h-full rounded-xl border border-zinc-200 bg-white p-7 transition-all duration-300 hover:border-primary-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary-500/30 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  <FiTarget className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {missionLabel}
                </h3>
              </div>
              <p className="border-s-2 border-primary-500/30 ps-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {missionBody}
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div
              className="press-scale group h-full rounded-xl border border-zinc-200 bg-white p-7 transition-all duration-300 hover:border-primary-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary-500/30 md:p-8"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  <FiHelpCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {visionLabel}
                </h3>
              </div>
              <ul className="space-y-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {whyItems.map((line, idx) => (
                  <li key={idx} className="border-s-2 border-primary-500/30 ps-4">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-6">
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-7 font-mono text-sm leading-relaxed text-zinc-300 dark:bg-black md:p-8">
            <div className="absolute start-0 top-0 h-full w-1 bg-primary-600" />
            <p className="relative z-10">
              <span className="me-2 text-primary-500">{terminalPrompt}</span>
              {terminalFile}
            </p>
            <p className="relative z-10 mt-4 text-white/90">{description}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
