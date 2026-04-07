'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiArrowLeft, FiLoader } from 'react-icons/fi';
import type { LocalizedBlog } from '@/core/types/web/blog';

const BATCH = 9;

const TECH_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface Props {
  allBlogs: LocalizedBlog[];
}

export function BlogInfiniteGrid({ allBlogs }: Props) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [visible, setVisible] = useState(BATCH);
  const [loading, setLoading] = useState(false);

  const hasMore = visible < allBlogs.length;
  const shown = allBlogs.slice(0, visible);

  const loadMore = useCallback(() => {
    setLoading(true);
    // Small delay so the spinner is visible and the transition feels intentional
    requestAnimationFrame(() => {
      setTimeout(() => {
        setVisible((v) => Math.min(v + BATCH, allBlogs.length));
        setLoading(false);
      }, 300);
    });
  }, [allBlogs.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        <AnimatePresence initial={false}>
          {shown.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: TECH_EASE,
                delay: i >= visible - BATCH ? (i % BATCH) * 0.06 : 0,
              }}
              className="h-full"
            >
              <Link
                href={`/${locale}/blog/${blog.slug}`}
                className="group block h-full outline-none"
              >
                <article className="press-scale h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 group-hover:shadow-lg group-hover:shadow-zinc-200/50 dark:group-hover:shadow-black/50 group-focus-visible:ring-2 group-focus-visible:ring-primary-500/40">
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Category + Date row */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: blog.category.color }}
                        />
                        {blog.category.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 shrink-0">
                        <FiCalendar className="w-3 h-3" />
                        <time>
                          {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-2.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-5 flex-1">
                      {blog.listingExcerpt}
                    </p>

                    {/* Read indicator */}
                    <div
                      className={`mt-auto flex items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all ${isArabic ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
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
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            onClick={loadMore}
            disabled={loading}
            className="press-scale inline-flex items-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md disabled:opacity-60 disabled:cursor-wait"
          >
            {loading ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin-smooth" />
                <span>{isArabic ? 'جار التحميل…' : 'Loading…'}</span>
              </>
            ) : (
              <span>{isArabic ? 'عرض المزيد' : 'Load more'}</span>
            )}
          </button>
          <p className="text-xs font-mono text-zinc-400 tabular-nums">
            {shown.length} / {allBlogs.length}
          </p>
        </div>
      )}

      {/* End state */}
      {!hasMore && allBlogs.length > BATCH && (
        <p className="mt-10 text-center text-xs font-mono text-zinc-400 dark:text-zinc-500">
          {isArabic ? 'وصلت لنهاية المقالات' : "You've reached the end"}
        </p>
      )}
    </>
  );
}
