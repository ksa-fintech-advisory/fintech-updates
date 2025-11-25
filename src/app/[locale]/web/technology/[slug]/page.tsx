import { technologyService } from '@/services/api/mock';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface TechnologyDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function TechnologyDetailPage({ params }: TechnologyDetailPageProps) {
  const { slug, locale } = params;
  const isArabic = locale === 'ar';
  
  // Get technology by slug
  const technology = await technologyService.getTechnologyBySlug(slug);
  
  if (!technology) {
    notFound();
  }

  const title = isArabic ? technology.title.ar : technology.title.en;
  const description = isArabic ? technology.description.ar : technology.description.en;

  const difficultyColor = {
    beginner: 'bg-success-50 text-success-700 border-success-200',
    intermediate: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    advanced: 'bg-danger-50 text-danger-700 border-danger-200',
  };

  const difficultyLabel = {
    beginner: isArabic ? 'مبتدئ' : 'Beginner',
    intermediate: isArabic ? 'متوسط' : 'Intermediate',
    advanced:isArabic ? 'متقدم' : 'Advanced',
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="px-4 py-2 text-sm font-bold rounded-full backdrop-blur-md"
                style={{
                  backgroundColor: `${technology.category.color}CC`,
                  color: 'white',
                }}
              >
                {technology.category.icon} {isArabic ? technology.category.name.ar : technology.category.name.en}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${difficultyColor[technology.difficulty as keyof typeof difficultyColor]}`}>
                {difficultyLabel[technology.difficulty as keyof typeof difficultyLabel]}
              </span>
              <span className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm rounded-full">
                {technology.duration}
              </span>
            </div>

            {/* Title & Icon */}
            <div className="flex items-start gap-6">
              <div className="text-7xl">{technology.icon}</div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
                <p className="text-xl text-white/90 mb-6">{description}</p>
              </div>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2">
              {technology.topics.map((topic: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-white/20 text-white/70 text-sm">
              {isArabic ? 'آخر تحديث: ' : 'Last updated: '}
              {new Date(technology.updatedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Content */}
      <article className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-primary-50 border-l-4 border-primary p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {isArabic ? '📋 ما ستتعلمه' : '📋 What You\'ll Learn'}
                </h3>
                <p className="text-primary-700">
                  {isArabic 
                    ? 'هذا الدليل الشامل يغطي جميع الجوانب الأساسية لتصميم وتنفيذ الحلول على مستوى الإنتاج. ستتعلم أفضل الممارسات، وأنماط التصميم، واعتبارات الأمان.'
                    : 'This comprehensive guide covers all essential aspects of designing and implementing production-grade solutions. You\'ll learn best practices, design patterns, and security considerations.'}
                </p>
              </div>

              <h2 className="text-3xl font-bold text-grey-900 mb-6">
                {isArabic ? 'نظرة عامة' : 'Overview'}
              </h2>
              <p className="text-grey-700 text-lg leading-relaxed mb-8">
                {description}
              </p>

              <div className="bg-grey-900 text-white p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold mb-4">
                  {isArabic ? '💡 نصيحة احترافية' : '💡 Pro Tip'}
                </h3>
                <p className="text-grey-300">
                  {isArabic
                    ? 'يُنصح بشدة بمتابعة هذا الدليل بترتيب تسلسلي للحصول على أفضل فهم. تأكد من فهم كل قسم قبل الانتقال إلى التالي.'
                    : 'It\'s highly recommended to follow this guide sequentially for the best understanding. Make sure you grasp each section before moving to the next.'}
                </p>
              </div>

              {/* Placeholder for actual technology content */}
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-grey-900 mb-4">
                    {isArabic ? '1. البنية المعمارية' : '1. Architecture Overview'}
                  </h2>
                  <p className="text-grey-700 leading-relaxed">
                    {isArabic
                      ? 'نبدأ بفهم البنية المعمارية الشاملة والمكونات الرئيسية للنظام...'
                      : 'We begin by understanding the overall architecture and key components of the system...'}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-grey-900 mb-4">
                    {isArabic ? '2. اعتبارات الأمان' : '2. Security Considerations'}
                  </h2>
                  <p className="text-grey-700 leading-relaxed">
                    {isArabic
                      ? 'الأمان أمر بالغ الأهمية في أي نظام التقنية المالية. سنغطي...'
                      : 'Security is paramount in any FinTech system. We\'ll cover...'}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-grey-900 mb-4">
                    {isArabic ? '3. التنفيذ التدريجي' : '3. Step-by-Step Implementation'}
                  </h2>
                  <p className="text-grey-700 leading-relaxed">
                    {isArabic
                      ? 'الآن بعد أن فهمنا الأساسيات، دعونا نتعمق في التنفيذ الفعلي...'
                      : 'Now that we understand the fundamentals, let\'s dive into the actual implementation...'}
                  </p>
                </section>
              </div>
            </div>

            {/* Back Navigation */}
            <div className="mt-16 pt-8 border-t border-grey-200">
              <Link
                href={`/${locale}/web/technology`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary-700 font-semibold text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {isArabic ? 'العودة إلى التقنيات' : 'Back to Technology'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
