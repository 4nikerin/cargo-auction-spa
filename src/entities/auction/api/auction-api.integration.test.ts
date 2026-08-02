import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
  getAuction,
  getAuctionBets,
  getAuctions,
  setBet,
} from '@/entities/auction';
import {
  activeAuctionUuid,
  fixedPriceAuctionUuid,
  requestAuctionUuid,
} from '@/shared/api/mocks/fixtures';
import { mockServer } from '@/shared/api/mocks/server';
import { resetMockStore } from '@/shared/api/mocks/store';

/**
 * В тестах браузерный Service Worker не запускается. setupServer перехватывает
 * те же HTTP-запросы в Node.js, поэтому проверяется вся цепочка:
 * auction-api -> openapi-fetch -> MSW handlers -> mock store.
 */
beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  // Каждый тест получает исходные данные и не зависит от предыдущих сценариев.
  resetMockStore();
});

afterAll(() => {
  mockServer.close();
});

describe('API аукционов с MSW', () => {
  it('возвращает список аукционов', async () => {
    const response = await getAuctions({ page: 1, per_page: 5 });

    expect(response.meta).toMatchObject({
      current_page: 1,
      last_page: 2,
      per_page: 5,
      total: 6,
    });
    expect(response.data).toHaveLength(5);
    expect(response.data?.[0]?.main?.cargo_num).toBe('AU-10482');
  });

  it('применяет основные фильтры и пагинацию', async () => {
    const filtered = await getAuctions({
      page: 1,
      per_page: 1,
      cargo_num: '10482',
      status: ['Leading'],
      statuses: [2],
      auc_type: ['Down'],
      load_city: 'моск',
      unload_city: 'казань',
      load_date_from: '2026-08-03T00:00:00+03:00',
      load_date_to: '2026-08-03T23:59:59+03:00',
      is_available: true,
      is_bidder: true,
      current_price_from: 180_000,
      current_price_to: 190_000,
    });

    expect(filtered.meta?.total).toBe(1);
    expect(filtered.data?.[0]?.main?.order_uid).toBe(activeAuctionUuid);

    const secondPage = await getAuctions({ page: 2, per_page: 2 });

    expect(secondPage.meta).toMatchObject({
      current_page: 2,
      from: 3,
      to: 4,
      total: 6,
    });
    expect(secondPage.data).toHaveLength(2);
  });

  it('применяет расширенные фильтры OpenAPI в мок-бэкенде', async () => {
    const filtered = await getAuctions({
      mobile_statuses: [2],
      weight_from: 15,
      weight_to: 19,
      volume_from: 70,
      volume_to: 75,
      body_types: ['рефрижератор'],
      form_type: 'НДС',
      load_gc_id: 77,
      unload_gc_id: 16,
      unload_date_from: '2026-08-04T00:00:00+03:00',
      unload_date_to: '2026-08-04T23:59:59+03:00',
      create_date_from: '2026-07-29T00:00:00+03:00',
      create_date_to: '2026-07-29T23:59:59+03:00',
      start_time_from: '2026-07-31T00:00:00+03:00',
      start_time_to: '2026-07-31T23:59:59+03:00',
      stop_time_from: '2026-08-01T00:00:00+03:00',
      stop_time_to: '2026-08-01T23:59:59+03:00',
      is_favorite: true,
      customer: 'Фрост',
      customer_ids: [340],
      contractor: 'ТрансЛог',
      auction_ids: [101],
      price_per_km_from: 180,
      price_per_km_to: 190,
    });

    expect(filtered.meta?.total).toBe(1);
    expect(filtered.data?.[0]?.main?.order_uid).toBe(activeAuctionUuid);
  });

  it('сортирует аукционы по полям из OpenAPI', async () => {
    const [byCurrentPrice, byPricePerKm] = await Promise.all([
      getAuctions({ sort: { current_price: 'asc' } }),
      getAuctions({ sort: { price_per_km: 'desc' } }),
    ]);

    expect(byCurrentPrice.data?.[0]?.main?.order_uid).toBe(
      fixedPriceAuctionUuid,
    );
    expect(byPricePerKm.data?.[0]?.main?.order_uid).toBe(activeAuctionUuid);
  });

  it('возвращает типизированную ошибку 404', async () => {
    const request = getAuction({
      auctionUuid: '00000000-0000-4000-8000-000000000000',
    });

    await expect(request).rejects.toMatchObject({
      status: 404,
      problem: {
        code: 'resource_not_found',
      },
    });
  });

  it('возвращает ошибки валидации для некорректной ставки', async () => {
    const request = setBet({
      auctionUuid: activeAuctionUuid,
      body: { price: 0 },
    });

    await expect(request).rejects.toMatchObject({
      status: 422,
      problem: {
        code: 'validation_failed',
        errors: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_price',
            field: 'price',
          }),
        ]),
      },
    });
  });

  it('проверяет возможность ставки и соблюдение шага цены', async () => {
    await expect(
      setBet({
        auctionUuid: fixedPriceAuctionUuid,
        body: { price: 95_000 },
      }),
    ).rejects.toMatchObject({
      status: 422,
      problem: {
        errors: [expect.objectContaining({ code: 'bet_not_allowed' })],
      },
    });

    await expect(
      setBet({
        auctionUuid: activeAuctionUuid,
        body: { price: 179_000 },
      }),
    ).rejects.toMatchObject({
      status: 422,
      problem: {
        errors: [expect.objectContaining({ code: 'invalid_step' })],
      },
    });
  });

  it('возвращает пустой список, когда история ставок скрыта', async () => {
    const betList = await getAuctionBets({
      auctionUuid: requestAuctionUuid,
      showAll: true,
    });

    expect(betList.bets).toEqual([]);
  });

  it('добавляет отменённые ставки только при включённом showAll', async () => {
    const [activeBets, allBets] = await Promise.all([
      getAuctionBets({ auctionUuid: activeAuctionUuid }),
      getAuctionBets({ auctionUuid: activeAuctionUuid, showAll: true }),
    ]);

    expect(activeBets.bets).toHaveLength(2);
    expect(activeBets.bets.every((bet) => !bet.is_rejected)).toBe(true);
    expect(allBets.bets).toHaveLength(3);
    expect(allBets.bets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          is_rejected: true,
          cancel_reason: 'Ставка отменена перевозчиком',
        }),
      ]),
    );
  });

  // Ставка должна изменить все связанные представления одних данных так же,
  // как это сделал бы настоящий бэкенд: список, карточку и историю ставок.
  it('обновляет список, карточку и историю после корректной ставки', async () => {
    await setBet({
      auctionUuid: activeAuctionUuid,
      body: { price: 180_000 },
    });

    const [list, auction, betList] = await Promise.all([
      getAuctions({ cargo_num: 'AU-10482' }),
      getAuction({ auctionUuid: activeAuctionUuid }),
      getAuctionBets({ auctionUuid: activeAuctionUuid, showAll: true }),
    ]);

    expect(list.data?.[0]?.trading?.price?.current).toBe(180_000);
    expect(list.data?.[0]?.trading?.status_mobile).toBe('Leading');
    expect(auction.trading.price?.current).toBe(180_000);
    expect(auction.trading.price?.available).toBe(175_000);
    expect(auction.trading.your?.last_bet_with_vat).toBe(180_000);
    expect(betList.bets).toHaveLength(4);
    expect(betList.bets[0]?.price_with_vat).toBe(180_000);
    expect(betList.bets[0]?.organization_name).toBe('ООО ТрансЛог');
  });
});
