import { NextResponse } from 'next/server';
import { statisticService } from '@/services/server/statisticService';

// GET all active statistics
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';

  try {
    const localizedStatistics = await statisticService.getStatistics(lang);

    return NextResponse.json(localizedStatistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
