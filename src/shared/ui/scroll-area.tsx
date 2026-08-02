import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  children: ReactNode;
  contentClassName?: string;
  orientation?: 'horizontal' | 'vertical';
  viewportClassName?: string;
}

export const ScrollArea = ({
  children,
  className,
  contentClassName,
  orientation = 'vertical',
  viewportClassName,
  ...props
}: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className={cn('size-full overscroll-contain', viewportClassName)}
    >
      <ScrollAreaPrimitive.Content className={contentClassName}>
        {children}
      </ScrollAreaPrimitive.Content>
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        'pointer-events-none absolute z-10 flex touch-none p-0.5 opacity-0 transition-opacity select-none data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100',
        orientation === 'vertical' && 'inset-y-0 right-0 w-2.5',
        orientation === 'horizontal' && 'inset-x-0 bottom-0 h-2.5 flex-col',
      )}
      orientation={orientation}
    >
      <ScrollAreaPrimitive.Thumb className="flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
);
