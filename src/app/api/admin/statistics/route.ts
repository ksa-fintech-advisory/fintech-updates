import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all statistics (admin)
export async function GET() {
  try {
    const statistics = await prisma.statistic.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

// POST create new statistic
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { value, labelEn, labelAr, icon, order, active } = body;

    // Validate required fields
    if (!value || !labelEn || !labelAr) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const statistic = await prisma.statistic.create({
      data: {
        value,
        labelEn,
        labelAr,
        icon: icon || '📊',
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(statistic, { status: 201 });
  } catch (error) {
    console.error('Error creating statistic:', error);
    return NextResponse.json(
      { error: 'Failed to create statistic' },
      { status: 500 }
    );
  }
}
