import { Link } from '@tanstack/react-router';

import { AuctionCard } from '@/entities/auction';
import { SearchPagination } from '@/shared/router/search-pagination';
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

          const card = <AuctionCard auction={auction} />;

          return auctionUuid ? (
            <Link
              key={auctionKey}
              className="block rounded-xl text-foreground no-underline outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              to="/auctions/$auctionUuid"
              params={{ auctionUuid }}
            >
              {card}
            </Link>
          ) : (
            <div key={auctionKey}>{card}</div>
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
