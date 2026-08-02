import { X } from 'lucide-react';
import type { ReactNode, RefObject } from 'react';

import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/shared/ui/sheet';
import type { AuctionDetail } from '@/entities/auction';

import { PlaceAuctionBetForm } from './PlaceAuctionBetForm';

interface PlaceAuctionBetSheetProps {
  children: ReactNode;
  inputRef: RefObject<HTMLInputElement | null>;
  isPending: boolean;
  open: boolean;
  trading: AuctionDetail['trading'];
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (price: number) => Promise<void>;
}

export const PlaceAuctionBetSheet = ({
  children,
  inputRef,
  isPending,
  open,
  trading,
  onOpenChange,
  onSubmit,
}: PlaceAuctionBetSheetProps) => {
  const price = trading.price;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}
      <SheetContent initialFocus={inputRef}>
        <header className="flex shrink-0 items-center justify-between border-b px-5 py-4 sm:px-6">
          <SheetTitle className="text-2xl font-semibold">
            Сделать ставку
          </SheetTitle>
          <SheetClose
            className="rounded-full p-2 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
            disabled={isPending}
            aria-label="Закрыть форму ставки"
          >
            <X className="size-5" aria-hidden="true" />
          </SheetClose>
        </header>

        <PlaceAuctionBetForm
          inputRef={inputRef}
          initialPrice={price?.available}
          isPending={isPending}
          price={price}
          onCancel={() => onOpenChange(false)}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};
