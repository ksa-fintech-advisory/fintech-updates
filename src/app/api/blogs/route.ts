import { NextResponse } from 'next/server';
import type { LocalizedPaginatedBlogs } from '@/core/types/web/blog';
import { paginateStaticBlogs } from '@/services/blog/staticBlogs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale =
    lang === 'en' || lang === 'ar' ? lang : acceptLanguage?.includes('en') ? 'en' : 'ar';

  try {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : 12;

    const filters = {
      ...(category ? { category } : {}),
      ...(search ? { search } : {}),
    };

    const response: LocalizedPaginatedBlogs = paginateStaticBlogs(
      safePage,
      safeLimit,
      Object.keys(filters).length ? filters : undefined,
      locale,
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
