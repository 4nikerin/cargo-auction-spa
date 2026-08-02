import { Link } from '@tanstack/react-router';

import { AuctionCard, hasAuctionOwnBet } from '@/entities/auction';
import { PlaceAuctionBetListButton } from '@/features/place-auction-bet';
import { ViewAuctionBetsButton } from '@/features/view-auction-bets';
import { SearchPagination } from '@/shared/router/search-pagination';
import { Button } from '@/shared/ui/button';
import type { AuctionListItem } from '@/entities/auction';

import type { AuctionListPagination } from '../model/auction-list-search';

interface AuctionListProps {
  auctions: AuctionListItem[];
  isFetching: boolean;
  pagination: AuctionListPagination;
}

export const AuctionList = ({
  auctions,
  isFetching,
  pagination,
}: AuctionListProps) => {
  return (
    <>
      <div className="space-y-4" aria-busy={isFetching}>
        {auctions.map((auction, index) => {
          const auctionUuid = auction.main?.order_uid;
          // OpenAPI не делает UUID обязательным, поэтому сохраняем fallback для неполных данных.
          const auctionKey = auctionUuid ?? auction.main?.id ?? index;

          const hasOwnBet = hasAuctionOwnBet(auction.trading);
          const canPlaceBet = auction.trading?.can_set_bet === true;

          const action = !auctionUuid ? (
            <Button size="sm" disabled>
              Ставки недоступны
            </Button>
          ) : hasOwnBet ? (
            canPlaceBet ? (
              <PlaceAuctionBetListButton
                auctionUuid={auctionUuid}
                label="Изменить ставку"
              />
            ) : (
              <ViewAuctionBetsButton auctionUuid={auctionUuid} />
            )
          ) : canPlaceBet ? (
            <PlaceAuctionBetListButton
              auctionUuid={auctionUuid}
              label="Сделать ставку"
            />
          ) : (
            <Button size="sm" disabled>
              Ставки недоступны
            </Button>
          );

          return (
            <AuctionCard
              key={auctionKey}
              auction={auction}
              action={action}
              detailsLink={
                auctionUuid ? (
                  <Link
                    className="absolute inset-0 z-10 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    to="/auctions/$auctionUuid"
                    params={{ auctionUuid }}
                    aria-label={`Открыть аукцион ${auction.main?.cargo_num ?? auctionUuid}`}
                  />
                ) : null
              }
            />
          );
        })}
      </div>

      {pagination.totalPages > 1 ? (
        <SearchPagination
          className="mt-6"
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      ) : null}
    </>
  );
};
