import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single update by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';

    const update = await prisma.update.findUnique({
      where: { slug: params.slug },
    });

    if (!update) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }

    // Transform to localized format
    const localizedUpdate = {
      id: update.id,
      title: lang === 'ar' ? update.titleAr : update.titleEn,
      description: lang === 'ar' ? update.descriptionAr : update.descriptionEn,
      icon: update.icon,
      date: update.date.toISOString(),
      publishedAt: update.publishedAt.toISOString(),
      featured: update.featured,
      slug: update.slug,
    };

    return NextResponse.json(localizedUpdate);
  } catch (error) {
    console.error('Error fetching update:', error);
    return NextResponse.json(
      { error: 'Failed to fetch update' },
      { status: 500 }
    );
  }
}
