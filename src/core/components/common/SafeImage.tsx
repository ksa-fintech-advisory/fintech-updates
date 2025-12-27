'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const PLACEHOLDER_IMAGE = '/placeholder-image.svg';

export default function SafeImage({ 
  src, 
  alt, 
  fill, 
  width, 
  height, 
  className, 
  priority, 
  sizes 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER_IMAGE);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  };

  // If no src provided, use placeholder immediately
  const finalSrc = !src || src.trim() === '' ? PLACEHOLDER_IMAGE : imgSrc;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={handleError}
      unoptimized={finalSrc === PLACEHOLDER_IMAGE}
    />
  );
}
