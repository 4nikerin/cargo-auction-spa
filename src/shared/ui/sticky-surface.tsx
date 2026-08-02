import { useIntersectionObserver } from 'usehooks-ts';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface StickySurfaceProps {
  children: ReactNode;
  className?: string;
}

export const StickySurface = ({ children, className }: StickySurfaceProps) => {
  const { ref: sentinelRef, isIntersecting: isSentinelVisible } =
    useIntersectionObserver({
      initialIsIntersecting: true,
      threshold: 1,
    });

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <div
        className={cn(
          'sticky top-0 z-30 border-b border-transparent transition-[background-color,border-color,box-shadow]',
          !isSentinelVisible &&
            'border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};
