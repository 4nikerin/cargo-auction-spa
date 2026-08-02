import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import { cn } from '@/shared/lib/cn';

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetTitle = DialogPrimitive.Title;

const SheetContent = ({ className, ...props }: DialogPrimitive.Popup.Props) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
      <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex justify-end sm:p-4">
        <DialogPrimitive.Popup
          data-slot="sheet-content"
          className={cn(
            'flex h-dvh w-full flex-col overflow-hidden bg-background shadow-2xl outline-none data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right sm:h-full sm:max-w-xl sm:rounded-3xl',
            className,
          )}
          {...props}
        />
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
};

export { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger };
