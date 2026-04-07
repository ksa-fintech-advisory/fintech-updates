import React from 'react';
import Image from 'next/image'; // FIX: Missing import caused the TS error
import { BlogContentBlock } from '@/core/types/web/blog';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiHash, FiCpu, FiExternalLink } from 'react-icons/fi';

/** LinkedIn import highlight: text is `منشور أصلي على LinkedIn: <url>` */
function parseLinkedInOriginalPostUrl(text: string): string | null {
  const raw = text.replace(/<[^>]*>/g, '').trim();
  const m = raw.match(/^منشور أصلي على LinkedIn:\s*(https:\/\/www\.linkedin\.com\/\S+)/i);
  if (!m) return null;
  const url = m[1].replace(/[.,;)\]>'"]+$/, '');
  if (url.startsWith('https://www.linkedin.com/')) return url;
  return null;
}

/* -------------------------------------------------------------------------- */
/* Text Block                                 */
/* -------------------------------------------------------------------------- */
interface BlogTextBlockProps {
  block: Extract<BlogContentBlock, { type: 'paragraph' }>;
}

export const BlogTextBlock: React.FC<BlogTextBlockProps> = ({ block }) => {
  return (
    <div
      className="text-zinc-700 dark:text-zinc-300 mb-6 leading-7 text-lg selection:bg-primary-100 dark:selection:bg-primary-900/30"
      dangerouslySetInnerHTML={{ __html: block.text }}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* Header Block                                */
/* -------------------------------------------------------------------------- */
interface BlogHeaderBlockProps {
  block: Extract<BlogContentBlock, { type: 'header' }>;
}

export const BlogHeaderBlock: React.FC<BlogHeaderBlockProps> = ({ block }) => {
  const Component = `h${block.level}` as React.ElementType;

  // Engineering style: Tighter tracking, higher contrast
  const classNameMap: Record<number, string> = {
    1: 'text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-12 mb-6 tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2',
    2: 'text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 tracking-tight',
    3: 'text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-3 flex items-center gap-2',
    4: 'text-lg font-bold text-zinc-900 dark:text-white mt-6 mb-2',
    5: 'text-base font-bold text-zinc-900 dark:text-white mt-4 mb-2',
    6: 'text-sm font-bold text-zinc-900 dark:text-white mt-4 mb-2 uppercase tracking-wider',
  };

  const id = block.text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  return (
    <div className="group relative">
      <Component
        id={id}
        className={classNameMap[block.level]}
      >
        {/* Anchor Link on Hover */}
        <a href={`#${id}`} className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-primary-500 transition-all hidden md:block">
          <FiHash />
        </a>
        <span dangerouslySetInnerHTML={{ __html: block.text }} />
      </Component>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* List Block                                 */
/* -------------------------------------------------------------------------- */
interface BlogListBlockProps {
  block: Extract<BlogContentBlock, { type: 'list' }>;
}

export const BlogListBlock: React.FC<BlogListBlockProps> = ({ block }) => {
  const isOrdered = block.style === 'ordered';
  const Component = isOrdered ? 'ol' : 'ul';

  // Custom markers via standard Tailwind classes
  // Ordered: Decimal with mono font
  // Unordered: Square bullets for tech feel
  const listClass = isOrdered
    ? 'list-decimal marker:text-zinc-400 marker:font-mono marker:font-bold'
    : 'list-square marker:text-primary-500';

  return (
    <Component className={`${listClass} pl-6 mb-8 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg`}>
      {block.items.map((item, index) => (
        <li key={index} className="pl-2">
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </Component>
  );
};

/* -------------------------------------------------------------------------- */
/* Highlight Block                              */
/* -------------------------------------------------------------------------- */
interface BlogHighlightBlockProps {
  block: Extract<BlogContentBlock, { type: 'highlight' }>;
  locale?: string;
}

function LinkedInSourceCallout({ url, locale }: { url: string; locale: string }) {
  const isAr = locale === 'ar';
  return (
    <div
      className="not-prose my-8 rounded-xl border border-[#0A66C2]/25 dark:border-[#0A66C2]/35 bg-gradient-to-br from-[#0A66C2]/[0.07] via-blue-50/40 to-transparent dark:from-[#0A66C2]/15 dark:via-blue-950/20 dark:to-transparent pl-4 pr-5 py-5 sm:pl-5 sm:pr-6 sm:py-6 shadow-sm"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="shrink-0 flex h-11 w-11 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-md shadow-[#0A66C2]/25"
            aria-hidden
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0A66C2] dark:text-[#70b7f9] mb-1">
              LinkedIn
            </p>
            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
              {isAr ? 'مصدر المنشور' : 'Original source'}
            </p>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
              {isAr
                ? 'هذا المحتوى نُشر أصلًا كمنشور على LinkedIn. يمكنك فتحه في تبويب جديد.'
                : 'This content was originally published as a LinkedIn post. Open it in a new tab.'}
            </p>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-button border border-[#004182]/30 bg-[#0A66C2] px-5 py-3 text-sm font-semibold !text-white no-underline shadow-md shadow-[#0A66C2]/35 transition hover:border-[#003d6b] hover:bg-[#004182] hover:!text-white hover:shadow-lg hover:shadow-[#0A66C2]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2] active:scale-[0.98] sm:px-6"
        >
          <span className="!text-white">{isAr ? 'فتح على LinkedIn' : 'Open on LinkedIn'}</span>
          <FiExternalLink className="h-4 w-4 shrink-0 !text-white opacity-95 group-hover/btn:opacity-100" aria-hidden />
        </a>
      </div>
    </div>
  );
}

export const BlogHighlightBlock: React.FC<BlogHighlightBlockProps> = ({ block, locale = 'ar' }) => {
  const { title, text, variant = 'info' } = block;

  const linkedInUrl = variant === 'info' ? parseLinkedInOriginalPostUrl(text) : null;
  if (linkedInUrl) {
    return <LinkedInSourceCallout url={linkedInUrl} locale={locale} />;
  }

  const variants = {
    info: {
      border: 'border-l-blue-500',
      bg: 'bg-blue-50/50 dark:bg-blue-900/10',
      text: 'text-blue-900 dark:text-blue-100',
      icon: <FiInfo className="w-5 h-5 text-blue-500" />,
      label: 'NOTE',
    },
    warning: {
      border: 'border-l-amber-500',
      bg: 'bg-amber-50/50 dark:bg-amber-900/10',
      text: 'text-amber-900 dark:text-amber-100',
      icon: <FiAlertCircle className="w-5 h-5 text-amber-500" />,
      label: 'WARNING',
    },
    success: {
      border: 'border-l-emerald-500',
      bg: 'bg-emerald-50/50 dark:bg-emerald-900/10',
      text: 'text-emerald-900 dark:text-emerald-100',
      icon: <FiCheckCircle className="w-5 h-5 text-emerald-500" />,
      label: 'SUCCESS',
    },
  };

  const style = variants[variant];

  return (
    <div className={`my-8 pl-4 pr-6 py-4 rounded-r-lg border-l-4 ${style.border} ${style.bg} relative overflow-hidden`}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {style.icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">
              {style.label}
            </span>
            {title && <span className={`font-bold text-sm ${style.text}`}>{title}</span>}
          </div>
          <div className={`text-base ${style.text} opacity-90`} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Quote Block                                */
/* -------------------------------------------------------------------------- */
interface BlogQuoteBlockProps {
  block: Extract<BlogContentBlock, { type: 'quote' }>;
}

export const BlogQuoteBlock: React.FC<BlogQuoteBlockProps> = ({ block }) => {
  return (
    <div className="my-10 relative pl-8">
      {/* Decorative large quote mark */}
      <span className="absolute top-0 left-0 text-6xl text-zinc-200 dark:text-zinc-800 font-serif leading-none">
        &ldquo;
      </span>

      <blockquote className="relative z-10 text-xl md:text-2xl font-medium text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
        {block.text}
      </blockquote>

      {block.author && (
        <div className="mt-4 flex items-center gap-2">
          <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700"></div>
          <cite className="text-sm font-mono font-bold text-zinc-500 dark:text-zinc-400 not-italic uppercase tracking-wide">
            {block.author}
          </cite>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Timeline Block                               */
/* -------------------------------------------------------------------------- */
interface BlogTimelineBlockProps {
  block: Extract<BlogContentBlock, { type: 'timeline' }>;
}

export const BlogTimelineBlock: React.FC<BlogTimelineBlockProps> = ({ block }) => {
  return (
    <div className="my-12 px-2">
      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-8">
        {block.items.map((item, index) => {
          const isCompleted = item.status === 'completed';
          const isActive = item.status === 'active';

          return (
            <div key={index} className="ml-8 relative">
              {/* Node (Git Commit Style) */}
              <span className={`
                absolute -left-[2.4rem] top-1.5 w-4 h-4 rounded-full border-2 
                transition-all duration-300 bg-white dark:bg-zinc-950
                ${isCompleted ? 'border-primary-500 bg-primary-500' :
                  isActive ? 'border-amber-500' : 'border-zinc-300 dark:border-zinc-700'}
              `}>
                {isActive && <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-75"></span>}
              </span>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {item.date}
                </span>
                <h4 className={`text-lg font-bold ${isActive ? 'text-amber-600' : 'text-zinc-900 dark:text-white'}`}>
                  {item.title}
                </h4>
              </div>

              {item.description && (
                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Image Block                                */
/* -------------------------------------------------------------------------- */
interface BlogImageBlockProps {
  block: Extract<BlogContentBlock, { type: 'image' }>;
}

const BlogImageBlock: React.FC<BlogImageBlockProps> = ({ block }) => {
  return (
    <figure className="my-10 group">
      <div className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
        {/* Technical Corner Markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-zinc-400 z-10 opacity-50"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-zinc-400 z-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-zinc-400 z-10 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-zinc-400 z-10 opacity-50"></div>

        {/* Using next/image directly (Fixed TS error) */}
        <div className="relative h-64 md:h-[500px] w-full">
          <Image
            src={block.src}
            alt={block.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw"
          />
        </div>
      </div>
      {block.caption && (
        <figcaption className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wide">
          <FiCpu className="w-3 h-3" />
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* Main Renderer                                */
/* -------------------------------------------------------------------------- */
interface BlogContentRendererProps {
  content: BlogContentBlock[];
  /** Used for LinkedIn source callout copy (ar vs en). */
  locale?: string;
}

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content, locale = 'ar' }) => {
  return (
    <div className="blog-content space-y-2">
      {content.map((block, index) => {
        switch (block.type) {
          case 'header':
            return <BlogHeaderBlock key={index} block={block} />;
          case 'paragraph':
            return <BlogTextBlock key={index} block={block} />;
          case 'image':
            return <BlogImageBlock key={index} block={block} />;
          case 'list':
            return <BlogListBlock key={index} block={block} />;
          case 'quote':
            return <BlogQuoteBlock key={index} block={block} />;
          case 'highlight':
            return <BlogHighlightBlock key={index} block={block} locale={locale} />;
          case 'timeline':
            return <BlogTimelineBlock key={index} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};