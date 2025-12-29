import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single statistic by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const statistic = await prisma.statistic.findUnique({
      where: { id: params.id },
    });

    if (!statistic) {
      return NextResponse.json(
        { error: 'Statistic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Error fetching statistic:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistic' },
      { status: 500 }
    );
  }
}

// PUT update existing statistic
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { value, labelEn, labelAr, icon, order, active } = body;

    // Check if statistic exists
    const existingStatistic = await prisma.statistic.findUnique({
      where: { id: params.id },
    });

    if (!existingStatistic) {
      return NextResponse.json(
        { error: 'Statistic not found' },
        { status: 404 }
      );
    }

    const statistic = await prisma.statistic.update({
      where: { id: params.id },
      data: {
        ...(value && { value }),
        ...(labelEn && { labelEn }),
        ...(labelAr && { labelAr }),
        ...(icon && { icon }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Error updating statistic:', error);
    return NextResponse.json(
      { error: 'Failed to update statistic' },
      { status: 500 }
    );
  }
}

// DELETE statistic
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if statistic exists
    const statistic = await prisma.statistic.findUnique({
      where: { id: params.id },
    });

    if (!statistic) {
      return NextResponse.json(
        { error: 'Statistic not found' },
        { status: 404 }
      );
    }

    await prisma.statistic.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Statistic deleted successfully' });
  } catch (error) {
    console.error('Error deleting statistic:', error);
    return NextResponse.json(
      { error: 'Failed to delete statistic' },
      { status: 500 }
    );
  }
}
