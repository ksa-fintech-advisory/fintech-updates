import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';

interface TableOfContentsProps {
  content: BlogContentBlock[];
  title?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content, title = 'Table of Contents' }) => {
  // Filter only h2 and h3 headers specifically for the TOC
  const headers = content.filter(
    (block): block is Extract<BlogContentBlock, { type: 'header' }> => 
      block.type === 'header' && (block.level === 2 || block.level === 3)
  );

  if (headers.length === 0) return null;

  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  return (
    <nav className="hidden lg:block sticky top-24 p-6 bg-white rounded-2xl border border-grey-200 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto w-full lg:w-72">
      <h3 className="font-bold text-grey-900 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
        {title}
      </h3>
      <ul className="space-y-3">
        {headers.map((header, index) => {
           const id = generateId(header.text);
           return (
             <li key={index} className={header.level === 3 ? 'pl-4' : ''}>
               <a 
                 href={`#${id}`}
                 className="block text-sm text-grey-600 hover:text-primary-600 hover:translate-x-1 transition-all duration-200 line-clamp-1"
               >
                 {header.text}
               </a>
             </li>
           );
        })}
      </ul>
    </nav>
  );
};
