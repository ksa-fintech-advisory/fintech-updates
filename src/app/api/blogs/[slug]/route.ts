import { NextResponse } from 'next/server';
import { blogs } from '@/services/api/mock/data/blogs.data';
import { LocalizedBlog } from '@/core/types/web/blog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const slug = params.slug;
  const blog = blogs.find(b => b.slug === slug);

  // Get locale from query param or header, default to 'ar'
  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale = (lang === 'en' || lang === 'ar') ? lang : 
                 (acceptLanguage?.includes('en') ? 'en' : 'ar');

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }


  const mapToLocalized = (b: typeof blogs[0], isRelated = false): LocalizedBlog => ({
    id: b.id,
    slug: b.slug,
    title: b.title[locale],
    excerpt: b.excerpt[locale],
    content: b.content[locale],
    featuredImage: b.featuredImage,
    category: {
      id: b.category.id,
      name: b.category.name[locale],
      slug: b.category.slug,
      color: b.category.color,
      icon: b.category.icon,
    },
    tags: b.tags,
    author: {
      id: b.author.id,
      name: b.author.name?.[locale],
      bio: b.author.bio?.[locale],
      role: b.author.role?.[locale],
      avatar: b.author.avatar,
    },
    publishedAt: b.publishedAt,
    readTime: b.readTime,
    relatedPosts: isRelated
      ? []
      : (b.relatedPosts || [])
          .map(id => blogs.find(bg => bg.id === id))
          .filter((bg): bg is typeof blogs[0] => !!bg)
          .map(bg => mapToLocalized(bg, true)),
  });

  const localizedBlog = mapToLocalized(blog);

  return NextResponse.json(localizedBlog);
}
