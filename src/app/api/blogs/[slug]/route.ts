import { NextResponse } from 'next/server';
import { getStaticBlogBySlug } from '@/services/blog/staticBlogs';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const { searchParams } = new URL(request.url);

  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale =
    lang === 'en' || lang === 'ar' ? lang : acceptLanguage?.includes('en') ? 'en' : 'ar';

  try {
    const blog = getStaticBlogBySlug(slug, locale);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
