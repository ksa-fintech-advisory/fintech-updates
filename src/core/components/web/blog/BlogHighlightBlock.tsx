import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';

interface BlogHighlightBlockProps {
  block: Extract<BlogContentBlock, { type: 'highlight' }>;
}

export const BlogHighlightBlock: React.FC<BlogHighlightBlockProps> = ({ block }) => {
  const { title, text, variant = 'info' } = block;

  const variants = {
    info: {
      container: 'bg-primary-50 border-primary-200',
      icon: 'text-primary-600',
      title: 'text-primary-800',
      text: 'text-primary-700',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-600',
      title: 'text-amber-800',
      text: 'text-amber-700',
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200',
      icon: 'text-emerald-600',
      title: 'text-emerald-800',
      text: 'text-emerald-700',
    },
  };

  const style = variants[variant];

  return (
    <div className={`my-8 p-6 rounded-xl border ${style.container} flex flex-col sm:flex-row gap-4`}>
       {/* Icon */}
       <div className="flex-shrink-0">
          {variant === 'info' && (
              <svg className={`w-6 h-6 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          {variant === 'warning' && (
              <svg className={`w-6 h-6 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          )}
          {variant === 'success' && (
              <svg className={`w-6 h-6 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
       </div>
       
       {/* Content */}
       <div>
          {title && <h4 className={`font-bold text-lg mb-2 ${style.title}`}>{title}</h4>}
        <p className={`${style.text} leading-relaxed`} dangerouslySetInnerHTML={{ __html: text }} />
       </div>
    </div>
  );
};
