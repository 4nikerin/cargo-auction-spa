import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import { cn } from '@/shared/lib/cn';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = ({
  className,
  align = 'start',
  side = 'bottom',
  sideOffset = 10,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        className="isolate z-50"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            'w-72 max-w-[calc(100vw-2rem)] rounded-2xl bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
};

export { Popover, PopoverContent, PopoverTrigger };
