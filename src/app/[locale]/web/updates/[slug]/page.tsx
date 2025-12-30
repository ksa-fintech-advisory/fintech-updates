import { updateApiService } from '@/services/api/updateApi';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface UpdateDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

function renderContentBlock(block: any, index: number) {
  const key = index.toString();
  switch (block.type) {
    case 'paragraph':
      return <p key={key} className="text-grey-700 leading-relaxed mb-4">{block.content}</p>;
    case 'heading':
      const HeadingTag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return <HeadingTag key={key} className="font-bold text-grey-900 mt-8 mb-4">{block.content}</HeadingTag>;
    case 'list':
      return (
        <ul key={key} className="list-disc list-inside space-y-2 mb-4 text-grey-700">
          {block.items.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'highlight':
      return (
        <div key={key} className="bg-primary-50 border-l-4 border-primary-500 p-4 my-6 rounded">
          <p className="text-primary-900 font-medium">{block.content}</p>
        </div>
      );
    default:
      return null;
  }
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

  // Parse content JSON if exists
  const contentBlocks = update.content ? JSON.parse(update.content) : [];

  // Parse references if exists
  const references = update.references ? JSON.parse(update.references) : [];

  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero Section */}
      {update.featuredImage && (
        <div className="relative h-96 bg-grey-900">
          <Image
            src={update.featuredImage}
            alt={update.title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className={`mb-8 max-w-4xl mx-auto ${update.featuredImage ? '-mt-20 relative z-10' : 'pt-16'}`}>
          <Link
            href={`/${locale}/web`}
            className={`inline-flex items-center gap-2 transition-colors text-sm font-medium ${update.featuredImage
              ? 'text-white hover:text-primary-200'
              : 'text-primary-600 hover:text-primary-700'
              }`}
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
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {update.category && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase">
                      {update.category}
                    </span>
                  )}
                  {update.source && (
                    <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-bold">
                      {update.source}
                    </span>
                  )}
                  {update.featured && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {isArabic ? 'مميز' : 'Featured'}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-grey-900 mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                  {update.title}
                </h1>

                {update.summary && (
                  <p className="text-xl text-grey-600 mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                    {update.summary}
                  </p>
                )}

                <div className="flex items-center gap-4 text-grey-500 text-sm">
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
                </div>
              </div>
            </div>
          </div>

          {/* PDF Download */}
          {update.pdfUrl && (
            <div className="bg-white rounded-3xl shadow-soft p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-grey-900 mb-1">
                    {isArabic ? 'الوثيقة الرسمية' : 'Official Document'}
                  </h3>
                  <p className="text-sm text-grey-600">
                    {isArabic ? 'حمل المستند الكامل بصيغة PDF' : 'Download the full document as PDF'}
                  </p>
                </div>
                <a
                  href={update.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {isArabic ? 'تحميل PDF' : 'Download PDF'}
                </a>
              </div>
            </div>
          )}

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-soft p-8 mb-6">
            <div className="prose prose-lg max-w-none" dir={isArabic ? 'rtl' : 'ltr'}>
              <h2 className="text-2xl font-bold text-grey-900 mb-6">
                {isArabic ? 'التفاصيل' : 'Details'}
              </h2>

              <p className="text-grey-700 leading-relaxed text-lg mb-6">
                {update.description}
              </p>

              {contentBlocks.length > 0 && (
                <div className="mt-8">
                  {contentBlocks.map((block: any, index: number) => renderContentBlock(block, index))}
                </div>
              )}
            </div>
          </div>

          {/* References */}
          {references.length > 0 && (
            <div className="bg-white rounded-3xl shadow-soft p-8">
              <h2 className="text-2xl font-bold text-grey-900 mb-6" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic ? 'المراجع والمصادر' : 'References & Sources'}
              </h2>
              <ul className="space-y-3">
                {references.map((ref: any, index: number) => (
                  <li key={index}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary-600 hover:text-primary-700 transition-colors group"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span className="font-medium group-hover:underline">{ref.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
