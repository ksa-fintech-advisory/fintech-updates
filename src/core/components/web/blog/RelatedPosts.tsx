import React from 'react';
import Link from 'next/link';
import { LocalizedBlog } from '@/core/types/web/blog';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface RelatedPostsProps {
  posts: LocalizedBlog[];
  locale: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, locale }) => {
  if (posts.length === 0) return null;
  const isArabic = locale === 'ar';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/${locale}/blog/${post.slug}`}
          className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-zinc-800/40 p-5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)]"
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-zinc-300"
              style={{ borderColor: `${post.category.color}30` }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: post.category.color }}
              />
              {post.category.name}
            </span>
          </div>
          <h4 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug line-clamp-2">
            {post.title}
          </h4>
          <div
            className={`mt-auto flex items-center gap-2 pt-3 border-t border-white/10 text-xs font-medium text-zinc-500 group-hover:text-emerald-400 transition-all ${isArabic ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
            aria-hidden
          >
            <span className="uppercase tracking-wider">
              {isArabic ? 'اقرأ' : 'Read'}
            </span>
            {isArabic ? (
              <FiArrowLeft className="w-3.5 h-3.5" />
            ) : (
              <FiArrowRight className="w-3.5 h-3.5" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
