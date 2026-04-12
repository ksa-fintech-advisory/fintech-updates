import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiHelpCircle, FiTarget } from 'react-icons/fi';

type Props = {
  content: AboutUsContent;
  isArabic: boolean;
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
      className="scroll-mt-28 relative z-10 py-20 md:py-32 bg-zinc-950 text-zinc-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.03),transparent)]" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className=" text-[10px] font-bold uppercase tracking-[0.2em] text-primary-400">
              </span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>
            <h2 className="text-center text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
              {missionVisionHeading}
            </h2>
          </div>
        </AnimatedSection>

        <StaggerContainer className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-black/40 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              </div>
              <div className=" text-[10px] uppercase tracking-widest text-zinc-500">
                ~/manifest.yml
              </div>
              <div className="w-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
              {/* Mission */}
              <StaggerItem>
                <div className="p-8 md:p-12">
                  <div className="mb-6 inline-flex rounded bg-primary-500/20 px-3 py-1  text-[10px] font-bold uppercase tracking-widest text-primary-400">
                    <FiTarget className="mr-2 inline-block h-3 w-3" />
                    {missionLabel}
                  </div>
                  <p className="text-lg leading-[1.8] text-zinc-300 font-medium">
                    {missionBody}
                  </p>
                </div>
              </StaggerItem>

              {/* Vision */}
              <StaggerItem>
                <div className="p-8 md:p-12" dir={isArabic ? 'rtl' : 'ltr'}>
                  <div className="mb-6 inline-flex rounded bg-primary-500/20 px-3 py-1  text-[10px] font-bold uppercase tracking-widest text-primary-400">
                    <FiHelpCircle className="mr-2 inline-block h-3 w-3" />
                    {visionLabel}
                  </div>
                  <div className="space-y-4  text-sm text-zinc-400">
                    {whyItems.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-primary-400 mt-1">{`->`}</span>
                        <span className="leading-relaxed">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </div>
            
            {/* Terminal snippet footer */}
            <div className="border-t border-zinc-800 bg-black p-6  text-xs">
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
