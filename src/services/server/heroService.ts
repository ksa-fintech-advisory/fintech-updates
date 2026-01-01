import prisma from '@/lib/prisma';

export const heroService = {
  async getHero(lang: string = 'en') {
    const hero = await prisma.hero.findFirst({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!hero) {
      return null;
    }

    // Parse CTA buttons
    const ctaButtons = JSON.parse(hero.ctaButtons);

    // Transform to localized format
    return {
      id: hero.id,
      title: lang === 'ar' ? hero.titleAr : hero.titleEn,
      subtitle: lang === 'ar' ? hero.subtitleAr : hero.subtitleEn,
      description: lang === 'ar' ? hero.descriptionAr : hero.descriptionEn,
      ctaButtons: ctaButtons.map((btn: any) => ({
        label: lang === 'ar' ? btn.labelAr : btn.labelEn,
        href: btn.href,
        variant: btn.variant,
      })),
    };
  },
};
