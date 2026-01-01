import { NextResponse } from 'next/server';
import { updateService } from '@/services/server/updateService';

// GET all updates
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  const featured = searchParams.get('featured') === 'true';
  const lang = searchParams.get('lang') || 'en';

  try {
    const localizedUpdates = await updateService.getUpdates({
      limit,
      featured,
      lang,
    });


    return NextResponse.json(localizedUpdates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    );
  }
}
