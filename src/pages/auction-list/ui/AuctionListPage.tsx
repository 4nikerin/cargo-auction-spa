import { useQuery } from '@tanstack/react-query';

import { auctionListQueryOptions } from '@/entities/auction';

import {
  getAuctionListPageSize,
  getAuctionListPagination,
  getAuctionListSort,
  toAuctionListRequest,
} from '../model/auction-list-search';
import { useAuctionListSearch } from '../model/use-auction-list-search';
import { AuctionList } from './AuctionList';
import { AuctionListToolbar } from './AuctionListToolbar';
import { StickyAuctionFilters } from './StickyAuctionFilters';
import {
  AuctionListError,
  AuctionListSkeleton,
  EmptyAuctionList,
} from './states';

export const AuctionListPage = () => {
  const { filters, isRoutePending, search, setFilters, setPageSize, setSort } =
    useAuctionListSearch();
  const params = toAuctionListRequest(search);
  const query = useQuery(auctionListQueryOptions(params));
  const auctions = query.data?.data ?? [];
  const meta = query.data?.meta;
  const pagination = getAuctionListPagination(meta, search.page);
  const sort = getAuctionListSort(search);
  const pageSize = getAuctionListPageSize(search);
  const isListPending = isRoutePending || query.isPending;

  return (
    <main className="w-full pt-4 pb-8 lg:pb-10">
      <StickyAuctionFilters value={filters} onChange={setFilters} />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AuctionListToolbar
          total={meta?.total}
          sort={sort}
          pageSize={pageSize}
          isPending={isListPending}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
        />

        <section aria-label="Список аукционов">
          {isListPending && <AuctionListSkeleton />}

          {!isListPending && query.isError && (
            <AuctionListError
              error={query.error}
              onRetry={() => {
                void query.refetch();
              }}
            />
          )}

          {!isListPending &&
            query.isSuccess &&
            (auctions.length ? (
              <AuctionList
                auctions={auctions}
                isFetching={query.isFetching}
                pagination={pagination}
              />
            ) : (
              <EmptyAuctionList />
            ))}
        </section>
      </div>
    </main>
  );
};
