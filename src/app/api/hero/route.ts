import { NextResponse } from 'next/server';
import { heroService } from '@/services/server/heroService';

// GET active hero
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';

  try {
    const localizedHero = await heroService.getHero(lang);

    if (!localizedHero) {
      return NextResponse.json(
        { error: 'No active hero found' },
        { status: 404 }
      );
    }

    return NextResponse.json(localizedHero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero' },
      { status: 500 }
    );
  }
}
