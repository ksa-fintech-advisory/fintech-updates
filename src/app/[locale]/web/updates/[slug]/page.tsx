import { updateApiService } from '@/services/api/updateApi';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface UpdateDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const { slug, locale } = params;
  const isArabic = locale === 'ar';

  let update;
  try {
    update = await updateApiService.getUpdateBySlug(slug, locale);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-grey-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8 max-w-4xl mx-auto">
          <Link
            href={`/${locale}/web`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
          >
            <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-3xl shadow-soft p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="text-6xl flex-shrink-0">{update.icon}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-grey-900 mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                  {update.title}
                </h1>
                <div className="flex items-center gap-4 text-grey-600">
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  {update.featured && (
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {isArabic ? 'مميز' : 'Featured'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-soft p-8">
            <div className="prose prose-lg max-w-none" dir={isArabic ? 'rtl' : 'ltr'}>
              <p className="text-grey-700 leading-relaxed text-lg whitespace-pre-wrap">
                {update.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
