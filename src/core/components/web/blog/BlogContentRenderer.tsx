import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';
import { BlogHeaderBlock } from './BlogHeaderBlock';
import { BlogTextBlock } from './BlogTextBlock';
import { BlogImageBlock } from './BlogImageBlock';
import { BlogListBlock } from './BlogListBlock';
import { BlogQuoteBlock } from './BlogQuoteBlock';

interface BlogContentRendererProps {
  content: BlogContentBlock[];
}

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content }) => {
  return (
    <div className="blog-content">
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
          default:
            return null;
        }
      })}
    </div>
  );
};
