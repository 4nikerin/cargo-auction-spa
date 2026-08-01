/**
 * Исходные типизированные данные мокового API.
 * Используются как неизменяемый шаблон для восстановления mock store.
 */
import type { components } from '@/shared/api/generated/schema';

type AuctionListResponse = components['schemas']['AuctionListResponseBase'];
type AuctionShowResponse = components['schemas']['AuctionShowResponse'];
type BetItem = components['schemas']['BetItem'];

export const activeAuctionUuid = '10000000-0000-4000-8000-000000000101';
export const losingAuctionUuid = '10000000-0000-4000-8000-000000000102';
export const requestAuctionUuid = '10000000-0000-4000-8000-000000000103';
export const fixedPriceAuctionUuid = '10000000-0000-4000-8000-000000000104';

export const auctionListResponse = {
  data: [
    {
      main: {
        id: 101,
        cargo_num: 'AU-10482',
        cargo_date: '2026-08-03T09:00:00+03:00',
        auc_type: 'Down',
        order_uid: activeAuctionUuid,
        created_at: '2026-07-29T10:15:00+03:00',
        price_per_km: 188.01,
      },
      organizer: {
        organization_name: 'ООО ФростЛайн',
        organization_inn: '7703769184',
      },
      route: {
        load: {
          city: 'Москва',
          address: 'ул. Промышленная, 12',
          date: '2026-08-03T09:00:00+03:00',
        },
        unload: {
          city: 'Казань',
          address: 'ул. Техническая, 8',
          date: '2026-08-04T16:00:00+03:00',
        },
      },
      cargo: {
        name: 'Мороженое',
        weight: 18,
        volume: 72,
        body_type: 'рефрижератор',
      },
      trading: {
        status: 'Auction',
        status_mobile: 'Leading',
        start_time: '2026-07-31T10:00:00+03:00',
        stop_time: '2026-08-01T18:00:00+03:00',
        can_set_bet: true,
        is_available: true,
        is_bidder: true,
        is_favorite: true,
        price: {
          current: 185_000,
          current_no_vat: 154_166.67,
        },
      },
    },
    {
      main: {
        id: 102,
        cargo_num: 'AU-10483',
        cargo_date: '2026-08-05T08:00:00+05:00',
        auc_type: 'Up',
        order_uid: losingAuctionUuid,
        created_at: '2026-07-28T14:30:00+05:00',
        price_per_km: 127.19,
      },
      organizer: {
        organization_name: 'АО УралМеталл',
        organization_inn: '6671002233',
      },
      route: {
        load: {
          city: 'Екатеринбург',
          address: 'ул. Монтажников, 4',
          date: '2026-08-05T08:00:00+05:00',
        },
        unload: {
          city: 'Самара',
          address: 'Заводское шоссе, 14',
          date: '2026-08-07T15:00:00+04:00',
        },
      },
      cargo: {
        name: 'Металлопрокат',
        weight: 20,
        volume: 40,
        body_type: 'бортовой',
      },
      trading: {
        status: 'Auction',
        status_mobile: 'Losing',
        start_time: '2026-07-31T11:00:00+05:00',
        stop_time: '2026-08-02T17:00:00+05:00',
        can_set_bet: true,
        is_available: true,
        is_bidder: true,
        price: {
          current: 145_000,
          current_no_vat: 120_833.33,
        },
      },
    },
    {
      main: {
        id: 103,
        cargo_num: 'AU-10484',
        cargo_date: '2026-08-06T10:00:00+05:00',
        auc_type: 'Request',
        order_uid: requestAuctionUuid,
        created_at: '2026-07-30T09:20:00+05:00',
        price_per_km: 57.51,
      },
      organizer: {
        organization_name: 'ООО ТехноСнаб',
        organization_inn: '5901004455',
      },
      route: {
        load: {
          city: 'Пермь',
          address: 'ул. Героев Хасана, 105',
          date: '2026-08-06T10:00:00+05:00',
        },
        unload: {
          city: 'Москва',
          address: 'Каширское шоссе, 23',
          date: '2026-08-08T18:00:00+03:00',
        },
      },
      cargo: {
        name: 'Бытовая техника',
        weight: 12,
        volume: 60,
        body_type: 'тентованный',
      },
      trading: {
        status: 'Auction',
        status_mobile: 'NotParticipating',
        start_time: '2026-07-31T12:00:00+05:00',
        stop_time: '2026-08-03T12:00:00+05:00',
        can_set_bet: true,
        is_available: true,
        is_bidder: false,
        price: {
          current: 98_000,
          current_no_vat: 81_666.67,
        },
      },
    },
    {
      main: {
        id: 104,
        cargo_num: 'AU-10485',
        cargo_date: '2026-08-07T09:00:00+03:00',
        auc_type: 'FixPrice',
        order_uid: fixedPriceAuctionUuid,
        created_at: '2026-07-30T11:00:00+03:00',
        price_per_km: 105.56,
      },
      organizer: {
        organization_name: 'ООО МебельПро',
        organization_inn: '7802006677',
      },
      route: {
        load: {
          city: 'Санкт-Петербург',
          address: 'Мебельная ул., 5',
          date: '2026-08-07T09:00:00+03:00',
        },
        unload: {
          city: 'Великий Новгород',
          address: 'Большая Московская ул., 20',
          date: '2026-08-07T18:00:00+03:00',
        },
      },
      cargo: {
        name: 'Мебель',
        weight: 8,
        volume: 55,
        body_type: 'фургон',
      },
      trading: {
        status: 'Planning',
        status_mobile: 'NotParticipating',
        start_time: '2026-08-01T10:00:00+03:00',
        stop_time: '2026-08-01T18:00:00+03:00',
        can_set_bet: false,
        is_available: false,
        is_bidder: false,
        price: {
          current: 95_000,
          current_no_vat: 79_166.67,
        },
      },
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 20,
    to: 4,
    total: 4,
  },
} satisfies AuctionListResponse;

export const auctionDetails: Record<string, AuctionShowResponse> = {
  [activeAuctionUuid]: {
    main: {
      id: 101,
      cargo_num: 'AU-10482',
      cargo_date: '2026-08-03T09:00:00+03:00',
      order_uid: activeAuctionUuid,
      auc_type: 'Down',
      created_at: '2026-07-29T10:15:00+03:00',
    },
    organizer: {
      organization_name: 'ООО ФростЛайн',
      organization_inn: '7703769184',
      organization_id: 340,
    },
    contacts: [
      {
        name: 'Мария Волкова',
        phone: '+74951234567',
        email: 'logistics@example.com',
      },
    ],
    cargo: {
      is_international: false,
      distance: 820,
      truck_count: 1,
      body_type: 'рефрижератор',
      temp_from: -20,
      temp_to: -18,
    },
    trading: {
      status: 'Auction',
      status_mobile: 'Leading',
      start_time: '2026-07-31T10:00:00+03:00',
      stop_time: '2026-08-01T18:00:00+03:00',
      bid_measurement_type: 'PerRoute',
      can_set_bet: true,
      is_bidder: true,
      is_favorite: true,
      price: {
        start: 220_000,
        current: 185_000,
        current_no_vat: 154_166.67,
        available: 180_000,
        min: 150_000,
        max: 220_000,
        step: 5_000,
        price_per_km: 188.01,
      },
      your: {
        bet: true,
        last_bet_with_vat: 185_000,
      },
    },
    payment: {
      form: 'Безналичная с НДС',
      currency_code: '643',
      delay: 30,
    },
    assembly: {},
    routes: [
      {
        row_num: 1,
        op_type: 'Loading',
        start_date: '2026-08-03T09:00:00+03:00',
        location: {
          city_name: 'Москва',
          loading_address: 'ул. Промышленная, 12',
        },
      },
      {
        row_num: 2,
        op_type: 'Unloading',
        start_date: '2026-08-04T16:00:00+03:00',
        location: {
          city_name: 'Казань',
          loading_address: 'ул. Техническая, 8',
        },
      },
    ],
    admitted_organizations: [],
    hide_bets_history: false,
  },
  [losingAuctionUuid]: {
    main: {
      id: 102,
      cargo_num: 'AU-10483',
      cargo_date: '2026-08-05T08:00:00+05:00',
      order_uid: losingAuctionUuid,
      auc_type: 'Up',
      created_at: '2026-07-28T14:30:00+05:00',
    },
    organizer: {
      organization_name: 'АО УралМеталл',
      organization_inn: '6671002233',
      organization_id: 341,
    },
    contacts: [],
    cargo: {
      distance: 950,
      truck_count: 1,
      body_type: 'бортовой',
    },
    trading: {
      status: 'Auction',
      status_mobile: 'Losing',
      can_set_bet: true,
      is_bidder: true,
      price: {
        start: 120_000,
        current: 145_000,
        current_no_vat: 120_833.33,
        available: 150_000,
        min: 120_000,
        max: 220_000,
        step: 5_000,
      },
      your: { bet: true, last_bet_with_vat: 140_000 },
    },
    payment: { form: 'Безналичная с НДС', currency_code: '643' },
    assembly: {},
    routes: [],
    admitted_organizations: [],
    hide_bets_history: false,
  },
  [requestAuctionUuid]: {
    main: {
      id: 103,
      cargo_num: 'AU-10484',
      cargo_date: '2026-08-06T10:00:00+05:00',
      order_uid: requestAuctionUuid,
      auc_type: 'Request',
      created_at: '2026-07-30T09:20:00+05:00',
    },
    organizer: {
      organization_name: 'ООО ТехноСнаб',
      organization_inn: '5901004455',
      organization_id: 342,
    },
    contacts: [],
    cargo: {
      distance: 1_420,
      truck_count: 1,
      body_type: 'тентованный',
    },
    trading: {
      status: 'Auction',
      status_mobile: 'NotParticipating',
      can_set_bet: true,
      is_bidder: false,
      hide_bets_history: true,
      price: {
        start: 98_000,
        current: 98_000,
        current_no_vat: 81_666.67,
        available: 96_000,
        min: 80_000,
        max: 150_000,
        step: 2_000,
      },
      your: { bet: false, last_bet_with_vat: null },
    },
    payment: { form: 'Безналичная с НДС', currency_code: '643' },
    assembly: {},
    routes: [],
    admitted_organizations: [],
    hide_bets_history: true,
  },
  [fixedPriceAuctionUuid]: {
    main: {
      id: 104,
      cargo_num: 'AU-10485',
      cargo_date: '2026-08-07T09:00:00+03:00',
      order_uid: fixedPriceAuctionUuid,
      auc_type: 'FixPrice',
      created_at: '2026-07-30T11:00:00+03:00',
    },
    organizer: {
      organization_name: 'ООО МебельПро',
      organization_inn: '7802006677',
      organization_id: 343,
    },
    contacts: [],
    cargo: { distance: 750, truck_count: 1, body_type: 'фургон' },
    trading: {
      status: 'Planning',
      status_mobile: 'NotParticipating',
      can_set_bet: false,
      is_bidder: false,
      price: {
        start: 95_000,
        current: 95_000,
        current_no_vat: 79_166.67,
        available: null,
        min: 95_000,
        max: 95_000,
        step: null,
      },
      your: { bet: false, last_bet_with_vat: null },
    },
    payment: { form: 'Безналичная с НДС', currency_code: '643' },
    assembly: {},
    routes: [],
    admitted_organizations: [],
    hide_bets_history: false,
  },
};

export const auctionBets: Record<string, BetItem[]> = {
  [activeAuctionUuid]: [
    {
      id: 10101,
      auction_id: 101,
      created_at: '2026-07-31T10:04:00+03:00',
      price_with_vat: 185_000,
      price_no_vat: 154_166.67,
      organization_name: 'ООО ТрансЛог',
      organization_inn: '7701001001',
      place: 1,
      is_rejected: false,
      is_win: false,
    },
    {
      id: 10102,
      auction_id: 101,
      created_at: '2026-07-31T10:08:00+03:00',
      price_with_vat: 190_000,
      price_no_vat: 158_333.33,
      organization_name: 'ООО СеверТранс',
      organization_inn: '7801001001',
      place: 2,
      is_rejected: false,
      is_win: false,
    },
    {
      id: 10103,
      auction_id: 101,
      created_at: '2026-07-31T09:55:00+03:00',
      price_with_vat: 195_000,
      price_no_vat: 162_500,
      organization_name: 'ООО Магистраль',
      organization_inn: '1655002002',
      place: null,
      is_rejected: true,
      is_win: false,
      cancel_reason: 'Ставка отменена перевозчиком',
    },
  ],
  [losingAuctionUuid]: [],
  [requestAuctionUuid]: [],
  [fixedPriceAuctionUuid]: [],
};
