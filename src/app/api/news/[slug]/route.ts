import { NextResponse } from 'next/server';
import { newsUpdates } from '@/services/api/mock/data/news.data';
import { LocalizedNewsUpdate } from '@/core/types/web/news';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const slug = params.slug;
  const update = newsUpdates.find(u => u.slug === slug);

  // Get locale, default to 'ar'
  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale = (lang === 'en' || lang === 'ar') ? lang : 
                 (acceptLanguage?.includes('en') ? 'en' : 'ar');

  if (!update) {
    return NextResponse.json({ error: 'Update not found' }, { status: 404 });
  }

  const localizedUpdate: LocalizedNewsUpdate = {
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
  };

  return NextResponse.json(localizedUpdate);
}
