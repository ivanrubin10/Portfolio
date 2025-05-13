'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLinkProps {
  label?: string;
  targetId: string;
  className?: string;
}

/**
 * SkipLink component allows keyboard users to bypass navigation
 * and go directly to the main content, enhancing accessibility.
 */
const SkipLink: React.FC<SkipLinkProps> = ({
  label = 'Skip to content',
  targetId,
  className,
}) => {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50',
        'px-4 py-2 bg-background border border-border rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-ring',
        className
      )}
    >
      {label}
    </a>
  );
};

export default SkipLink; 