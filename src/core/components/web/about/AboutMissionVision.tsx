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
    <section className="relative z-10 border-t border-zinc-200/80 bg-zinc-50/80 py-20 dark:border-zinc-800 dark:bg-zinc-900/45 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,theme(colors.white/40)_50%,transparent)] dark:bg-[linear-gradient(to_bottom,transparent,theme(colors.zinc.950/20)_50%,transparent)]" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 md:mb-14">
          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            {strategicKicker}
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
            {missionVisionHeading}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-primary-500/40" />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <StaggerItem>
            <div className="press-scale group h-full rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary-500/35 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary-500/30 md:p-8">
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
              className="press-scale group h-full rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary-500/35 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary-500/30 md:p-8"
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

        <AnimatedSection delay={0.4} className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950 p-7 font-mono text-sm leading-relaxed text-zinc-300 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] dark:border-zinc-800 dark:bg-black md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-70" />
            <div className="absolute start-0 top-0 h-full w-1 bg-gradient-to-b from-primary-500 to-primary-700" />
            <p className="relative z-10 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="shrink-0 text-primary-400">{terminalPrompt}</span>
              <span className="text-zinc-100">{terminalFile}</span>
            </p>
            <p className="relative z-10 mt-5 max-w-3xl font-sans text-base font-normal leading-relaxed tracking-normal text-zinc-200/95">
              {description}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
