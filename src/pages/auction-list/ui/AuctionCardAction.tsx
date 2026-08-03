import { Link } from '@tanstack/react-router';

import { hasAuctionOwnBet } from '@/entities/auction';
import { Button, buttonVariants } from '@/shared/ui/button';
import type { AuctionListItem } from '@/entities/auction';

interface AuctionCardActionProps {
  auction: AuctionListItem;
}

export const AuctionCardAction = ({ auction }: AuctionCardActionProps) => {
  const auctionUuid = auction.main?.order_uid;
  const hasOwnBet = hasAuctionOwnBet(auction.trading);
  const canPlaceBet = auction.trading?.can_set_bet === true;

  if (!auctionUuid) {
    return (
      <Button size="sm" disabled>
        Ставки недоступны
      </Button>
    );
  }

  if (hasOwnBet && !canPlaceBet) {
    return (
      <Link
        className={buttonVariants({ size: 'sm', variant: 'outline' })}
        to="/auctions/$auctionUuid/bets"
        params={{ auctionUuid }}
      >
        Смотреть ставки
      </Link>
    );
  }

  if (canPlaceBet) {
    return (
      <Link
        className={buttonVariants({ size: 'sm' })}
        to="/auctions/$auctionUuid"
        params={{ auctionUuid }}
        search={{ action: 'place-bet' }}
      >
        {hasOwnBet ? 'Изменить ставку' : 'Сделать ставку'}
      </Link>
    );
  }

  return (
    <Button size="sm" disabled>
      Ставки недоступны
    </Button>
  );
};
