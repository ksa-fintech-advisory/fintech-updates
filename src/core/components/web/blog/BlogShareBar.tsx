'use client';

import { useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { FiLink2, FiCheck } from 'react-icons/fi';
import { SiX } from 'react-icons/si';
import { FiLinkedin } from 'react-icons/fi';

interface BlogShareBarProps {
  title: string;
  slug: string;
}

export function BlogShareBar({ title, slug }: BlogShareBarProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [copied, setCopied] = useState(false);

  const articleUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${locale}/blog/${slug}`
    : '';

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
    }
  }, [articleUrl]);

  const shareToX = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420');
  };

  const shareToLinkedIn = () => {
    // LinkedIn's feed share pre-fills the post editor with text + link
    const text = `${title}\n\n${articleUrl}`;
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=550,height=520');
  };

  const btnBase =
    'inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-800/60 px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100';

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mr-1">
        {isArabic ? 'شارك' : 'Share'}
      </span>

      <button onClick={shareToX} className={btnBase} aria-label="Share on X">
        <SiX className="h-3 w-3" />
        <span>X</span>
      </button>

      <button onClick={shareToLinkedIn} className={btnBase} aria-label="Share on LinkedIn">
        <FiLinkedin className="h-3.5 w-3.5" />
        <span>LinkedIn</span>
      </button>

      <button onClick={handleCopy} className={btnBase} aria-label={isArabic ? 'نسخ الرابط' : 'Copy link'}>
        {copied ? (
          <>
            <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400">{isArabic ? 'تم النسخ' : 'Copied'}</span>
          </>
        ) : (
          <>
            <FiLink2 className="h-3.5 w-3.5" />
            <span>{isArabic ? 'نسخ الرابط' : 'Copy link'}</span>
          </>
        )}
      </button>
    </div>
  );
}
