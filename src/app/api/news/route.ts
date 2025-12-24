import { NextResponse } from 'next/server';
import { newsUpdates } from '@/services/api/mock/data/news.data';
import { LocalizedPaginatedNewsUpdates, LocalizedNewsUpdate, NewsCategory } from '@/core/types/web/news';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category') as NewsCategory | null;
  const search = searchParams.get('search');
  
  // Get locale, default to 'ar'
  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale = (lang === 'en' || lang === 'ar') ? lang : 
                 (acceptLanguage?.includes('en') ? 'en' : 'ar');

  let filteredUpdates = [...newsUpdates];

  // Apply category filter
  if (category) {
    filteredUpdates = filteredUpdates.filter(
      update => update.category === category
    );
  }

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredUpdates = filteredUpdates.filter(update =>
      update.title.en.toLowerCase().includes(searchLower) ||
      update.title.ar.toLowerCase().includes(searchLower) ||
      update.summary.en.toLowerCase().includes(searchLower) ||
      update.summary.ar.toLowerCase().includes(searchLower)
    );
  }

  // Sort by date (newest first)
  filteredUpdates.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const total = filteredUpdates.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  // Map to localized structure
  const localizedUpdates: LocalizedNewsUpdate[] = filteredUpdates.slice(start, end).map(update => ({
    id: update.id,
    slug: update.slug,
    title: update.title[locale],
    summary: update.summary[locale],
    content: update.content[locale],
    date: update.date,
    category: update.category,
    source: update.source ? update.source[locale] : undefined,
    pdfUrl: update.pdfUrl,
    isImportant: update.isImportant,
  }));

  const response: LocalizedPaginatedNewsUpdates = {
    updates: localizedUpdates,
    total,
    page,
    limit,
    totalPages,
  };

  return NextResponse.json(response);
}
