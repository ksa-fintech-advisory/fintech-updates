import { getTranslations } from 'next-intl/server';
import CourseHero from '@/core/components/web/course/CourseHero';
import CourseTimeline from '@/core/components/web/course/CourseTimeline';
import PhaseCard from '@/core/components/web/course/PhaseCard';
import { phasesData } from '@/data/fintechFundamentalsData';
import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiLayers, FiTerminal, FiCpu, FiCheckCircle, FiArrowRight, FiArrowLeft, FiCode } from 'react-icons/fi';

export default async function FintechFundamentalsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  const t = await getTranslations('fintechFundamentals');

  // Helper for translations
  const getPhaseTranslation = (phaseNum: number) => ({
    title: t(`phases.phase${phaseNum}.title`),
    subtitle: t(`phases.phase${phaseNum}.subtitle`),
    description: t(`phases.phase${phaseNum}.description`),
    topicsList: t.raw(`phases.phase${phaseNum}.topicsList`) as string[],
  });

  const viewDetailsText = t('phases.viewDetails');

  return (
    <div className="w-full bg-zinc-50 dark:bg-black min-h-screen selection:bg-primary-500/30">

      {/* Global Background Grid - Engineering Paper Feel */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      <div className="relative z-10">

        {/* Hero Section - Keeping the component but ensuring it fits the theme via props if available, 
            otherwise wrapping it to control context */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
          <CourseHero
            locale={locale}
            translations={{
              title: t('title'),
              subtitle: t('subtitle'),
              description: t('description'),
              hero: {
                badge: t('hero.badge'),
                phases: t('hero.phases'),
                duration: t('hero.duration'),
                language: t('hero.language'),
              },
              cta: {
                enroll: t('cta.enroll'),
                learnMore: t('cta.learnMore'),
                contact: t('cta.contact'),
              },
            }}
          />
        </div>

        {/* Course Overview Section (Specs Sheet) */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-2xl">
                  <span className="text-primary-600 dark:text-primary-400 font-mono text-xs uppercase tracking-widest mb-2 block">
                    {isArabic ? '// نظرة_عامة' : '// SYSTEM_OVERVIEW'}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                    {t('overview.title')}
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-lg text-sm md:text-base leading-relaxed">
                  {t('overview.description')}
                </p>
              </div>
            </AnimatedSection>

            {/* Benefits Grid - Tech Cards style */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Comprehensive */}
              <StaggerItem>
                <div className="group h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-primary-500/50 p-8 rounded-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FiLayers className="w-24 h-24 text-primary-500" />
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <FiLayers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 font-mono">
                    {t('overview.benefits.comprehensive.title')}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t('overview.benefits.comprehensive.description')}
                  </p>
                </div>
              </StaggerItem>

              {/* Card 2: Practical */}
              <StaggerItem>
                <div className="group h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-primary-500/50 p-8 rounded-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FiTerminal className="w-24 h-24 text-primary-500" />
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <FiTerminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 font-mono">
                    {t('overview.benefits.practical.title')}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t('overview.benefits.practical.description')}
                  </p>
                </div>
              </StaggerItem>

              {/* Card 3: Expert */}
              <StaggerItem>
                <div className="group h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-primary-500/50 p-8 rounded-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FiCpu className="w-24 h-24 text-primary-500" />
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <FiCpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 font-mono">
                    {t('overview.benefits.expert.title')}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t('overview.benefits.expert.description')}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Phases Timeline Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
          <CourseTimeline
            locale={locale}
            phasesTitle={t('phases.title')}
            phasesSubtitle={t('phases.subtitle')}
          >
            {phasesData.map((phase, index) => {
              const phaseTranslation = getPhaseTranslation(phase.id);
              return (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  title={phaseTranslation.title}
                  subtitle={phaseTranslation.subtitle}
                  description={phaseTranslation.description}
                  topicsList={phaseTranslation.topicsList}
                  viewDetailsText={viewDetailsText}
                  index={index}
                  isArabic={isArabic}
                  locale={locale}
                />
              );
            })}
          </CourseTimeline>
        </div>

        {/* Instructor / Source Section */}
        <section className="py-24 border-t border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 overflow-hidden">

                {/* Background Tech Pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                  <div className="shrink-0">
                    <div className="w-24 h-24 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                      <FiCode className="w-10 h-10 text-zinc-600 dark:text-zinc-400" />
                    </div>
                  </div>

                  <div className="text-center md:text-start rtl:md:text-right">
                    <span className="text-primary-600 dark:text-primary-400 font-mono text-xs uppercase tracking-wider mb-2 block">
                      {isArabic ? 'بقيادة' : 'LEAD_INSTRUCTOR'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                      {t('instructor.title')}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                      {t('instructor.description')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section - The "Deploy" Bar */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="bg-zinc-900 dark:bg-zinc-900 rounded-2xl border border-zinc-800 p-8 md:p-12 relative overflow-hidden group">

                {/* Subtle Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-48 bg-primary-500/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

                  <div className="max-w-2xl text-center lg:text-start rtl:lg:text-right">
                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                      {t('enrollSection.title')}
                    </h2>
                    <p className="text-zinc-400 mb-8 text-lg">
                      {t('enrollSection.description')}
                    </p>

                    {/* Features List as Tags */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      {(t.raw('enrollSection.features') as string[]).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded border border-zinc-700 text-sm text-zinc-300"
                        >
                          <FiCheckCircle className="w-4 h-4 text-primary-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={`/${locale}/web/courses/fintech-fundamentals/register`}
                      className="group/btn inline-flex items-center gap-3 bg-white text-zinc-900 font-bold py-4 px-8 rounded-lg hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <span>{t('cta.enroll')}</span>
                      {isArabic ? <FiArrowLeft className="group-hover/btn:-translate-x-1 transition-transform" /> : <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />}
                    </Link>
                    <div className="mt-3 text-center text-xs text-zinc-500 font-mono">
                      {isArabic ? 'دفعة محدودة العدد' : 'Limited intake capacity'}
                    </div>
                  </div>

                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
}