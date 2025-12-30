import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all updates
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const featured = searchParams.get('featured') === 'true';
    const lang = searchParams.get('lang') || 'en';

    const where: any = {};
    if (featured) {
      where.featured = true;
    }

    const updates = await prisma.update.findMany({
      where,
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
    });

    // Transform to localized format
    const localizedUpdates = updates.map((update) => ({
      id: update.id,
      title: lang === 'ar' ? update.titleAr : update.titleEn,
      description: lang === 'ar' ? update.descriptionAr : update.descriptionEn,
      summary: lang === 'ar' ? update.summaryAr : update.summaryEn,
      icon: update.icon,
      date: update.date.toISOString(),
      publishedAt: update.publishedAt.toISOString(),
      featured: update.featured,
      slug: update.slug,
      featuredImage: update.featuredImage,
      content: update.content,
      source: update.source,
      category: update.category,
      references: update.references,
      pdfUrl: update.pdfUrl,

    }));


    return NextResponse.json(localizedUpdates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    );
  }
}
