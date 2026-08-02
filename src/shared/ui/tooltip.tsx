import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { cn } from '@/shared/lib/cn';

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({
  className,
  side = 'top',
  sideOffset = 8,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'side' | 'sideOffset'>) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner
      className="isolate z-50"
      side={side}
      sideOffset={sideOffset}
    >
      <TooltipPrimitive.Popup
        className={cn(
          'max-w-xs rounded-lg bg-foreground px-3 py-1.5 text-xs text-background shadow-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
);

export { Tooltip, TooltipContent, TooltipTrigger };
