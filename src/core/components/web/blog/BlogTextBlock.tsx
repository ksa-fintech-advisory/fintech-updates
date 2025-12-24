import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';

interface BlogTextBlockProps {
  block: Extract<BlogContentBlock, { type: 'paragraph' }>;
}

export const BlogTextBlock: React.FC<BlogTextBlockProps> = ({ block }) => {
  return (
    <p
      className="text-grey-700 mb-4 leading-relaxed text-lg"
      dangerouslySetInnerHTML={{ __html: block.text }}
    />
  );
};
