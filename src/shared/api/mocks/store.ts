/**
 * Изменяемое состояние мокового API: фильтрует аукционы, хранит ставки
 * и синхронно обновляет список, детали и историю после новой ставки.
 */
import type { components } from '@/shared/api/generated/schema';

import {
  auctionBets as initialBets,
  auctionDetails as initialDetails,
  auctionListResponse as initialListResponse,
} from './fixtures';

type AuctionListItem = components['schemas']['AuctionListItem'];
type AuctionListRequest = components['schemas']['AuctionListRequest'];
type AuctionListResponse = components['schemas']['AuctionListResponseBase'];
type AuctionShowResponse = components['schemas']['AuctionShowResponse'];
type BetItem = components['schemas']['BetItem'];
type SetBetRequest = components['schemas']['SetBetRequest'];
type ValidationError = components['schemas']['ValidationError'];

/** Связывает числовые фильтры `statuses` с текстовыми статусами аукциона. */
const auctionStatusByNumber = {
  1: 'Planning',
  2: 'Auction',
  3: 'DeterminateWinner',
  4: 'WaitDeal',
  5: 'InProgress',
  6: 'Finished',
  7: 'Stopped',
  8: 'Canceled',
} as const;

const mobileStatusByNumber = {
  1: 'NotParticipating',
  2: 'Leading',
  3: 'Losing',
  4: 'Winner',
  5: 'Confirmed',
} as const;

const contractorByAuctionId: Record<number, string> = {
  101: 'ООО ТрансЛог',
  102: 'ООО СеверТранс',
  103: 'ООО Магистраль',
  104: 'ООО Вектор',
  105: 'ООО СибирьТранс',
  106: 'ООО ЮгКарго',
};

// Рабочие копии fixtures. Они изменяются запросами, имитируя состояние backend.
let auctions: AuctionListItem[] = [];
let details: Record<string, AuctionShowResponse> = {};
let bets: Record<string, BetItem[]> = {};
let nextBetId = 20_000;

const includesText = (value: string | undefined, search: string) => {
  return value?.toLowerCase().includes(search.toLowerCase()) ?? false;
};

const isWithinDates = (
  value: string | undefined,
  from: string | undefined,
  to: string | undefined,
) => {
  if (!value) {
    return false;
  }

  const timestamp = new Date(value).getTime();

  return !(
    (from && timestamp < new Date(from).getTime()) ||
    (to && timestamp > new Date(to).getTime())
  );
};

