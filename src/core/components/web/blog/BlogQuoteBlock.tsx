import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';

interface BlogQuoteBlockProps {
  block: Extract<BlogContentBlock, { type: 'quote' }>;
}

export const BlogQuoteBlock: React.FC<BlogQuoteBlockProps> = ({ block }) => {
  return (
    <div className="my-8 pl-6 border-l-4 border-primary-500 bg-primary-50 p-6 rounded-r-lg">
      <blockquote className="text-xl font-medium text-grey-800 italic mb-4">
        &quot;{block.text}&quot;
      </blockquote>
      {block.author && (
        <cite className="text-sm font-semibold text-primary-700 not-italic block">
          — {block.author}
        </cite>
      )}
    </div>
  );
};
