import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all updates (admin)
export async function GET() {
  try {
    const updates = await prisma.update.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    );
  }
}

// POST create new update
export async function POST(request: Request) {
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

    // Validate required fields
    if (!titleEn || !titleAr || !descriptionEn || !descriptionAr || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingUpdate = await prisma.update.findUnique({
      where: { slug },
    });

    if (existingUpdate) {
      return NextResponse.json(
        { error: 'Update with this slug already exists' },
        { status: 409 }
      );
    }

    const update = await prisma.update.create({
      data: {
        titleEn,
        titleAr,
        descriptionEn,
        descriptionAr,
        icon: icon || '📰',
        date: new Date(date),
        publishedAt: new Date(publishedAt || date),
        featured: featured || false,
        slug,
      } as any,
    });

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error('Error creating update:', error);
    return NextResponse.json(
      { error: 'Failed to create update' },
      { status: 500 }
    );
  }
}
