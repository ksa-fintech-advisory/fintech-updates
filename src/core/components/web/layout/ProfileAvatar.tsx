'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PUBLIC_PROFILE_IMAGE_SRC } from '@/core/data/publicProfile';

type Props = {
  size: number;
  alt: string;
  fallbackText: string;
  variant?: 'circle' | 'rounded';
  className?: string;
  priority?: boolean;
  /** When the image fails to load, use Amiri Quran for the initial (author name). */
  authorNameFont?: boolean;
};

export function ProfileAvatar({
  size,
  alt,
  fallbackText,
  variant = 'circle',
  className = '',
  priority = false,
  authorNameFont = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const initial = (fallbackText.trim().charAt(0) || 'M').toUpperCase();
  const radius = variant === 'circle' ? 'rounded-full' : 'rounded-2xl';

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-zinc-900 text-white dark:bg-white dark:text-black ${radius} ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(14, size * 0.38) }}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <span className={authorNameFont ? 'font-amiriQuran font-semibold' : 'font-bold'}>{initial}</span>
      </div>
    );
  }

  return (
    <Image
      src={PUBLIC_PROFILE_IMAGE_SRC}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={`shrink-0 object-cover ring-2 ring-zinc-200 dark:ring-zinc-700 ${radius} ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
