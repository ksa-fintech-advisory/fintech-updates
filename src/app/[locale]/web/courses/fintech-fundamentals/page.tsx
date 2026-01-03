import { getTranslations } from 'next-intl/server';
import CourseHero from '@/core/components/web/course/CourseHero';
import CourseTimeline from '@/core/components/web/course/CourseTimeline';
import PhaseCard from '@/core/components/web/course/PhaseCard';
import BadgesShowcase from '@/core/components/web/course/BadgesShowcase';
import { phasesData } from '@/data/fintechFundamentalsData';
import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';

export default async function FintechFundamentalsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  const t = await getTranslations('fintechFundamentals');

  // Get phase translations
  const getPhaseTranslation = (phaseNum: number) => ({
    title: t(`phases.phase${phaseNum}.title`),
    subtitle: t(`phases.phase${phaseNum}.subtitle`),
    description: t(`phases.phase${phaseNum}.description`),
    topicsList: t.raw(`phases.phase${phaseNum}.topicsList`) as string[],
  });

  const viewDetailsText = t('phases.viewDetails');

  return (
    <div className="w-full">
      {/* Hero Section */}
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

      {/* Course Overview Section */}
      <section className="py-20 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
              {t('overview.title')}
            </h2>
            <p className="text-xl text-grey-600 max-w-3xl mx-auto">
              {t('overview.description')}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full mt-6" />
          </AnimatedSection>

          {/* Benefits Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  📚
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {t('overview.benefits.comprehensive.title')}
                </h3>
                <p className="text-grey-600">
                  {t('overview.benefits.comprehensive.description')}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 mx-auto bg-accent-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  💡
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {t('overview.benefits.practical.title')}
                </h3>
                <p className="text-grey-600">
                  {t('overview.benefits.practical.description')}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  🎓
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {t('overview.benefits.expert.title')}
                </h3>
                <p className="text-grey-600">
                  {t('overview.benefits.expert.description')}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Phases Timeline Section */}
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

      {/* Skill Badges & Certificates */}
      {/* <BadgesShowcase locale={locale} /> */}

      {/* About the Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-grey-50 to-grey-100 rounded-3xl p-10 md:p-14 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-100 rounded-full blur-3xl opacity-30" />
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-4xl text-white mb-8 shadow-lg">
                  🎯
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-6">
                  {t('instructor.title')}
                </h2>
                <p className="text-lg text-grey-600 leading-relaxed">
                  {t('instructor.description')}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA / Enrollment Section */}
      <section className="py-20 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500 rounded-full blur-[100px] opacity-20" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-[80px] opacity-20" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {t('enrollSection.title')}
                </h2>
                <p className="text-xl text-primary-100 mb-10">
                  {t('enrollSection.description')}
                </p>

                {/* Features List */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  {(t.raw('enrollSection.features') as string[]).map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20"
                    >
                      <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${locale}/web/courses/fintech-fundamentals/register`}
                  className="inline-flex items-center gap-2 bg-white text-primary-900 font-bold py-4 px-10 rounded-xl hover:bg-accent-50 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  {t('cta.enroll')}
                  <svg
                    className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
