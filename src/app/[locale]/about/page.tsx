import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import { getWhatsAppWaMeUrl } from '@/core/data/publicContact';
import { AboutPortfolioSubnav } from '@/core/components/web/about/AboutPortfolioSubnav';
import { AboutHeroV2 } from '@/core/components/web/about/AboutHeroV2';
import { AboutSplitProfile } from '@/core/components/web/about/AboutSplitProfile';
import { AboutRegionalImpact } from '@/core/components/web/about/AboutRegionalImpact';
import { AboutTechStack } from '@/core/components/web/about/AboutTechStack';
import { AboutDomainExpertise } from '@/core/components/web/about/AboutDomainExpertise';
import { AboutProjectsGraph } from '@/core/components/web/about/AboutProjectsGraph';
import { AboutExperienceBento } from '@/core/components/web/about/AboutExperienceBento';
import { AboutBlogTerminal } from '@/core/components/web/about/AboutBlogTerminal';
import { AboutCommandPalette } from '@/core/components/web/about/AboutCommandPalette';

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

  const t = await getTranslations('web.about');
  const whatsappUrl = getWhatsAppWaMeUrl();

  const subnavItems = [
    { href: '#about-overview', label: t('portfolioNavOverview') },
    { href: '#about-profile', label: t('portfolioNavProfile') },
    { href: '#about-domains', label: t('portfolioNavExpertise') },
    { href: '#about-projects', label: t('portfolioNavProjects') },
    { href: '#about-regional', label: t('v2RegionalHeading') },
    { href: '#about-tech', label: t('v2TechHeading') },
    { href: '#about-experience', label: t('portfolioNavExperience') },
    { href: '#about-blog', label: t('portfolioNavBlog') },
    { href: '#about-connect', label: t('portfolioNavConnect') },
  ];

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.03),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <AboutPortfolioSubnav kicker={t('portfolioNavKicker')} items={subnavItems} isArabic={isArabic} />

      <AboutHeroV2
        isArabic={isArabic}
        labelBusiness={t('v2HeroPerspectiveBusiness')}
        labelEngineering={t('v2HeroPerspectiveEngineering')}
        titleBusiness={t('v2HeroTitleBusiness')}
        subtitleBusiness={t('v2HeroSubtitleBusiness')}
        titleEngineering={t('v2HeroTitleEngineering')}
        subtitleEngineering={t('v2HeroSubtitleEngineering')}
      />

      <AboutSplitProfile
        isArabic={isArabic}
        ideFileLabel={t('v2SplitIdeFile')}
        card1={t('v2SplitCard1')}
        card2={t('v2SplitCard2')}
        card3={t('v2SplitCard3')}
        authorName={t('authorName')}
        authorTitle={t('authorTitle')}
        avatarAlt={t('avatarAlt')}
      />

      <AboutDomainExpertise
        isArabic={isArabic}
        kicker={t('v2DomainKicker')}
        heading={t('v2DomainHeading')}
        domains={[
          {
            id: 'payments',
            title: t('v2DomainPaymentsTitle'),
            description: t('v2DomainPaymentsDesc'),
          },
          {
            id: 'wealth',
            title: t('v2DomainWealthTitle'),
            description: t('v2DomainWealthDesc'),
          },
          {
            id: 'compliance',
            title: t('v2DomainComplianceTitle'),
            description: t('v2DomainComplianceDesc'),
          },
          {
            id: 'crypto',
            title: t('v2DomainCryptoTitle'),
            description: t('v2DomainCryptoDesc'),
          },
        ]}
      />

      <AboutProjectsGraph
        isArabic={isArabic}
        kicker={t('v2ProjectsKicker')}
        heading={t('v2ProjectsHeading')}
        sub={t('v2ProjectsSub')}
        node1={t('v2ProjectNode1')}
        node2={t('v2ProjectNode2')}
        node3={t('v2ProjectNode3')}
      />

      <AboutRegionalImpact
        isArabic={isArabic}
        kicker={t('v2RegionalKicker')}
        heading={t('v2RegionalHeading')}
        sub={t('v2RegionalSub')}
      />

      <AboutTechStack
        isArabic={isArabic}
        kicker={t('v2TechKicker')}
        heading={t('v2TechHeading')}
        sub={t('v2TechSub')}
      />

      <AboutExperienceBento
        isArabic={isArabic}
        kicker={t('v2BentoKicker')}
        heading={t('v2BentoHeading')}
        companiesCaption={t('v2BentoCompaniesCaption')}
        uptimeLabel={t('v2BentoUptime')}
        uptimeValue={t('v2BentoUptimeValue')}
        quote={t('v2BentoQuote')}
      />

      <AboutBlogTerminal
        locale={locale}
        isArabic={isArabic}
        kicker={t('v2BlogKicker')}
        heading={t('v2BlogHeading')}
        command={t('v2BlogCommand')}
        line1={t('v2BlogLine1')}
        line2={t('v2BlogLine2')}
        cta={t('v2BlogCta')}
      />

      <AboutCommandPalette
        locale={locale}
        isArabic={isArabic}
        kicker={t('v2PaletteKicker')}
        heading={t('v2PaletteHeading')}
        placeholder={t('v2PalettePlaceholder')}
        actionMvp={t('v2PaletteActionMvp')}
        actionReview={t('v2PaletteActionReview')}
        actionWhatsApp={t('v2PaletteActionWhatsApp')}
        linkedInLabel={t('v2PaletteLinkedIn')}
        whatsappUrl={whatsappUrl}
      />
    </div>
  );
}
