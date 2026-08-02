import { Gavel } from 'lucide-react';
import { useRef } from 'react';

import { buttonVariants } from '@/shared/ui/button';
import { SheetTrigger } from '@/shared/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import type { AuctionDetail } from '@/entities/auction';

import { usePlaceAuctionBet } from '../model/use-place-auction-bet';
import { PlaceAuctionBetSheet } from './PlaceAuctionBetSheet';

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
  const { handleOpenChange, isPending, open, submit } = usePlaceAuctionBet({
    auctionUuid,
  });

  return (
    <PlaceAuctionBetSheet
      inputRef={priceInputRef}
      isPending={isPending}
      open={open}
      trading={trading}
      onOpenChange={handleOpenChange}
      onSubmit={submit}
    >
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
    </PlaceAuctionBetSheet>
  );
};