/** Проверяет один аукцион по всем фильтрам AuctionListRequest. */
const matchesFilters = (item: AuctionListItem, filters: AuctionListRequest) => {
  const { cargo, main, organizer, payment, route, trading } = item;

  if (filters.cargo_num && !includesText(main?.cargo_num, filters.cargo_num)) {
    return false;
  }

  if (
    filters.status?.length &&
    (!trading?.status_mobile || !filters.status.includes(trading.status_mobile))
  ) {
    return false;
  }

  if (filters.statuses?.length) {
    const statuses = filters.statuses.map(
      (status) =>
        auctionStatusByNumber[status as keyof typeof auctionStatusByNumber],
    );

    if (
      !trading?.status ||
      trading.status === 'Unknown' ||
      !statuses.includes(trading.status)
    ) {
      return false;
    }
  }

  if (filters.mobile_statuses?.length) {
    const statuses = filters.mobile_statuses.map(
      (status) =>
        mobileStatusByNumber[status as keyof typeof mobileStatusByNumber],
    );

    if (
      !trading?.status_mobile ||
      trading.status_mobile === 'Unknown' ||
      !statuses.includes(trading.status_mobile)
    ) {
      return false;
    }
  }

  if (
    filters.auc_type?.length &&
    (!main?.auc_type ||
      main.auc_type === 'Unknown' ||
      !filters.auc_type.includes(main.auc_type))
  ) {
    return false;
  }

  if (
    filters.load_city &&
    !includesText(route?.load?.city, filters.load_city)
  ) {
    return false;
  }

  if (
    filters.unload_city &&
    !includesText(route?.unload?.city, filters.unload_city)
  ) {
    return false;
  }

  if (
    filters.load_gc_id != null &&
    route?.load?.city_gc_id !== filters.load_gc_id
  ) {
    return false;
  }

  if (
    filters.unload_gc_id != null &&
    route?.unload?.city_gc_id !== filters.unload_gc_id
  ) {
    return false;
  }

  if (
    (filters.load_date_from || filters.load_date_to) &&
    !isWithinDates(
      route?.load?.date,
      filters.load_date_from,
      filters.load_date_to,
    )
  ) {
    return false;
  }

  if (
    (filters.unload_date_from || filters.unload_date_to) &&
    !isWithinDates(
      route?.unload?.date,
      filters.unload_date_from,
      filters.unload_date_to,
    )
  ) {
    return false;
  }

  if (
    (filters.create_date_from || filters.create_date_to) &&
    !isWithinDates(
      main?.created_at,
      filters.create_date_from,
      filters.create_date_to,
    )
  ) {
    return false;
  }

  if (
    (filters.start_time_from || filters.start_time_to) &&
    !isWithinDates(
      trading?.start_time,
      filters.start_time_from,
      filters.start_time_to,
    )
  ) {
    return false;
  }

  if (
    (filters.stop_time_from || filters.stop_time_to) &&
    !isWithinDates(
      trading?.stop_time,
      filters.stop_time_from,
      filters.stop_time_to,
    )
  ) {
    return false;
  }

  if (
    filters.weight_from != null &&
    (cargo?.weight == null || cargo.weight < filters.weight_from)
  ) {
    return false;
  }

  if (
    filters.weight_to != null &&
    (cargo?.weight == null || cargo.weight > filters.weight_to)
  ) {
    return false;
  }

  if (
    filters.volume_from != null &&
    (cargo?.volume == null || cargo.volume < filters.volume_from)
  ) {
    return false;
  }

  if (
    filters.volume_to != null &&
    (cargo?.volume == null || cargo.volume > filters.volume_to)
  ) {
    return false;
  }

  if (
    filters.body_types?.length &&
    (!cargo?.body_type || !filters.body_types.includes(cargo.body_type))
  ) {
    return false;
  }

  if (
    filters.is_international_shipment !== undefined &&
    cargo?.is_international !== filters.is_international_shipment
  ) {
    return false;
  }

  if (
    filters.is_available !== undefined &&
    trading?.is_available !== filters.is_available
  ) {
    return false;
  }

  if (
    filters.is_bidder !== undefined &&
    trading?.is_bidder !== filters.is_bidder
  ) {
    return false;
  }

  if (
    filters.is_favorite !== undefined &&
    trading?.is_favorite !== filters.is_favorite
  ) {
    return false;
  }

  if (
    filters.customer &&
    !includesText(organizer?.organization_name, filters.customer) &&
    !includesText(organizer?.organization_inn, filters.customer)
  ) {
    return false;
  }

  if (
    filters.customer_ids?.length &&
    (organizer?.organization_id == null ||
      !filters.customer_ids.includes(organizer.organization_id))
  ) {
    return false;
  }

  if (
    filters.auction_ids?.length &&
    (main?.id == null || !filters.auction_ids.includes(main.id))
  ) {
    return false;
  }

  if (filters.form_type && !includesText(payment?.form, filters.form_type)) {
    return false;
  }

  if (
    filters.contractor &&
    (main?.id == null ||
      !includesText(contractorByAuctionId[main.id], filters.contractor))
  ) {
    return false;
  }

  const currentPrice = trading?.price?.current;

  if (
    filters.current_price_from != null &&
    (currentPrice === undefined || currentPrice < filters.current_price_from)
  ) {
    return false;
  }

  const pricePerKm = main?.price_per_km;

  if (
    filters.price_per_km_from != null &&
    (pricePerKm == null || pricePerKm < filters.price_per_km_from)
  ) {
    return false;
  }

  if (
    filters.price_per_km_to != null &&
    (pricePerKm == null || pricePerKm > filters.price_per_km_to)
  ) {
    return false;
  }

  return !(
    filters.current_price_to != null &&
    (currentPrice === undefined || currentPrice > filters.current_price_to)
  );
};

const getAuctionSortValue = (item: AuctionListItem, field: string) => {
  switch (field) {
    case 'start_time':
      return item.trading?.start_time
        ? new Date(item.trading.start_time).getTime()
        : undefined;
    case 'current_price':
      return item.trading?.price?.current;
    case 'price_per_km':
      return item.main?.price_per_km ?? undefined;
    default:
      return undefined;
  }
};

