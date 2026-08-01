import { queryOptions } from '@tanstack/react-query';

import { getAuction, getAuctionBets, getAuctions } from './auction-api';
import type {
  AuctionBetsParams,
  AuctionDetailParams,
  AuctionListRequest,
} from './auction-api';

export const auctionKeys = {
  all: ['auctions'] as const,
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (params: AuctionListRequest) =>
    [...auctionKeys.lists(), params] as const,
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: ({ auctionUuid }: AuctionDetailParams) =>
    [...auctionKeys.details(), auctionUuid] as const,
  bets: ({ auctionUuid, showAll = false }: AuctionBetsParams) =>
    [...auctionKeys.detail({ auctionUuid }), 'bets', { showAll }] as const,
};

/** Настройки запроса списка аукционов. */
export function auctionListQueryOptions(params: AuctionListRequest = {}) {
  return queryOptions({
    queryKey: auctionKeys.list(params),
    queryFn: ({ signal }) => getAuctions(params, signal),
  });
}

/** Настройки запроса подробной информации об аукционе. */
export function auctionDetailQueryOptions(params: AuctionDetailParams) {
  return queryOptions({
    queryKey: auctionKeys.detail(params),
    queryFn: ({ signal }) => getAuction(params, signal),
  });
}

/** Настройки запроса истории ставок аукциона. */
export function auctionBetsQueryOptions(params: AuctionBetsParams) {
  return queryOptions({
    queryKey: auctionKeys.bets(params),
    queryFn: ({ signal }) => getAuctionBets(params, signal),
  });
}
