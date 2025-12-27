import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/blogs/[id] - Get single blog for editing
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        author: true,
        category: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Parse JSON fields for editing
    const blogWithParsedContent = {
      ...blog,
      contentEn: JSON.parse(blog.contentEn),
      contentAr: JSON.parse(blog.contentAr),
      tags: JSON.parse(blog.tags),
    };

    return NextResponse.json(blogWithParsedContent);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT /api/admin/blogs/[id] - Update existing blog
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // If slug is being changed, check if new slug is available
    if (slug && slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Blog with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update blog
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        ...(slug && { slug }),
        ...(titleEn && { titleEn }),
        ...(titleAr && { titleAr }),
        ...(excerptEn && { excerptEn }),
        ...(excerptAr && { excerptAr }),
        ...(contentEn && { contentEn: JSON.stringify(contentEn) }),
        ...(contentAr && { contentAr: JSON.stringify(contentAr) }),
        ...(featuredImage && { featuredImage }),
        ...(tags && { tags: JSON.stringify(tags) }),
        ...(categoryId && { categoryId }),
        ...(authorId && { authorId }),
        ...(readTime !== undefined && { readTime }),
        ...(publishedAt && { publishedAt: new Date(publishedAt) }),
      },
      include: {
        author: true,
        category: true,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE /api/admin/blogs/[id] - Delete blog
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete blog
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