const compareSortValues = (
  left: number | undefined,
  right: number | undefined,
  direction: 'asc' | 'desc',
) => {
  if (left === right) return 0;
  if (left === undefined) return 1;
  if (right === undefined) return -1;

  const result = left - right;
  return direction === 'asc' ? result : -result;
};

/** Применяет документированные OpenAPI-поля сортировки к моковому ответу. */
const sortAuctions = (
  items: AuctionListItem[],
  filters: AuctionListRequest,
) => {
  const sortEntries = Object.entries(filters.sort ?? {});

  if (sortEntries.length > 0) {
    return items.sort((left, right) => {
      for (const [field, direction] of sortEntries) {
        const result = compareSortValues(
          getAuctionSortValue(left, field),
          getAuctionSortValue(right, field),
          direction,
        );

        if (result !== 0) return result;
      }

      return 0;
    });
  }

  if (filters.is_oldest !== undefined) {
    const direction = filters.is_oldest ? 'asc' : 'desc';

    return items.sort((left, right) =>
      compareSortValues(
        getAuctionSortValue(left, 'start_time'),
        getAuctionSortValue(right, 'start_time'),
        direction,
      ),
    );
  }

  return items;
};

const withoutVat = (price: number) => {
  return Number((price / 1.2).toFixed(2));
};

/**
 * Эмулирует серверную валидацию ставки: доступность торгов, диапазон цены,
 * шаг и направление аукциона.
 */
const getBetValidationErrors = (
  auction: AuctionShowResponse,
  request: SetBetRequest,
) => {
  const errors: ValidationError[] = [];
  const { price } = request;
  const tradingPrice = auction.trading.price;

  if (!Number.isFinite(price) || price <= 0) {
    errors.push({
      field: 'price',
      message: 'Цена должна быть положительным числом.',
      code: 'invalid_price',
    });
  }

  if (!auction.trading.can_set_bet) {
    errors.push({
      field: 'price',
      message: 'Для этого аукциона нельзя сделать ставку.',
      code: 'bet_not_allowed',
    });
  }

  if (tradingPrice?.min != null && price < tradingPrice.min) {
    errors.push({
      field: 'price',
      message: `Минимальная цена — ${tradingPrice.min}.`,
      code: 'min_value',
    });
  }

  if (tradingPrice?.max != null && price > tradingPrice.max) {
    errors.push({
      field: 'price',
      message: `Максимальная цена — ${tradingPrice.max}.`,
      code: 'max_value',
    });
  }

  if (
    tradingPrice?.step &&
    tradingPrice.current != null &&
    Math.abs(price - tradingPrice.current) % tradingPrice.step !== 0
  ) {
    errors.push({
      field: 'price',
      message: `Цена должна учитывать шаг ${tradingPrice.step}.`,
      code: 'invalid_step',
    });
  }

  if (
    auction.main.auc_type === 'Down' &&
    tradingPrice?.current != null &&
    price >= tradingPrice.current
  ) {
    errors.push({
      field: 'price',
      message: 'В аукционе на понижение новая цена должна быть ниже текущей.',
      code: 'invalid_direction',
    });
  }

  if (
    auction.main.auc_type === 'Up' &&
    tradingPrice?.current != null &&
    price <= tradingPrice.current
  ) {
    errors.push({
      field: 'price',
      message: 'В аукционе на повышение новая цена должна быть выше текущей.',
      code: 'invalid_direction',
    });
  }

  return errors;
};

/** Рассчитывает следующую доступную цену с учётом типа аукциона и шага. */
const getAvailablePrice = (auction: AuctionShowResponse, price: number) => {
  const { max, min, step } = auction.trading.price ?? {};

  if (!step) {
    return price;
  }

  if (auction.main.auc_type === 'Down') {
    return Math.max(min ?? price - step, price - step);
  }

  if (auction.main.auc_type === 'Up') {
    return Math.min(max ?? price + step, price + step);
  }

  return price;
};

/** Восстанавливает независимое начальное состояние перед каждым тестом. */
export const resetMockStore = () => {
  auctions = structuredClone(initialListResponse.data);
  details = structuredClone(initialDetails);
  bets = structuredClone(initialBets);
  nextBetId = 20_000;
};

