import React from 'react';
import Link from 'next/link';
import SafeImage from '@/core/components/common/SafeImage';
import { blogCardImageUrl } from '@/core/constants/blogMedia';
import { LocalizedBlog } from '@/core/types/web/blog';

interface RelatedPostsProps {
  posts: LocalizedBlog[];
  locale: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, locale }) => {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-grey-200">
      <h3 className="text-2xl font-bold text-grey-900 mb-8">
        {locale === 'ar' ? 'مقالات ذات صلة' : 'Related Posts'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => {
          const img = blogCardImageUrl(post.featuredImage);
          return (
          <Link 
            key={post.id} 
            href={`/${locale}/web/blog/${post.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
              {img ? (
                <SafeImage
                  src={img}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: `repeating-linear-gradient(-12deg, transparent, transparent 10px, ${post.category.color}40 10px, ${post.category.color}40 11px)`,
                  }}
                />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${post.category.color}15`, color: post.category.color }}
                >
                  {post.category.name}
                </span>
              </div>
              <h4 className="text-lg font-bold text-grey-900 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
            </div>
          </Link>
        );
        })}
      </div>
    </div>
  );
};
