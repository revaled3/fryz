'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends Omit<NextImageProps, 'onLoad'> {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  hover?: boolean;
}

const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  auto: '',
};

export function Image({
  className,
  aspectRatio = 'auto',
  hover = false,
  alt,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-cream-200',
        aspectRatios[aspectRatio],
        hover && 'image-luxury',
        className
      )}
    >
      <NextImage
        className={cn(
          'object-cover transition-all duration-elegant ease-elegant',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        )}
        onLoad={() => setIsLoaded(true)}
        alt={alt}
        {...props}
      />
    </div>
  );
}
