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

describe('auction API with MSW', () => {
  it('returns the auction list', async () => {
    const response = await getAuctions();

    expect(response.meta?.total).toBe(4);
    expect(response.data).toHaveLength(4);
    expect(response.data?.[0]?.main?.cargo_num).toBe('AU-10482');
  });

  it('applies required filters and pagination', async () => {
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
      total: 4,
    });
    expect(secondPage.data).toHaveLength(2);
  });

  it('returns a typed 404 problem', async () => {
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

  it('returns validation errors for an invalid bet', async () => {
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

  it('validates whether a bet is allowed and follows the price step', async () => {
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

  it('returns an empty list when bet history is hidden', async () => {
    const betList = await getAuctionBets({
      auctionUuid: requestAuctionUuid,
      showAll: true,
    });

    expect(betList.bets).toEqual([]);
  });

  it('includes canceled bets only when showAll is enabled', async () => {
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
  it('updates list, detail and bet history after a valid bet', async () => {
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
