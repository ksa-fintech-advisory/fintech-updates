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
import { AboutPortfolioSubnav } from '@/core/components/web/about/AboutPortfolioSubnav';
import { AboutStatsStrip } from '@/core/components/web/about/AboutStatsStrip';
import { AboutPullQuote } from '@/core/components/web/about/AboutPullQuote';
import { AboutConnectStrip } from '@/core/components/web/about/AboutConnectStrip';

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
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  const [content, t] = await Promise.all([
    aboutUsApiService.getAboutUsContent(locale),
    getTranslations('web.about'),
  ]);

  const statRows = [
    { label: t('statYearsLabel'), value: t('statYears') },
    { label: t('statFocusLabel'), value: t('statFocus') },
    { label: t('statGeoLabel'), value: t('statGeo') },
    { label: t('statModeLabel'), value: t('statMode') },
  ];

  const subnavItems = [
    { href: '#about-overview', label: t('portfolioNavOverview') },
    { href: '#about-profile', label: t('portfolioNavProfile') },
    { href: '#about-expertise', label: t('portfolioNavExpertise') },
    { href: '#about-maal-tech', label: t('portfolioNavPlatform') },
    { href: '#about-methodology', label: t('portfolioNavMethodology') },
    { href: '#about-connect', label: t('portfolioNavConnect') },
  ];

  return (
    <div className="relative w-full bg-[#f5f5f7] selection:bg-primary-500/20 dark:bg-black dark:selection:bg-primary-500/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),transparent_30%)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_32%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <AboutPortfolioSubnav kicker={t('portfolioNavKicker')} items={subnavItems} isArabic={isArabic} />

      <AboutHero
        heroBadge={t('heroBadge')}
        title={t('title')}
        subtitle={t('subtitle')}
        isArabic={isArabic}
        tagArchitecture={t('heroTagArchitecture')}
        tagCompliance={t('heroTagCompliance')}
        tagMarkets={t('heroTagMarkets')}
        practiceLensesCaption={t('heroPracticeLensesCaption')}
      />

      <AboutStatsStrip title={t('statsAtAGlance')} isArabic={isArabic} rows={statRows} />

      <AboutProfileCard
        authorName={t('authorName')}
        authorTitle={t('authorTitle')}
        authorBio={t('authorBio')}
        principleHeading={t('profilePrincipleHeading')}
        principleStatement={t('profilePrincipleStatement')}
        audienceCompanies={t('profileAudienceCompanies')}
        audienceDevelopers={t('profileAudienceDevelopers')}
        avatarAlt={t('avatarAlt')}
        founderBadge={t('founderBadge')}
        signatureLine={t('signatureLine')}
        isArabic={isArabic}
      />

      <AboutPullQuote kicker={t('pullQuoteKicker')} quote={t('profilePrincipleStatement')} isArabic={isArabic} />

      <AboutExpertiseGrid
        content={content}
        isArabic={isArabic}
        expertiseKicker={t('expertiseKicker')}
        expertiseHeading={t('expertiseHeading')}
      />

      <AboutMissionVision
        content={content}
        isArabic={isArabic}
        strategicKicker={t('strategicKicker')}
        missionVisionHeading={t('missionVisionHeading')}
        missionLabel={t('missionLabel')}
        missionBody={t('missionBody')}
        visionLabel={t('visionLabel')}
        whyKnowledge={t('whyKnowledge')}
        whyGuidance={t('whyGuidance')}
        whyEnablement={t('whyEnablement')}
        terminalPrompt={t('terminalPrompt')}
        terminalFile={t('terminalFile')}
      />

      <AboutValuesGrid
        content={content}
        isArabic={isArabic}
        principlesHeading={t('principlesHeading')}
        sectionKicker={t('valuesSectionKicker')}
      />

      <div id="about-connect" className="scroll-mt-28">
        <AboutConnectStrip
          locale={locale}
          isArabic={isArabic}
          kicker={t('connectStripKicker')}
          title={t('connectStripTitle')}
          linkedInLabel={t('connectLinkedIn')}
          contactLabel={t('connectContact')}
          blogLabel={t('connectBlog')}
        />
        <AboutClosingCta
          locale={locale}
          isArabic={isArabic}
          title={t('ctaTitle')}
          subtitle={t('ctaSubtitle')}
          buttonLabel={t('ctaButton')}
        />
      </div>
    </div>
  );
}
