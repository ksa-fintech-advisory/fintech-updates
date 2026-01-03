import { NextRequest, NextResponse } from 'next/server';
import { courseData, getSessionById } from '@/data/courseData';

// GET /api/courses/session?id=1 - Get specific session data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const sessionId = parseInt(id, 10);
    const session = getSessionById(sessionId);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Invalid session ID' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        courseInfo: courseData.courseInfo,
        session,
        keyTerms: courseData.keyTerms,
        importantLinks: courseData.importantLinks,
      },
    });
  } catch (error) {
    console.error('Error fetching session data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch session data' },
      { status: 500 }
    );
  }
}
