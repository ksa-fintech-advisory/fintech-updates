import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiClock, FiGlobe, FiLayers, FiShield } from 'react-icons/fi';

const STAT_ICONS = [FiClock, FiLayers, FiGlobe, FiShield] as const;

type Row = { label: string; value: string };

type Props = {
  title: string;
  isArabic: boolean;
  rows: Row[];
};

export function AboutStatsStrip({ title, isArabic, rows }: Props) {
  return (
    <section
      className="relative z-10 border-y border-zinc-200/50 bg-zinc-50/50 py-12 dark:border-zinc-800/50 dark:bg-zinc-900/20"
      aria-label={title}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-12">
              {rows.map((row, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <div key={row.label} className="group">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm ring-1 ring-zinc-200/50 transition-colors group-hover:text-primary-600 dark:bg-zinc-900 dark:text-zinc-500 dark:ring-zinc-800/50 dark:group-hover:text-primary-400">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="mb-1  text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                        {row.label}
                      </p>
                      <p className="text-sm font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
                        {row.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
