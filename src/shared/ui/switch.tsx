import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/cn';

const Switch = ({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) => {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-input p-0.5 outline-none transition-colors data-checked:bg-primary focus-visible:ring-3 focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block size-4 rounded-full bg-background shadow-sm transition-transform data-checked:translate-x-4" />
    </SwitchPrimitive.Root>
  );
};

export { Switch };
