import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { LocalizedBlog } from '@/core/types/web/blog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const slug = params.slug;

  // Get locale from query param or header, default to 'ar'
  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale = (lang === 'en' || lang === 'ar') ? lang : 
                 (acceptLanguage?.includes('en') ? 'en' : 'ar');

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const localizedBlog: LocalizedBlog = {
      id: blog.id,
      slug: blog.slug,
      title: locale === 'en' ? blog.titleEn : blog.titleAr,
      excerpt: locale === 'en' ? blog.excerptEn : blog.excerptAr,
      content: JSON.parse(locale === 'en' ? blog.contentEn : blog.contentAr),
      featuredImage: blog.featuredImage,
      category: {
        id: blog.category.id,
        name: locale === 'en' ? blog.category.name : blog.category.nameAr,
        slug: blog.category.slug,
        color: blog.category.color,
        icon: blog.category.icon,
      },
      tags: JSON.parse(blog.tags),
      author: {
        id: blog.author.id,
        name: locale === 'en' ? blog.author.name : (blog.author.nameAr || blog.author.name),
        bio: locale === 'en' ? (blog.author.bio || undefined) : (blog.author.bioAr || undefined),
        role: locale === 'en' ? (blog.author.role || undefined) : (blog.author.roleAr || undefined),
        avatar: blog.author.avatar || undefined,
      },
      publishedAt: blog.publishedAt.toISOString(),
      readTime: blog.readTime,
      relatedPosts: [], // We'll handle related posts separately if needed
    };

    return NextResponse.json(localizedBlog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
