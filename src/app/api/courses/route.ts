import { NextResponse } from 'next/server';
import { courseData } from '@/data/courseData';

// GET /api/courses - Get all course data
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: courseData,
    });
  } catch (error) {
    console.error('Error fetching course data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course data' },
      { status: 500 }
    );
  }
}
