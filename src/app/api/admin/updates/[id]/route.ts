import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single update by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const update = await prisma.update.findUnique({
      where: { id: params.id },
    });

    if (!update) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(update);
  } catch (error) {
    console.error('Error fetching update:', error);
    return NextResponse.json(
      { error: 'Failed to fetch update' },
      { status: 500 }
    );
  }
}

// PUT update existing update
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      titleEn,
      titleAr,
      descriptionEn,
      descriptionAr,
      icon,
      date,
      publishedAt,
      featured,
      slug,
    } = body;

    // Check if update exists
    const existingUpdate = await prisma.update.findUnique({
      where: { id: params.id },
    });

    if (!existingUpdate) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }

    // If slug is being changed, check if new slug already exists
    if (slug && slug !== existingUpdate.slug) {
      const slugExists = await prisma.update.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Update with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const update = await prisma.update.update({
      where: { id: params.id },
      data: {
        ...(titleEn && { titleEn }),
        ...(titleAr && { titleAr }),
        ...(descriptionEn && { descriptionEn }),
        ...(descriptionAr && { descriptionAr }),
        ...(icon && { icon }),
        ...(date && { date: new Date(date) }),
        ...(publishedAt && { publishedAt: new Date(publishedAt) }),
        ...(featured !== undefined && { featured }),
        ...(slug && { slug }),
      },
    });

    return NextResponse.json(update);
  } catch (error) {
    console.error('Error updating update:', error);
    return NextResponse.json(
      { error: 'Failed to update update' },
      { status: 500 }
    );
  }
}

// DELETE update
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if update exists
    const update = await prisma.update.findUnique({
      where: { id: params.id },
    });

    if (!update) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }

    await prisma.update.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Update deleted successfully' });
  } catch (error) {
    console.error('Error deleting update:', error);
    return NextResponse.json(
      { error: 'Failed to delete update' },
      { status: 500 }
    );
  }
}
