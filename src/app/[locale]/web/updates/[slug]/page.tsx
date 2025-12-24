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
    <div className="bg-white min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-grey-50 border-b border-grey-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
             {/* Back Link */}
             <div className="mb-8">
              <Link
                href={`/${locale}/web/updates`}
                className="inline-flex items-center gap-2 text-grey-500 hover:text-primary transition-colors text-sm font-medium"
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

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wide rounded-full">
                    {update.category}
                </span>
                <span className="text-grey-500 text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {formattedDate}
                </span>
                {update.source && (
                    <>
                        <span className="w-1 h-1 bg-grey-300 rounded-full" />
                        <span className="text-grey-600 text-sm font-medium">Source: {update.source}</span>
                    </>
                )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-grey-900 leading-tight mb-8">
                {update.title}
            </h1>

            {/* Social Share */}
            <div className="flex items-center justify-between border-t border-b border-grey-200 py-4">
                 <SocialShare title={update.title} url={currentUrl} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
            {/* PDF Attachment - Prominent */}
            {update.pdfUrl && (
                <div className="mb-12">
                    <PdfAttachment url={update.pdfUrl} label={isArabic ? 'تحميل الوثيقة الرسمية' : 'Download Official Document'} />
                </div>
            )}

            <div className="prose prose-lg prose-indigo max-w-none">
                <BlogContentRenderer content={update.content} />
            </div>

             {/* Footer PDF (Optional Reminder) */}
             {update.pdfUrl && (
                <div className="mt-16 pt-8 border-t border-grey-100">
                    <h4 className="text-sm font-bold text-grey-900 uppercase tracking-wide mb-4">
                        {isArabic ? 'ملفات مرفقة' : 'Attached Files'}
                    </h4>
                    <PdfAttachment url={update.pdfUrl} label={isArabic ? 'تحميل الوثيقة الرسمية' : 'Download Official Document'} />
                </div>
            )}
        </div>
      </article>
    </div>
  );
}
