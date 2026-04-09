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
    <section
      id="about-maal-tech"
      className="scroll-mt-28 relative z-10 py-20 md:py-32"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                {strategicKicker}
              </span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <h2 className="text-center text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              {missionVisionHeading}
            </h2>
          </div>
        </AnimatedSection>

        <StaggerContainer className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/50 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950/50">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-zinc-200/80 bg-white/50 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/50">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                ~/manifest.yml
              </div>
              <div className="w-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200/80 dark:divide-zinc-800/80">
              {/* Mission */}
              <StaggerItem>
                <div className="p-8 md:p-12">
                  <div className="mb-6 inline-flex rounded bg-primary-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:bg-primary-500/20 dark:text-primary-400">
                    <FiTarget className="mr-2 inline-block h-3 w-3" />
                    {missionLabel}
                  </div>
                  <p className="text-lg leading-[1.8] text-zinc-700 dark:text-zinc-300 font-medium">
                    {missionBody}
                  </p>
                </div>
              </StaggerItem>

              {/* Vision */}
              <StaggerItem>
                <div className="p-8 md:p-12" dir={isArabic ? 'rtl' : 'ltr'}>
                  <div className="mb-6 inline-flex rounded bg-primary-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:bg-primary-500/20 dark:text-primary-400">
                    <FiHelpCircle className="mr-2 inline-block h-3 w-3" />
                    {visionLabel}
                  </div>
                  <div className="space-y-4 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                    {whyItems.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-primary-500 dark:text-primary-400 mt-1">{`->`}</span>
                        <span className="leading-relaxed">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </div>
            
            {/* Terminal snippet footer */}
            <div className="border-t border-zinc-200/80 bg-zinc-900 p-6 font-mono text-xs dark:border-zinc-800 dark:bg-black">
              <div className="flex flex-wrap items-baseline gap-2 mb-3">
                <span className="text-primary-400">{terminalPrompt}</span>
                <span className="text-zinc-300">{terminalFile}</span>
              </div>
              <p className="text-zinc-400 leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
