import { aboutUsApiService } from '@/services/api/aboutUsApi';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { FiTarget, FiEye, FiCpu, FiShield, FiBriefcase, FiAward, FiArrowRight, FiArrowLeft, FiCheckSquare } from 'react-icons/fi';

// Keep the 3D element but ensure it fits the new dark theme logic inside the component if possible,
// or we wrap it in a container that blends it well.
const Network3D = dynamic(() => import('@/core/components/web/about/Network3D'), { ssr: false });

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const content = await aboutUsApiService.getAboutUsContent(locale);
  const isArabic = locale === 'ar';

  // Load translations
  const t = await getTranslations('web.about');

  return (
    <div className="w-full bg-zinc-50 dark:bg-black selection:bg-primary-500/30">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Hero Section: The "Firm" Introduction */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">

        {/* 3D Background Wrapper - darker context */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:mix-blend-screen grayscale">
          <Network3D />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">

            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'هوية الشركة' : 'CORPORATE_PROFILE'}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-zinc-900 dark:text-white leading-tight">
                {t('title')}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="pl-6 md:pl-8 border-l-2 border-primary-500 relative">
                <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                  {t('subtitle')}
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Executive Summary (Founder / Team) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 rounded-xl shadow-lg relative overflow-hidden group">

              {/* Abstract decorative line */}
              <div className="absolute top-0 right-0 w-32 h-1 bg-primary-500" />

              <div className="flex flex-col md:flex-row gap-12 items-start">

                {/* Visual Identity / Avatar Placeholder */}
                <div className="shrink-0 relative">
                  <div className="w-40 h-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-6xl font-black text-zinc-300 dark:text-zinc-600">
                    {/* Using the first letter of the name or logo */}
                    {t('authorName').charAt(0)}
                  </div>
                  {/* Badge */}
                  <div className="absolute -bottom-3 -right-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded text-xs font-mono font-bold text-zinc-500">
                    FOUNDER
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
                    {t('authorName')}
                  </h2>
                  {/* Fixed: Wrapped comment-like text in expression */}
                  <p className="text-sm font-mono font-bold text-primary-600 mb-6 uppercase tracking-wider">
                    {'//'} {t('authorTitle')}
                  </p>

                  <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {t('authorBio')}
                    </p>
                  </div>

                  {/* Signature-like element */}
                  <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      {isArabic ? 'الرئيس التنفيذي' : 'EXECUTIVE_OFFICE'}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Strategic Directives (Mission & Vision) */}
      <section className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatedSection className="mb-12">
            <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-2 block">
              {isArabic ? '{//}' + ' التوجه_الاستراتيجي' : '{//}' + ' STRATEGIC_DIRECTIVES'}
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {isArabic ? 'الرؤية والمهمة' : 'Mission & Vision Statement'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Mission Protocol */}
            <StaggerItem>
              <div className="group h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-900 dark:text-white">
                    <FiTarget className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-mono uppercase tracking-wide text-zinc-900 dark:text-white">
                    {isArabic ? 'المهمة' : 'MISSION_PROTOCOL'}
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  {isArabic ? content.mission.ar : content.mission.en}
                </p>
              </div>
            </StaggerItem>

            {/* Vision Protocol */}
            <StaggerItem>
              <div className="group h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-900 dark:text-white">
                    <FiEye className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-mono uppercase tracking-wide text-zinc-900 dark:text-white">
                    {isArabic ? 'الرؤية' : 'VISION_SCOPE'}
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                  {isArabic ? content.vision.ar : content.vision.en}
                </p>
              </div>
            </StaggerItem>

          </StaggerContainer>

          {/* Core Description */}
          <AnimatedSection delay={0.4} className="mt-8">
            <div className="bg-zinc-900 dark:bg-black text-zinc-300 p-8 rounded-lg border border-zinc-800 font-mono text-sm leading-relaxed relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary-600" />
              <p className="relative z-10">
                <span className="text-primary-500 mr-2">$ cat</span>
                description.txt
              </p>
              <p className="mt-4 text-white">
                {isArabic ? content.description.ar : content.description.en}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values (Operating Principles) */}
      <section className="py-24 relative z-10 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatedSection className="mb-16 text-center">
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              {isArabic ? 'قيم العمل' : 'Core Operating Principles'}
            </h3>
            <div className="h-1 w-20 bg-zinc-200 dark:bg-zinc-800 mx-auto" />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.values.map((value, idx) => (
              <StaggerItem key={value.id}>
                <div className="h-full bg-white dark:bg-zinc-900/50 p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-300 group">
                  <div className="text-xs font-mono text-zinc-400 mb-4 block">
                    0{idx + 1}
                  </div>
                  <div className="mb-4 text-zinc-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {/* Assuming value.icon is a string/emoji, we replace it with a generic CheckSquare for cleaner look if needed, or keep it if it's already an icon component */}
                    <FiCheckSquare className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-lg mb-2">
                    {isArabic ? value.title.ar : value.title.en}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isArabic ? value.description.ar : value.description.en}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Expertise Matrix */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900 relative z-10 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-2 block">
                {isArabic ? '{//}' + ' القدرات' : '{//}' + ' CAPABILITIES'}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                {isArabic ? 'مجالات الخبرة' : 'Areas of Expertise'}
              </h3>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.expertise.map((area, idx) => (
              <StaggerItem key={area.id}>
                <div className="group flex items-start gap-6 p-6 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 transition-colors">
                    {/* Mapping generic icons based on index or keeping generic */}
                    {idx === 0 ? <FiBriefcase className="w-5 h-5" /> :
                      idx === 1 ? <FiCpu className="w-5 h-5" /> :
                        idx === 2 ? <FiShield className="w-5 h-5" /> :
                          <FiAward className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 font-mono tracking-tight">
                      {isArabic ? area.title.ar : area.title.en}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {isArabic ? area.description.ar : area.description.en}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Footer CTA - The "Terminal" Command */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="bg-zinc-900 dark:bg-black text-white rounded-xl p-10 md:p-16 text-center border border-zinc-800 shadow-2xl relative overflow-hidden">

            {/* Background decorative code */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none font-mono text-[10px] leading-3 overflow-hidden text-left p-4">
              {Array(20).fill('010101011010010101110101010').join(' ')}
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {isArabic ? 'جاهز للبدء؟' : 'Initialize Partnership'}
              </h3>
              <p className="text-zinc-400 mb-10 text-lg">
                {isArabic
                  ? 'اشترك لتلقي آخر تحديثات التقنية المالية وبناء مستقبلك.'
                  : 'Subscribe to ecosystem updates and start building your fintech infrastructure.'}
              </p>

              <Link
                href={`/${locale}/web/contact`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                <span>{isArabic ? 'تواصل معنا' : 'EXECUTE_CONTACT'}</span>
                {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}