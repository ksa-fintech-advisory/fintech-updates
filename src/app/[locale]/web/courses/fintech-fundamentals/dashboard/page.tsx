import LearningProgressDashboard from '@/core/components/web/course/LearningProgressDashboard';
import Link from 'next/link';

export default function DashboardPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  // Demo data - in a real app this would come from user session/database
  const demoProgress = {
    completedPhases: [1, 2, 3, 4],
    currentPhase: 5,
    totalHoursCompleted: 24,
    currentStreak: 7,
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-[120px] opacity-15" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href={`/${locale}/web/courses/fintech-fundamentals`}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <svg className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {isArabic ? 'العودة للدورة' : 'Back to Course'}
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent">
                {isArabic ? 'لوحة التعلم الخاصة بك' : 'Your Learning Dashboard'}
              </span>
            </h1>
            <p className="text-xl text-white/80">
              {isArabic
                ? 'تتبع تقدمك وشاهد إنجازاتك'
                : 'Track your progress and see your achievements'}
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 fill-grey-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Demo Notice */}
            <div className="mb-8 p-4 bg-accent-50 border border-accent-200 rounded-xl text-center">
              <p className="text-accent-800 font-medium">
                {isArabic
                  ? '🎯 هذه نسخة تجريبية - بيانات التقدم للعرض فقط'
                  : '🎯 This is a demo - progress data is for display only'}
              </p>
            </div>

            <LearningProgressDashboard
              locale={locale}
              completedPhases={demoProgress.completedPhases}
              currentPhase={demoProgress.currentPhase}
              totalHoursCompleted={demoProgress.totalHoursCompleted}
              currentStreak={demoProgress.currentStreak}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-grey-900 mb-4">
            {isArabic ? 'لم تسجل بعد؟' : "Haven't enrolled yet?"}
          </h2>
          <p className="text-grey-600 mb-8">
            {isArabic
              ? 'سجل الآن وابدأ رحلة التعلم واكسب شاراتك الأولى'
              : 'Register now to start your learning journey and earn your first badges'}
          </p>
          <Link
            href={`/${locale}/web/courses/fintech-fundamentals/register`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg"
          >
            {isArabic ? 'سجل الآن' : 'Register Now'}
            <svg className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
