import { newsApiService } from '@/services/api/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlogContentRenderer } from '@/core/components/web/blog/BlogContentRenderer';
import { PdfAttachment } from '@/core/components/web/news/PdfAttachment';
import { SocialShare } from '@/core/components/web/blog/SocialShare';

interface NewsDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug, locale } = params;
  const isArabic = locale === 'ar';

  const update = await newsApiService.getNewsUpdateBySlug(slug, locale);

  if (!update) {
    notFound();
  }

  const currentUrl = `https://fintech-updates.sa/${locale}/web/updates/${slug}`;

  // Helper to format date
  const formattedDate = new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary-900 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        {/* Navigation */}
        <div className="mb-8">
          <Link
                href={`/${locale}/web/updates`}
            className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
          >
                {isArabic ? (
              <>
                        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                        <span>العودة إلى التحديثات</span>
              </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                        <span>Back to Updates</span>
                    </>
                )}
          </Link>
        </div>

        {/* Main Document Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-grey-200 overflow-hidden max-w-4xl mx-auto">
          {/* Header Content */}
          <div className="bg-white px-6 py-12 md:px-12 md:py-16 border-b border-grey-100">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider rounded-full border border-primary-100">
                {update.category}
              </span>
              <span className="text-grey-400 text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {formattedDate}
              </span>
              {update.source && (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-grey-300 rounded-full" />
                  <span className="text-grey-500 text-sm font-semibold">{update.source}</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-grey-900 leading-tight mb-8">
              {update.title}
            </h1>

            {/* Social Share & Summary */}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between pt-8 border-t border-grey-100">
              <p className="text-xl text-grey-600 leading-relaxed font-serif italic max-w-2xl">
                {update.summary}
              </p>
              <div className="flex-shrink-0">
                <SocialShare title={update.title} url={currentUrl} />
              </div>
            </div>
          </div>

          {/* Document Body */}
          <article className="px-6 py-12 md:px-12 md:py-16 bg-white">
            <div className="prose prose-lg prose-indigo max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-img:rounded-xl">
              {/* Primary PDF Download (Top) */}
              {update.pdfUrl && (
                <div className="not-prose mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="font-bold text-grey-900 text-lg mb-1">
                        {isArabic ? 'الوثيقة الرسمية' : 'Official Documentation'}
                      </h4>
                      <p className="text-grey-500 text-sm">
                        {isArabic ? 'حمل النص الكامل للتحديث بصيغة PDF' : 'Download the full text of this update as a PDF.'}
                      </p>
                    </div>
                    <div className="w-full md:w-auto">
                      <PdfAttachment url={update.pdfUrl} label={isArabic ? 'تحميل الملف' : 'Download File'} />
                    </div>
                  </div>
                </div>
              )}

              <BlogContentRenderer content={update.content} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
