import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single hero by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const hero = await prisma.hero.findUnique({
      where: { id: params.id },
    });

    if (!hero) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero' },
      { status: 500 }
    );
  }
}

// PUT update existing hero
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { 
      name, titleEn, titleAr, subtitleEn, subtitleAr,
      descriptionEn, descriptionAr, ctaButtons, active 
    } = body;

    // Check if hero exists
    const existingHero = await prisma.hero.findUnique({
      where: { id: params.id },
    });

    if (!existingHero) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      );
    }

    // If setting as active, deactivate all others
    if (active && !existingHero.active) {
      await prisma.hero.updateMany({
        where: { active: true },
        data: { active: false },
      });
    }

    const hero = await prisma.hero.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(titleEn && { titleEn }),
        ...(titleAr && { titleAr }),
        ...(subtitleEn && { subtitleEn }),
        ...(subtitleAr && { subtitleAr }),
        ...(descriptionEn && { descriptionEn }),
        ...(descriptionAr && { descriptionAr }),
        ...(ctaButtons && { 
          ctaButtons: typeof ctaButtons === 'string' ? ctaButtons : JSON.stringify(ctaButtons) 
        }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error updating hero:', error);
    return NextResponse.json(
      { error: 'Failed to update hero' },
      { status: 500 }
    );
  }
}

// DELETE hero
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const hero = await prisma.hero.findUnique({
      where: { id: params.id },
    });

    if (!hero) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      );
    }

    await prisma.hero.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Hero deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero:', error);
    return NextResponse.json(
      { error: 'Failed to delete hero' },
      { status: 500 }
    );
  }
}
