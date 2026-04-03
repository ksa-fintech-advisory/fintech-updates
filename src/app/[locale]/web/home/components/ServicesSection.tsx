'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiTool, FiLayers, FiUsers } from 'react-icons/fi';

const SERVICE_IDS = ['consulting', 'architecture', 'mentorship'] as const;

const SERVICE_ICONS = {
  consulting: FiTool,
  architecture: FiLayers,
  mentorship: FiUsers,
} as const;

export default function ServicesSection() {
  const t = useTranslations('web.home.services');

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 block">
                {t('kicker')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {t('title')}
              </h2>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_IDS.map((id) => {
            const Icon = SERVICE_ICONS[id];
            return (
              <StaggerItem key={id} className="h-full">
                <article className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col transition-all duration-300 relative overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600">
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white w-fit mb-6">
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                    {t(`items.${id}.title`)}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    {t(`items.${id}.description`)}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-transparent dark:from-zinc-800/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
