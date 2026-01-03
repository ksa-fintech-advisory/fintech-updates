import { NextResponse } from 'next/server';
import { getAllCourses, getFeaturedCourses, getAvailableCourses } from '@/data/courseData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  
  let courses;
  
  switch (filter) {
    case 'featured':
      courses = getFeaturedCourses();
      break;
    case 'available':
      courses = getAvailableCourses();
      break;
    default:
      courses = getAllCourses();
  }
  
  return NextResponse.json({
    success: true,
    data: courses,
    count: courses.length,
  });
}
