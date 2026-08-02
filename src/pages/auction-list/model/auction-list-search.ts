import { z } from 'zod';

import { auctionFiltersSchema } from '@/features/filter-auctions';
import type { AuctionListMeta, AuctionListRequest } from '@/entities/auction';
import type { AuctionFiltersValue } from '@/features/filter-auctions';

const FIRST_PAGE = 1;

export const auctionListPageSizeOptions = [5, 20, 50, 100] as const;

export type AuctionListPageSize = (typeof auctionListPageSizeOptions)[number];

export const DEFAULT_AUCTION_LIST_PAGE_SIZE: AuctionListPageSize = 5;

export const auctionListSortOptions = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'oldest', label: 'Сначала старые' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'price-per-km-asc', label: 'Цена за км: по возрастанию' },
  { value: 'price-per-km-desc', label: 'Цена за км: по убыванию' },
] as const;

export type AuctionListSort = (typeof auctionListSortOptions)[number]['value'];

export const DEFAULT_AUCTION_LIST_SORT: AuctionListSort = 'newest';

export interface AuctionListPagination {
  currentPage: number;
  totalPages: number;
}

/** Проверяет и очищает query-параметры страницы до передачи в UI и API. */
export const auctionListSearchSchema = auctionFiltersSchema.extend({
  page: z.number().int().min(2).optional().catch(undefined),
  perPage: z.coerce
    .number()
    .pipe(z.union([z.literal(5), z.literal(20), z.literal(50), z.literal(100)]))
    .optional()
    .catch(undefined),
  sort: z
    .enum(auctionListSortOptions.map(({ value }) => value))
    .optional()
    .catch(undefined),
});

export type AuctionListSearch = z.infer<typeof auctionListSearchSchema>;

export const toAuctionFiltersValue = (
  search: AuctionListSearch,
): AuctionFiltersValue => {
  return auctionFiltersSchema.parse(search);
};

export const getAuctionListSort = (search: AuctionListSearch) => {
  return search.sort ?? DEFAULT_AUCTION_LIST_SORT;
};

export const getAuctionListPageSize = (search: AuctionListSearch) => {
  return search.perPage ?? DEFAULT_AUCTION_LIST_PAGE_SIZE;
};

/** Нормализует необязательные метаданные API для компонентов пагинации. */
export const getAuctionListPagination = (
  meta: AuctionListMeta | undefined,
  requestedPage: number | undefined,
): AuctionListPagination => {
  const currentPage = Math.max(
    FIRST_PAGE,
    meta?.current_page ?? requestedPage ?? FIRST_PAGE,
  );
  const totalPages = Math.max(
    FIRST_PAGE,
    currentPage,
    meta?.last_page ?? currentPage,
  );

  return { currentPage, totalPages };
};

/** Преобразует короткие параметры URL в тело запроса из OpenAPI-контракта. */
export const toAuctionListRequest = (
  search: AuctionListSearch,
): AuctionListRequest => {
  const request: AuctionListRequest = {
    page: search.page ?? FIRST_PAGE,
    per_page: getAuctionListPageSize(search),
  };

  if (search.cargo) request.cargo_num = search.cargo;
  if (search.status) request.status = search.status;
  if (search.type) request.auc_type = search.type;
  if (search.mobileStatuses) request.mobile_statuses = search.mobileStatuses;
  if (search.auctionStatuses) request.statuses = search.auctionStatuses;
  if (search.weightFrom != null) request.weight_from = search.weightFrom;
  if (search.weightTo != null) request.weight_to = search.weightTo;
  if (search.volumeFrom != null) request.volume_from = search.volumeFrom;
  if (search.volumeTo != null) request.volume_to = search.volumeTo;
  if (search.bodyTypes) request.body_types = search.bodyTypes;
  if (search.formType) request.form_type = search.formType;
  if (search.international != null) {
    request.is_international_shipment = search.international;
  }
  if (search.from != null) request.load_gc_id = search.from;
  if (search.loadRadius != null) request.load_range = search.loadRadius;
  if (search.to != null) request.unload_gc_id = search.to;
  if (search.unloadRadius != null) request.unload_range = search.unloadRadius;
  if (search.loadDateFrom)
    request.load_date_from = toApiDate(search.loadDateFrom);
  if (search.loadDateTo) request.load_date_to = toApiDate(search.loadDateTo);
  if (search.unloadDateFrom) {
    request.unload_date_from = toApiDate(search.unloadDateFrom);
  }
  if (search.unloadDateTo)
    request.unload_date_to = toApiDate(search.unloadDateTo);
  if (search.createdFrom)
    request.create_date_from = toApiDate(search.createdFrom);
  if (search.createdTo) request.create_date_to = toApiDate(search.createdTo);
  if (search.biddingStartsFrom) {
    request.start_time_from = toApiDate(search.biddingStartsFrom);
  }
  if (search.biddingStartsTo) {
    request.start_time_to = toApiDate(search.biddingStartsTo);
  }
  if (search.biddingEndsFrom) {
    request.stop_time_from = toApiDate(search.biddingEndsFrom);
  }
  if (search.biddingEndsTo) {
    request.stop_time_to = toApiDate(search.biddingEndsTo);
  }
  if (search.available != null) request.is_available = search.available;
  if (search.favorite != null) request.is_favorite = search.favorite;
  if (search.participated != null) request.is_bidder = search.participated;
  if (search.customer) request.customer = search.customer;
  if (search.customerIds) request.customer_ids = search.customerIds;
  if (search.contractor) request.contractor = search.contractor;
  if (search.auctionIds) request.auction_ids = search.auctionIds;
  if (search.replaceExternalPads != null) {
    request.replace_external_pads = search.replaceExternalPads;
  }
  if (search.priceFrom != null) request.current_price_from = search.priceFrom;
  if (search.priceTo != null) request.current_price_to = search.priceTo;
  if (search.pricePerKmFrom != null) {
    request.price_per_km_from = search.pricePerKmFrom;
  }
  if (search.pricePerKmTo != null) {
    request.price_per_km_to = search.pricePerKmTo;
  }

  switch (search.sort) {
    case 'oldest':
      request.is_oldest = true;
      break;
    case 'price-asc':
      request.sort = { current_price: 'asc' };
      break;
    case 'price-desc':
      request.sort = { current_price: 'desc' };
      break;
    case 'price-per-km-asc':
      request.sort = { price_per_km: 'asc' };
      break;
    case 'price-per-km-desc':
      request.sort = { price_per_km: 'desc' };
      break;
  }

  return request;
};

const toApiDate = (value: string) => {
  return new Date(value).toISOString();
};
