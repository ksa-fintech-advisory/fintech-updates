import React from 'react';
import Image from 'next/image';
import { BlogContentBlock } from '@/core/types/web/blog';

interface BlogImageBlockProps {
  block: Extract<BlogContentBlock, { type: 'image' }>;
}

export const BlogImageBlock: React.FC<BlogImageBlockProps> = ({ block }) => {
  return (
    <figure className="my-8">
      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={block.src}
          alt={block.alt}
          fill
          className="object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="text-center text-grey-500 text-sm mt-3 italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
};
