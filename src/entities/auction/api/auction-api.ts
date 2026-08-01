import { apiClient, unwrapApiResponse } from '@/shared/api';
import type { components } from '@/shared/api';

export type AuctionListRequest = components['schemas']['AuctionListRequest'];

export interface AuctionDetailParams {
  auctionUuid: string;
}

export interface AuctionBetsParams {
  auctionUuid: string;
  showAll?: boolean;
}

export type SetBetRequest = components['schemas']['SetBetRequest'];

export interface SetBetParams {
  auctionUuid: string;
  body: SetBetRequest;
}

/** Возвращает список аукционов с учётом фильтров и пагинации. */
export async function getAuctions(
  params: AuctionListRequest = {},
  signal?: AbortSignal,
) {
  return unwrapApiResponse(
    await apiClient.POST('/auctions/list', {
      body: params,
      signal: signal ?? null,
    }),
  );
}

/** Возвращает подробную информацию об аукционе. */
export async function getAuction(
  { auctionUuid }: AuctionDetailParams,
  signal?: AbortSignal,
) {
  return unwrapApiResponse(
    await apiClient.GET('/auctions/{auctionUuid}', {
      params: {
        path: {
          auctionUuid,
        },
      },
      signal: signal ?? null,
    }),
  );
}

/** Возвращает историю ставок аукциона. */
export async function getAuctionBets(
  { auctionUuid, showAll = false }: AuctionBetsParams,
  signal?: AbortSignal,
) {
  return unwrapApiResponse(
    await apiClient.GET('/auctions/{auctionUuid}/bets', {
      params: {
        path: {
          auctionUuid,
        },
        query: {
          all: showAll,
        },
      },
      signal: signal ?? null,
    }),
  );
}

/** Размещает ставку в аукционе. */
export async function setBet(
  { auctionUuid, body }: SetBetParams,
  signal?: AbortSignal,
) {
  return unwrapApiResponse(
    await apiClient.POST('/auctions/{auctionUuid}/bets', {
      params: {
        path: {
          auctionUuid,
        },
      },
      body,
      signal: signal ?? null,
    }),
  );
}
