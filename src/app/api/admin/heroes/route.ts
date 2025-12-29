import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all heroes (admin)
export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(heroes);
  } catch (error) {
    console.error('Error fetching heroes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch heroes' },
      { status: 500 }
    );
  }
}

// POST create new hero
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, titleEn, titleAr, subtitleEn, subtitleAr,
      descriptionEn, descriptionAr, ctaButtons, active 
    } = body;

    // Validate required fields
    if (!name || !titleEn || !titleAr) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If setting as active, deactivate all others
    if (active) {
      await prisma.hero.updateMany({
        where: { active: true },
        data: { active: false },
      });
    }

    const hero = await prisma.hero.create({
      data: {
        name,
        titleEn,
        titleAr,
        subtitleEn,
        subtitleAr,
        descriptionEn,
        descriptionAr,
        ctaButtons: typeof ctaButtons === 'string' ? ctaButtons : JSON.stringify(ctaButtons || []),
        active: active || false,
      },
    });

    return NextResponse.json(hero, { status: 201 });
  } catch (error) {
    console.error('Error creating hero:', error);
    return NextResponse.json(
      { error: 'Failed to create hero' },
      { status: 500 }
    );
  }
}
