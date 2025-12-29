import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET active hero
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';

    const hero = await prisma.hero.findFirst({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!hero) {
      return NextResponse.json(
        { error: 'No active hero found' },
        { status: 404 }
      );
    }

    // Parse CTA buttons
    const ctaButtons = JSON.parse(hero.ctaButtons);

    // Transform to localized format
    const localizedHero = {
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

    return NextResponse.json(localizedHero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero' },
      { status: 500 }
    );
  }
}
