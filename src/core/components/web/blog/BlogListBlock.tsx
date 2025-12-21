import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';

interface BlogListBlockProps {
  block: Extract<BlogContentBlock, { type: 'list' }>;
}

export const BlogListBlock: React.FC<BlogListBlockProps> = ({ block }) => {
  const Component = block.style === 'ordered' ? 'ol' : 'ul';
  const listClass = block.style === 'ordered' ? 'list-decimal' : 'list-disc';

  return (
    <Component className={`${listClass} pl-6 mb-6 space-y-2 text-grey-700 text-lg`}>
      {block.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Component>
  );
};
