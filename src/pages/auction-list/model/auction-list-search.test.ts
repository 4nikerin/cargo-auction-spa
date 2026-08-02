import { describe, expect, it } from 'vitest';

import {
  getAuctionListPagination,
  toAuctionListRequest,
} from './auction-list-search';

describe('пагинация списка аукционов', () => {
  it('использует запрошенную страницу, если API не вернул meta', () => {
    expect(getAuctionListPagination(undefined, 3)).toEqual({
      currentPage: 3,
      totalPages: 3,
    });
  });

  it('использует метаданные ответа, когда они доступны', () => {
    expect(
      getAuctionListPagination({ current_page: 2, last_page: 5 }, 3),
    ).toEqual({
      currentPage: 2,
      totalPages: 5,
    });
  });

  it('добавляет в запрос значения пагинации по умолчанию', () => {
    expect(toAuctionListRequest({})).toMatchObject({
      page: 1,
      per_page: 5,
    });
  });

  it('преобразует выбранное количество аукционов в per_page OpenAPI', () => {
    expect(toAuctionListRequest({ perPage: 50 })).toMatchObject({
      page: 1,
      per_page: 50,
    });
  });

  it('преобразует сортировку из URL в формат OpenAPI', () => {
    expect(toAuctionListRequest({ sort: 'oldest' })).toMatchObject({
      is_oldest: true,
    });
    expect(toAuctionListRequest({ sort: 'price-desc' })).toMatchObject({
      sort: { current_price: 'desc' },
    });
  });

  it('преобразует расширенные фильтры в поля AuctionListRequest', () => {
    expect(
      toAuctionListRequest({
        status: ['Leading', 'Losing'],
        type: ['Down', 'Request'],
        mobileStatuses: [2, 3],
        auctionStatuses: [1, 2],
        weightFrom: 5,
        weightTo: 20,
        volumeFrom: 10,
        volumeTo: 82,
        bodyTypes: ['тентованный', 'фургон'],
        formType: 'Безналичная',
        international: true,
        from: 59,
        loadRadius: 100,
        to: 77,
        unloadRadius: 50,
        loadDateFrom: '2026-08-01T10:00:00Z',
        unloadDateTo: '2026-08-05T18:00:00Z',
        createdFrom: '2026-07-01T00:00:00Z',
        biddingStartsTo: '2026-08-02T00:00:00Z',
        biddingEndsFrom: '2026-08-03T00:00:00Z',
        available: true,
        favorite: true,
        participated: true,
        customer: 'ЛИМ',
        customerIds: [330, 340],
        contractor: 'ТрансЛог',
        auctionIds: [101, 102],
        replaceExternalPads: true,
        priceFrom: 90_000,
        priceTo: 200_000,
        pricePerKmFrom: 50,
        pricePerKmTo: 200,
      }),
    ).toMatchObject({
      status: ['Leading', 'Losing'],
      auc_type: ['Down', 'Request'],
      mobile_statuses: [2, 3],
      statuses: [1, 2],
      weight_from: 5,
      weight_to: 20,
      volume_from: 10,
      volume_to: 82,
      body_types: ['тентованный', 'фургон'],
      form_type: 'Безналичная',
      is_international_shipment: true,
      load_gc_id: 59,
      load_range: 100,
      unload_gc_id: 77,
      unload_range: 50,
      load_date_from: '2026-08-01T10:00:00.000Z',
      unload_date_to: '2026-08-05T18:00:00.000Z',
      create_date_from: '2026-07-01T00:00:00.000Z',
      start_time_to: '2026-08-02T00:00:00.000Z',
      stop_time_from: '2026-08-03T00:00:00.000Z',
      is_available: true,
      is_favorite: true,
      is_bidder: true,
      customer: 'ЛИМ',
      customer_ids: [330, 340],
      contractor: 'ТрансЛог',
      auction_ids: [101, 102],
      replace_external_pads: true,
      current_price_from: 90_000,
      current_price_to: 200_000,
      price_per_km_from: 50,
      price_per_km_to: 200,
    });
  });
});
