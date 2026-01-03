import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { phasesData } from '@/data/fintechFundamentalsData';
import { getSessionById, type Session } from '@/data/courseData';

// Define gradient colors as CSS for each phase (matching PhaseCard)
const phaseGradients: Record<number, { from: string; to: string }> = {
  1: { from: '#10b981', to: '#0d9488' }, // emerald-500 to teal-600
  2: { from: '#f59e0b', to: '#ea580c' }, // amber-500 to orange-600
  3: { from: '#3b82f6', to: '#4f46e5' }, // blue-500 to indigo-600
  4: { from: '#8b5cf6', to: '#9333ea' }, // violet-500 to purple-600
};

export default async function SessionDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  const sessionId = parseInt(id, 10);
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  // Validate session ID
  if (isNaN(sessionId) || sessionId < 1 || sessionId > 4) {
    notFound();
  }

  const t = await getTranslations('fintechFundamentals');
  const session = getSessionById(sessionId);
  const phase = phasesData[sessionId - 1];

  if (!session || !phase) {
    notFound();
  }

  const gradientColors = phaseGradients[sessionId] || { from: '#6366f1', to: '#8b5cf6' };
  const gradientStyle = {
    background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
  };

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={gradientStyle}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href={`/${locale}/web/courses/fintech-fundamentals`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <span className={`inline-block ${isArabic ? 'transform rotate-180' : ''}`}>←</span>
            <span>{isArabic ? 'العودة للدورة' : 'Back to Course'}</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl">
              {phase.icon}
            </div>
            <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {sessionId}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {session.title[lang]}
          </h1>

          {/* Objectives */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {isArabic ? 'أهداف الجلسة' : 'Session Objectives'}
            </h2>
            <ul className="space-y-2">
              {session.objectives[lang].map((objective, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/90">
                  <span className="text-lg">✓</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-grey-900 mb-8 text-center">
            {isArabic ? 'محتوى الجلسة' : 'Session Content'}
          </h2>

          <div className="space-y-8">
            {session.topics.map((topic, topicIdx) => (
              <div
                key={topicIdx}
                className="bg-white rounded-3xl shadow-soft overflow-hidden"
              >
                {/* Topic Header */}
                <div className="p-6" style={gradientStyle}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                      {topicIdx + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {topic.title[lang]}
                    </h3>
                  </div>
                </div>

                {/* Subtopics */}
                <div className="p-6 md:p-8">
                  <div className="grid gap-6">
                    {topic.subtopics.map((subtopic, subIdx) => (
                      <div
                        key={subIdx}
                        className={`${phase.bgColor} rounded-2xl p-5 border ${phase.borderColor}`}
                      >
                        <h4 className="text-lg font-semibold text-grey-900 mb-3 flex items-center gap-2">
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: gradientColors.from }}
                          />
                          {subtopic.title[lang]}
                        </h4>
                        <ul className={`space-y-2 ${isArabic ? 'pr-4' : 'pl-4'}`}>
                          {subtopic.details[lang].map((detail, detailIdx) => (
                            <li
                              key={detailIdx}
                              className="text-grey-700 flex items-start gap-2"
                            >
                              <span className="text-grey-400 mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-grey-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-grey-900 mb-8 text-center">
            {isArabic ? 'المصادر والروابط' : 'Resources & Links'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-grey-900 mb-4 flex items-center gap-2">
                <span>📚</span>
                {isArabic ? 'المصادر' : 'Resources'}
              </h3>
              <ul className="space-y-3">
                {session.resources[lang].map((resource, idx) => (
                  <li key={idx} className="text-grey-700 flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-grey-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                {isArabic ? 'روابط مفيدة' : 'Useful Links'}
              </h3>
              <ul className="space-y-3">
                {session.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors group"
                    >
                      <span className="group-hover:underline">{link.title[lang]}</span>
                      <span className="text-grey-400 text-sm">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {sessionId > 1 ? (
              <Link
                href={`/${locale}/web/courses/fintech-fundamentals/session/${sessionId - 1}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-grey-100 text-grey-700 hover:bg-grey-200 transition-colors"
              >
                <span className={`inline-block ${isArabic ? 'transform rotate-180' : ''}`}>←</span>
                <span>{isArabic ? 'الجلسة السابقة' : 'Previous Session'}</span>
              </Link>
            ) : (
              <div />
            )}

            {sessionId < 4 ? (
              <Link
                href={`/${locale}/web/courses/fintech-fundamentals/session/${sessionId + 1}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white hover:shadow-lg transition-all"
                style={gradientStyle}
              >
                <span>{isArabic ? 'الجلسة التالية' : 'Next Session'}</span>
                <span className={`inline-block ${isArabic ? 'transform rotate-180' : ''}`}>→</span>
              </Link>
            ) : (
              <Link
                href={`/${locale}/web/courses/fintech-fundamentals#register`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white hover:shadow-lg transition-all"
                style={gradientStyle}
              >
                <span>{isArabic ? 'سجل الآن' : 'Register Now'}</span>
                <span>🚀</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all 4 sessions
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}
