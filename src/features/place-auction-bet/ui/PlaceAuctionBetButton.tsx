import { Gavel, X } from 'lucide-react';
import { useRef } from 'react';

import { buttonVariants } from '@/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import type { AuctionDetail } from '@/entities/auction';

import { usePlaceAuctionBet } from '../model/use-place-auction-bet';
import { PlaceAuctionBetForm } from './PlaceAuctionBetForm';

interface PlaceAuctionBetButtonProps {
  auctionUuid: string;
  trading: AuctionDetail['trading'];
}

export const PlaceAuctionBetButton = ({
  auctionUuid,
  trading,
}: PlaceAuctionBetButtonProps) => {
  const priceInputRef = useRef<HTMLInputElement>(null);
  const canPlaceBet = trading.can_set_bet === true;
  const price = trading.price;
  const { handleOpenChange, isPending, open, submit } = usePlaceAuctionBet({
    auctionUuid,
  });

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <Tooltip disabled={canPlaceBet}>
        <TooltipTrigger
          delay={200}
          render={
            <span
              className="inline-flex"
              tabIndex={canPlaceBet ? undefined : 0}
            />
          }
        >
          <SheetTrigger className={buttonVariants()} disabled={!canPlaceBet}>
            <Gavel data-icon="inline-start" aria-hidden="true" />
            Сделать ставку
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          Ставки недоступны для текущего пользователя
        </TooltipContent>
      </Tooltip>

      <SheetContent initialFocus={priceInputRef}>
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
          inputRef={priceInputRef}
          initialPrice={price?.available}
          isPending={isPending}
          price={price}
          onCancel={() => handleOpenChange(false)}
          onSubmit={submit}
        />
      </SheetContent>
    </Sheet>
  );
};
