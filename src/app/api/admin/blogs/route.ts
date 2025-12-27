import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/blogs - List all blogs for admin
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST /api/admin/blogs - Create new blog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      slug,
      titleEn,
      titleAr,
      excerptEn,
      excerptAr,
      contentEn,
      contentAr,
      featuredImage,
      tags,
      categoryId,
      authorId,
      readTime,
      publishedAt,
    } = body;

    // Validate required fields
    if (!slug || !titleEn || !titleAr || !excerptEn || !excerptAr || !categoryId || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: 'Blog with this slug already exists' },
        { status: 409 }
      );
    }

    // Create blog
    const blog = await prisma.blog.create({
      data: {
        slug,
        titleEn,
        titleAr,
        excerptEn,
        excerptAr,
        contentEn: JSON.stringify(contentEn || []),
        contentAr: JSON.stringify(contentAr || []),
        featuredImage: featuredImage || '/images/blogs/default.jpg',
        tags: JSON.stringify(tags || []),
        readTime: readTime || 5,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        relatedPostIds: null,
        authorId,
        categoryId,
      },
      include: {
        author: true,
        category: true,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
