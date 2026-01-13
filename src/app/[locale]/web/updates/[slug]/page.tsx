import { updateService } from '@/services/server/updateService';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight, FiCalendar, FiDownload, FiExternalLink, FiFileText, FiHash, FiTag, FiUser } from 'react-icons/fi';

interface UpdateDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

/* -------------------------------------------------------------------------- */
/* Dynamic Content Renderer (Kept simple but styled) */
/* -------------------------------------------------------------------------- */
function renderContentBlock(block: any, index: number) {
  const key = index.toString();
  switch (block.type) {
    case 'paragraph':
      return <p key={key} className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-lg">{block.content}</p>;
    case 'heading':
      const HeadingTag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return <HeadingTag key={key} className="font-bold text-zinc-900 dark:text-white mt-10 mb-4 text-2xl tracking-tight">{block.content}</HeadingTag>;
    case 'list':
      return (
        <ul key={key} className="list-disc list-outside ml-6 space-y-2 mb-8 text-zinc-700 dark:text-zinc-300 text-lg marker:text-primary-500">
          {block.items.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'highlight':
      return (
        <div key={key} className="bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-500 p-6 my-8 rounded-r-lg">
          <p className="text-primary-900 dark:text-primary-100 font-medium text-lg italic leading-relaxed">&quot;{block.content}&quot;</p>
        </div>
      );
    default:
      return null;
  }
}

export async function generateMetadata({ params: { slug, locale } }: UpdateDetailPageProps): Promise<Metadata> {
  const isArabic = locale === 'ar';
  try {
    const update = await updateService.getUpdateBySlug(slug, locale);
    if (!update) return { title: isArabic ? 'التحديث غير موجود' : 'Update Not Found' };
    return {
      title: update.title,
      description: update.summary || update.description,
      openGraph: {
        title: update.title,
        description: update.summary || update.description,
        type: 'article',
        publishedTime: update.publishedAt,
        images: update.featuredImage ? [{ url: update.featuredImage }] : [],
      },
    };
  } catch (error) {
    return { title: isArabic ? 'خطأ' : 'Error' };
  }
}

export default async function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const { slug, locale } = params;
  const isArabic = locale === 'ar';

  const update = await updateService.getUpdateBySlug(slug, locale);

  if (!update) {
    notFound();
  }

  // Parse Content
  let contentBlocks = [];
  try {
    let parsed = typeof update.content === 'string' ? JSON.parse(update.content) : update.content;
    if (typeof parsed === 'string') { try { parsed = JSON.parse(parsed); } catch (e) { /* ignore */ } }
    contentBlocks = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse content blocks", e);
    contentBlocks = [];
  }

  // Parse References
  let references = [];
  try {
    let parsed = typeof update.references === 'string' ? JSON.parse(update.references) : update.references;
    if (typeof parsed === 'string') { try { parsed = JSON.parse(parsed); } catch (e) { /* ignore */ } }
    references = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse references", e);
    references = [];
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-24 font-sans selection:bg-primary-500/30 text-zinc-900 dark:text-zinc-100">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Header: System Report Style */}
      <header className="relative pt-32 pb-12 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Back Link */}
          <div className="mb-8">
            <Link
              href={`/${locale}/web/updates`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors"
            >
              {isArabic ? <FiArrowRight /> : <FiArrowLeft />}
              <span>{isArabic ? '../العودة_للسجل' : '../RETURN_TO_LOG'}</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Icon Block */}
            <div className="shrink-0">
              <div className="w-16 h-16 rounded bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-3xl shadow-lg">
                {/* Fallback Icon if update.icon is missing or just text */}
                {update.icon ? update.icon : <FiFileText />}
              </div>
            </div>

            <div className="flex-1">
              {/* Metadata Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                  ID: {update.id.toString().padStart(6, '0')}
                </span>
                {update.category && (
                  <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded text-[10px] font-mono font-bold uppercase tracking-wide text-primary-700 dark:text-primary-400">
                    {update.category}
                  </span>
                )}
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isArabic ? 'ml-1' : 'mr-1'} bg-emerald-500 animate-pulse`}></span>
                  {isArabic ? 'نشط' : 'ACTIVE'}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                {update.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <FiCalendar />
                  <span>{new Date(update.date).toLocaleDateString('en-US')}</span>
                </div>
                {update.source && (
                  <div className="flex items-center gap-2">
                    <FiUser />
                    <span>SRC: {update.source}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Featured Image (if exists) */}
            {update.featuredImage && (
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative h-[300px] md:h-[400px]">
                <Image
                  src={update.featuredImage}
                  alt={update.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Summary Box */}
            {update.summary && (
              <div className="bg-zinc-100 dark:bg-zinc-900 border-l-4 border-zinc-400 dark:border-zinc-600 p-6 rounded-r-lg">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
                  {isArabic ? 'الملخص_التنفيذي' : 'EXECUTIVE_SUMMARY'}
                </h3>
                <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {update.summary}
                </p>
              </div>
            )}

            {/* Main Prose */}
            <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
              <div className="mb-8 text-xl leading-relaxed font-light text-zinc-600 dark:text-zinc-300">
                {update.description}
              </div>

              {/* Dynamic Blocks */}
              {contentBlocks.length > 0 && (
                <div className="space-y-2">
                  {contentBlocks.map((block: any, index: number) => renderContentBlock(block, index))}
                </div>
              )}
            </div>

            {/* References List */}
            {references.length > 0 && (
              <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                  <FiHash /> {isArabic ? 'المصادر_والمراجع' : 'REFERENCES_INDEX'}
                </h3>
                <div className="grid gap-3">
                  {references.map((ref: any, index: number) => (
                    <a
                      key={index}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-bold text-zinc-500 rounded">
                          {index + 1}
                        </span>
                        <span className="font-mono text-sm truncate text-zinc-600 dark:text-zinc-300 group-hover:text-primary-600 transition-colors">
                          {ref.title}
                        </span>
                      </div>
                      <FiExternalLink className="shrink-0 text-zinc-400 group-hover:text-primary-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar (4 cols) - Metadata Panel */}
          <div className="lg:col-span-4 space-y-8">

            {/* Info Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm sticky top-32">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                {isArabic ? 'خصائص_الملف' : 'FILE_PROPERTIES'}
              </h3>

              {/* PDF Download Action */}
              {update.pdfUrl && (
                <div className="mb-8">
                  <a
                    href={update.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-wider rounded hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md"
                  >
                    <FiDownload />
                    {isArabic ? 'تحميل_PDF' : 'DOWNLOAD_PDF'}
                  </a>
                </div>
              )}

              <dl className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-500">{isArabic ? 'تاريخ النشر' : 'Published'}</dt>
                  <dd className="font-mono font-bold text-zinc-900 dark:text-white">
                    {new Date(update.publishedAt).toLocaleDateString('en-US')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">{isArabic ? 'المصدر' : 'Source'}</dt>
                  <dd className="font-bold text-zinc-900 dark:text-white text-right max-w-[150px] truncate">
                    {update.source || 'N/A'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">{isArabic ? 'الحالة' : 'Status'}</dt>
                  <dd className="font-mono font-bold text-emerald-600">
                    {isArabic ? 'منشور' : 'PUBLISHED'}
                  </dd>
                </div>
              </dl>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}