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
    <section className="relative z-10 border-t border-zinc-200/80 bg-white/75 py-14 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/35 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,theme(colors.primary.500/6),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,theme(colors.primary.500/8),transparent)]" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 md:mb-14">
          <div className="text-center md:text-start">
            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              {sectionKicker}
            </span>
            <h3 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              {principlesHeading}
            </h3>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary-500/40 md:mx-0" />
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {content.values.map((value, idx) => {
            const ValueIcon = ABOUT_VALUE_ICONS[value.iconKey];
            return (
              <StaggerItem key={value.id}>
                <div className="apple-card group relative h-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="pointer-events-none absolute -end-8 -top-8 h-24 w-24 rounded-full bg-primary-500/[0.06] blur-2xl transition-opacity group-hover:opacity-100 dark:bg-primary-400/10" />
                  <div className="relative mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 transition-colors group-hover:bg-primary-500/[0.18] dark:text-primary-400">
                      <ValueIcon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="font-mono text-[11px] font-bold tabular-nums text-zinc-400 dark:text-zinc-600">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="relative mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                    {isArabic ? value.title.ar : value.title.en}
                  </h4>
                  <p className="relative text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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
