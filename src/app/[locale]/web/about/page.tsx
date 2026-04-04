import type { Metadata } from 'next';
import { aboutUsApiService } from '@/services/api/aboutUsApi';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import { AboutHero } from '@/core/components/web/about/AboutHero';
import { AboutProfileCard } from '@/core/components/web/about/AboutProfileCard';
import { AboutMissionVision } from '@/core/components/web/about/AboutMissionVision';
import { AboutValuesGrid } from '@/core/components/web/about/AboutValuesGrid';
import { AboutExpertiseGrid } from '@/core/components/web/about/AboutExpertiseGrid';
import { AboutClosingCta } from '@/core/components/web/about/AboutClosingCta';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'web.about' });
  return buildPageMetadata({
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/web/about',
  });
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  const [content, t] = await Promise.all([
    aboutUsApiService.getAboutUsContent(locale),
    getTranslations('web.about'),
  ]);

  return (
    <div className="w-full bg-zinc-50 selection:bg-primary-500/30 dark:bg-black">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <AboutHero heroBadge={t('heroBadge')} title={t('title')} subtitle={t('subtitle')} />

      <AboutProfileCard
        authorName={t('authorName')}
        authorTitle={t('authorTitle')}
        authorBio={t('authorBio')}
        avatarAlt={t('avatarAlt')}
        founderBadge={t('founderBadge')}
        signatureLine={t('signatureLine')}
      />

      <AboutMissionVision
        content={content}
        isArabic={isArabic}
        strategicKicker={t('strategicKicker')}
        missionVisionHeading={t('missionVisionHeading')}
        missionLabel={t('missionLabel')}
        visionLabel={t('visionLabel')}
        terminalPrompt={t('terminalPrompt')}
        terminalFile={t('terminalFile')}
      />

      <AboutValuesGrid content={content} isArabic={isArabic} principlesHeading={t('principlesHeading')} />

      <AboutExpertiseGrid
        content={content}
        isArabic={isArabic}
        expertiseKicker={t('expertiseKicker')}
        expertiseHeading={t('expertiseHeading')}
      />

      <AboutClosingCta
        locale={locale}
        isArabic={isArabic}
        title={t('ctaTitle')}
        subtitle={t('ctaSubtitle')}
        buttonLabel={t('ctaButton')}
      />
    </div>
  );
}
