import { getRouteApi, useRouterState } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

import type { AuctionFiltersValue } from '@/features/filter-auctions';

import {
  DEFAULT_AUCTION_LIST_PAGE_SIZE,
  DEFAULT_AUCTION_LIST_SORT,
  toAuctionFiltersValue,
} from './auction-list-search';
import type {
  AuctionListPageSize,
  AuctionListSort,
} from './auction-list-search';

const auctionsRouteApi = getRouteApi('/auctions/');

export const useAuctionListSearch = () => {
  const search = auctionsRouteApi.useSearch();
  const navigate = auctionsRouteApi.useNavigate();
  const isRoutePending = useRouterState({
    select: (state) => state.status === 'pending',
  });

  const filters = useMemo(() => toAuctionFiltersValue(search), [search]);
  const setFilters = useCallback(
    (nextFilters: AuctionFiltersValue) => {
      void navigate({
        search: {
          ...nextFilters,
          perPage: search.perPage,
          sort: search.sort,
        },
        replace: true,
      });
    },
    [navigate, search.perPage, search.sort],
  );
  const setSort = useCallback(
    (sort: AuctionListSort) => {
      void navigate({
        search: {
          ...search,
          page: undefined,
          sort: sort === DEFAULT_AUCTION_LIST_SORT ? undefined : sort,
        },
        replace: true,
      });
    },
    [navigate, search],
  );

  const setPageSize = useCallback(
    (pageSize: AuctionListPageSize) => {
      void navigate({
        search: {
          ...search,
          page: undefined,
          perPage:
            pageSize === DEFAULT_AUCTION_LIST_PAGE_SIZE ? undefined : pageSize,
        },
        replace: true,
      });
    },
    [navigate, search],
  );

  return {
    filters,
    isRoutePending,
    search,
    setFilters,
    setPageSize,
    setSort,
  };
};