/** Применяет фильтры и собирает метаданные страницы как настоящий list endpoint. */
export const listMockAuctions = (
  filters: AuctionListRequest = {},
): AuctionListResponse => {
  const page = filters.page ?? 1;
  const perPage = filters.per_page ?? 20;
  const filtered = sortAuctions(
    auctions.filter((auction) => matchesFilters(auction, filters)),
    filters,
  );
  const start = (page - 1) * perPage;
  const data = filtered.slice(start, start + perPage);

  return {
    data,
    meta: {
      current_page: page,
      from: data.length > 0 ? start + 1 : 0,
      last_page: Math.max(1, Math.ceil(filtered.length / perPage)),
      per_page: perPage,
      to: data.length > 0 ? start + data.length : 0,
      total: filtered.length,
    },
  };
};

/** Возвращает детальные данные аукциона из памяти. */
export const getMockAuction = (auctionUuid: string) => {
  return details[auctionUuid];
};

/**
 * Возвращает доступную историю ставок. По умолчанию отменённые ставки скрыты,
 * а флаг скрытия истории у аукциона имеет приоритет над `showAll`.
 */
export const getMockBets = (auctionUuid: string, showAll = false) => {
  const auction = details[auctionUuid];

  if (auction?.hide_bets_history || auction?.trading.hide_bets_history) {
    return { bets: [] };
  }

  const auctionBets = bets[auctionUuid] ?? [];

  return {
    bets: showAll ? auctionBets : auctionBets.filter((bet) => !bet.is_rejected),
  };
};

/**
 * Валидирует и сохраняет новую ставку, затем синхронизирует все представления
 * аукциона, которые клиент может запросить отдельными эндпоинтами.
 */
export const setMockBet = (auctionUuid: string, request: SetBetRequest) => {
  const auction = details[auctionUuid];

  if (!auction) {
    return { status: 'not-found' as const };
  }

  const errors = getBetValidationErrors(auction, request);

  if (errors.length > 0) {
    return { status: 'validation-error' as const, errors };
  }

  const price = request.price;
  const priceNoVat = withoutVat(price);
  const auctionBets = bets[auctionUuid] ?? [];

  // Новая ставка занимает первое место, поэтому предыдущие позиции сдвигаются.
  for (const bet of auctionBets) {
    if (bet.place != null) {
      bet.place += 1;
    }
  }

  auctionBets.unshift({
    id: nextBetId++,
    created_at: new Date().toISOString(),
    auction_id: auction.main.id ?? 0,
    subscriber_id: 13,
    contact_name: 'Текущий пользователь',
    contact_phone: '',
    price_with_vat: price,
    price_no_vat: priceNoVat,
    organization_id: 14,
    organization_inn: '7701001001',
    organization_name: 'ООО ТрансЛог',
    transporter_comment: null,
    is_rejected: false,
    is_counter: false,
    place: 1,
    is_win: false,
    run_number: 0,
    cancel_reason: '',
    price_info: {
      price_with_vat: price,
      price_no_vat: priceNoVat,
      payment_type: 'Безналичная с НДС',
      vat_rate: '20',
    },
  });
  bets[auctionUuid] = auctionBets;

  // Обновляем детальное представление аукциона.
  const available = getAvailablePrice(auction, price);

  auction.trading.price = {
    ...auction.trading.price,
    current: price,
    current_no_vat: priceNoVat,
    available,
    available_no_vat: withoutVat(available),
  };
  auction.trading.status_mobile = 'Leading';
  auction.trading.is_bidder = true;
  auction.trading.your = {
    ...auction.trading.your,
    bet: true,
    last_bet: price,
    last_bet_with_vat: price,
  };

  // Обновляем тот же аукцион в списке, чтобы последующий list endpoint не устарел.
  const listItem = auctions.find(
    (item) => item.main?.order_uid === auctionUuid,
  );

  if (listItem?.trading) {
    listItem.trading.status_mobile = 'Leading';
    listItem.trading.is_bidder = true;
    listItem.trading.price = {
      ...listItem.trading.price,
      current: price,
      current_no_vat: priceNoVat,
    };
    listItem.trading.your = { bet: true, last_bet: price };
  }

  return { status: 'success' as const };
};

resetMockStore();
