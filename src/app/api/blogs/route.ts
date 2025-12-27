import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { LocalizedPaginatedBlogs, LocalizedBlog, LocalizedBlogCategory } from '@/core/types/web/blog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  // Get locale from query param or header, default to 'ar'
  const lang = searchParams.get('lang');
  const acceptLanguage = request.headers.get('accept-language');
  const locale = (lang === 'en' || lang === 'ar') ? lang : 
                 (acceptLanguage?.includes('en') ? 'en' : 'ar');

  try {
    // Build where clause for filtering
    const where: any = {};

    if (category) {
      where.category = {
        slug: category
      };
    }

    if (search) {
      const searchLower = search.toLowerCase();
      where.OR = [
        { titleEn: { contains: searchLower } },
        { titleAr: { contains: searchLower } },
        { excerptEn: { contains: searchLower } },
        { excerptAr: { contains: searchLower } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.blog.count({ where });

    // Fetch blogs with pagination
    const blogs = await prisma.blog.findMany({
      where,
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Fetch all categories
    const categories = await prisma.blogCategory.findMany();

    // Map to localized structure
    const localizedBlogs: LocalizedBlog[] = blogs.map(blog => ({
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
    }));

    const localizedCategories: LocalizedBlogCategory[] = categories.map(cat => ({
      id: cat.id,
      name: locale === 'en' ? cat.name : cat.nameAr,
      slug: cat.slug,
      color: cat.color,
      icon: cat.icon,
    }));

    const totalPages = Math.ceil(total / limit);

    const response: LocalizedPaginatedBlogs = {
      blogs: localizedBlogs,
      total,
      page,
      limit,
      totalPages,
      categories: localizedCategories,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
