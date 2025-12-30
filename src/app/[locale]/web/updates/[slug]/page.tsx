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
      return <p key={key} className="text-grey-700 leading-relaxed mb-6 text-lg">{block.content}</p>;
    case 'heading':
      // Explicitly narrow the type to valid HTML heading tags to avoid TypeScript errors with @react-three/fiber types
      const HeadingTag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return <HeadingTag key={key} className="font-bold text-grey-900 mt-10 mb-6 text-2xl md:text-3xl">{block.content}</HeadingTag>;
    case 'list':
      return (
        <ul key={key} className="list-disc list-inside space-y-3 mb-8 text-grey-700 text-lg marker:text-primary-500">
          {block.items.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'highlight':
      return (
        <div key={key} className="bg-gradient-to-r from-primary-50 to-transparent border-l-4 border-primary-500 p-6 my-8 rounded-r-xl">
          <p className="text-primary-900 font-medium text-lg italic leading-relaxed">"{block.content}"</p>
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
    // console.log("Update data:", update); // Debug
  } catch (error) {
    notFound();
  }

  // Parse content JSON if exists and is a string, otherwise use it as is if it's already an object (safety check)
  let contentBlocks = [];
  try {
    let parsed = typeof update.content === 'string' ? JSON.parse(update.content) : update.content;
    // Handle double-stringified JSON if necessary
    if (typeof parsed === 'string') {
      try { parsed = JSON.parse(parsed); } catch (e) { /* ignore */ }
    }
    contentBlocks = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse content blocks", e);
    contentBlocks = [];
  }

  // Parse references if exists
  let references = [];
  try {
    let parsed = typeof update.references === 'string' ? JSON.parse(update.references) : update.references;
    // Handle double-stringified JSON if necessary
    if (typeof parsed === 'string') {
      try { parsed = JSON.parse(parsed); } catch (e) { /* ignore */ }
    }
    references = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse references", e);
    references = [];
  }



  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-slate-900 overflow-hidden">
        {update.featuredImage ? (
          <>
            <Image
              src={update.featuredImage}
              alt={update.title}
              fill
              className="object-cover opacity-60 hover:opacity-70 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-grey-50 via-slate-900/40 to-slate-900/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900 opacity-90">
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20"></div>
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center relative z-10">
          {/* Back Navigation */}
          <div className="absolute top-8 md:top-12">
            <Link
              href={`/${locale}/web/updates`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/20"
            >
              <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {isArabic ? 'العودة للتحديثات' : 'Back to Updates'}
            </Link>
          </div>

          <div className="max-w-4xl mt-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {update.category && (
                <span className="px-4 py-1.5 bg-primary-500 text-white rounded-full text-sm font-bold shadow-lg shadow-primary-500/30 backdrop-blur-sm border border-primary-400/30 uppercase tracking-wide">
                  {update.category}
                </span>
              )}
              {update.source && (
                <span className="px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm">
                  {isArabic ? 'المصدر: ' : 'Source: '} {update.source}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg" dir={isArabic ? 'rtl' : 'ltr'}>
              {update.title}
            </h1>

            <div className="flex items-center gap-6 text-white/80 text-sm md:text-base font-medium">
              <span className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {update.featured && (
                <span className="flex items-center gap-1.5 text-yellow-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {isArabic ? 'تحديث مميز' : 'Featured Update'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Card */}
            {update.summary && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-grey-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full opacity-50 -mr-16 -mt-16"></div>
                <h3 className="text-xl font-bold text-grey-900 mb-4 flex items-center gap-2 relative z-10">
                  <span className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  {isArabic ? 'ملخص التحديث' : 'Quick Summary'}
                </h3>
                <p className="text-xl text-grey-700 leading-relaxed relative z-10 font-medium" dir={isArabic ? 'rtl' : 'ltr'}>
                  {update.summary}
                </p>
              </div>
            )}

            {/* Main Article Content */}
            <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-grey-900 prose-headings:font-bold prose-p:text-grey-700 prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-2xl" dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Icon + Title Repetition for PDF-like feel */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-grey-100 not-prose">
                  <div className="text-5xl">{update.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-grey-900 leading-tight">{update.title}</h2>
                    <p className="text-grey-500 text-sm mt-1">{isArabic ? 'وثيقة رقمية' : 'Digital Document'}</p>
                  </div>
                </div>

                {/* Description */}
                <h3 className="text-xl font-bold text-grey-900 mb-4">{isArabic ? 'نظرة عامة' : 'About this Update'}</h3>
                <div className="mb-10 text-lg leading-relaxed text-grey-700">
                  {update.description}
                </div>

                {/* Dynamic Blocks */}
                {contentBlocks.length > 0 && (
                  <div className="space-y-2">
                    {contentBlocks.map((block: any, index: number) => renderContentBlock(block, index))}
                  </div>
                )}
              </div>
            </div>

            {/* References Section */}
            {references.length > 0 && (
              <div className="bg-white rounded-3xl shadow-soft p-8">
                <h3 className="text-xl font-bold text-grey-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {isArabic ? 'المصادر والمراجع' : 'Sources & References'}
                </h3>
                <div className="grid gap-4">
                  {references.map((ref: any, index: number) => (
                    <a
                      key={index}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-grey-50 hover:bg-primary-50 border border-grey-100 hover:border-primary-200 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-grey-400 group-hover:text-primary-500 shadow-sm font-mono text-sm">
                          {index + 1}
                        </span>
                        <span className="font-medium text-grey-700 group-hover:text-primary-700">{ref.title}</span>
                      </div>
                      <svg className="w-5 h-5 text-grey-400 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L14 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Info Card */}
            <div className="bg-white rounded-3xl shadow-soft p-6 border border-grey-100 sticky top-24">
              <h3 className="font-bold text-grey-900 mb-6 text-lg">
                {isArabic ? 'معلومات المستند' : 'Document Info'}
              </h3>

              {update.pdfUrl && (
                <div className="mb-8">
                  <a
                    href={update.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-[1.02] transition-all duration-300 text-center group"
                  >
                    <svg className="w-10 h-10 mb-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-bold text-lg mb-1">{isArabic ? 'تحميل الملف' : 'Download PDF'}</span>
                    <span className="text-white/80 text-sm">{isArabic ? 'نسخة كاملة' : 'Full Version'}</span>
                  </a>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-grey-50">
                  <span className="text-grey-500 text-sm">{isArabic ? 'الحالة' : 'Status'}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {isArabic ? 'منشور' : 'Published'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-grey-50">
                  <span className="text-grey-500 text-sm">{isArabic ? 'تاريخ النشر' : 'Published Date'}</span>
                  <span className="text-grey-900 font-medium text-sm">
                    {new Date(update.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-grey-50">
                  <span className="text-grey-500 text-sm">{isArabic ? 'المصدر' : 'Source'}</span>
                  <span className="text-primary-600 font-bold text-sm">
                    {update.source || (isArabic ? 'غير محدد' : 'N/A')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
