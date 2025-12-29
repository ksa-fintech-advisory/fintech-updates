import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all active statistics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';

    const statistics = await prisma.statistic.findMany({
      where: {
        active: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Transform to localized format
    const localizedStatistics = statistics.map((stat) => ({
      id: stat.id,
      value: stat.value,
      label: lang === 'ar' ? stat.labelAr : stat.labelEn,
      icon: stat.icon,
      order: stat.order,
    }));

    return NextResponse.json(localizedStatistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
