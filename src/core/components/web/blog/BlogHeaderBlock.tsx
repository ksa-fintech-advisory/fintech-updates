import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';

interface BlogHeaderBlockProps {
  block: Extract<BlogContentBlock, { type: 'header' }>;
}

export const BlogHeaderBlock: React.FC<BlogHeaderBlockProps> = ({ block }) => {
  const Component = `h${block.level}` as React.ElementType;
  const classNameMap: Record<number, string> = {
    1: 'text-3xl font-bold text-grey-900 mt-8 mb-4',
    2: 'text-2xl font-bold text-grey-900 mt-6 mb-3',
    3: 'text-xl font-semibold text-grey-900 mt-5 mb-2',
    4: 'text-lg font-semibold text-grey-900 mt-4 mb-2',
    5: 'text-base font-bold text-grey-900 mt-4 mb-2',
    6: 'text-base font-semibold text-grey-900 mt-4 mb-2',
  };

  return <Component className={classNameMap[block.level]}>{block.text}</Component>;
};
