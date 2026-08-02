import type { AuctionFiltersValue } from './auction-filters';

export interface AllFiltersDraft {
  cargo: string;
  from: string;
  to: string;
  status: NonNullable<AuctionFiltersValue['status']>;
  type: NonNullable<AuctionFiltersValue['type']>;
  auctionStatuses: number[];
  weightFrom: string;
  weightTo: string;
  volumeFrom: string;
  volumeTo: string;
  bodyTypes: string;
  international: boolean;
  loadDateFrom: string;
  loadDateTo: string;
  unloadDateFrom: string;
  unloadDateTo: string;
  createdFrom: string;
  createdTo: string;
  biddingStartsFrom: string;
  biddingStartsTo: string;
  biddingEndsFrom: string;
  biddingEndsTo: string;
  available: boolean;
  favorite: boolean;
  participated: boolean;
  customer: string;
  contractor: string;
  priceFrom: string;
  priceTo: string;
  pricePerKmFrom: string;
  pricePerKmTo: string;
}

export type SetAllFiltersDraftField = <Key extends keyof AllFiltersDraft>(
  key: Key,
  value: AllFiltersDraft[Key],
) => void;

const toInputValue = (value: number | undefined) => {
  return value?.toString() ?? '';
};

const toNumber = (value: string) => {
  if (!value.trim()) return undefined;

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

const toTextList = (value: string) => {
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
};

const toText = (value: string) => {
  return value.trim() || undefined;
};

export const createAllFiltersDraft = (
  value: AuctionFiltersValue,
): AllFiltersDraft => {
  return {
    cargo: value.cargo ?? '',
    from: value.from ?? '',
    to: value.to ?? '',
    status: value.status ?? [],
    type: value.type ?? [],
    auctionStatuses: value.auctionStatuses ?? [],
    weightFrom: toInputValue(value.weightFrom),
    weightTo: toInputValue(value.weightTo),
    volumeFrom: toInputValue(value.volumeFrom),
    volumeTo: toInputValue(value.volumeTo),
    bodyTypes: value.bodyTypes?.join(', ') ?? '',
    international: value.international ?? false,
    loadDateFrom: value.loadDateFrom ?? '',
    loadDateTo: value.loadDateTo ?? '',
    unloadDateFrom: value.unloadDateFrom ?? '',
    unloadDateTo: value.unloadDateTo ?? '',
    createdFrom: value.createdFrom ?? '',
    createdTo: value.createdTo ?? '',
    biddingStartsFrom: value.biddingStartsFrom ?? '',
    biddingStartsTo: value.biddingStartsTo ?? '',
    biddingEndsFrom: value.biddingEndsFrom ?? '',
    biddingEndsTo: value.biddingEndsTo ?? '',
    available: value.available ?? false,
    favorite: value.favorite ?? false,
    participated: value.participated ?? false,
    customer: value.customer ?? '',
    contractor: value.contractor ?? '',
    priceFrom: toInputValue(value.priceFrom),
    priceTo: toInputValue(value.priceTo),
    pricePerKmFrom: toInputValue(value.pricePerKmFrom),
    pricePerKmTo: toInputValue(value.pricePerKmTo),
  };
};

export const toAuctionFiltersValue = (
  draft: AllFiltersDraft,
  baseValue: AuctionFiltersValue = {},
): AuctionFiltersValue => {
  return {
    // Поля, для которых в сайдбаре пока нет контролов, сохраняются из URL.
    // Значения представленных ниже полей всегда перезаписываются из draft.
    ...baseValue,
    cargo: toText(draft.cargo),
    from: toText(draft.from),
    to: toText(draft.to),
    status: draft.status.length > 0 ? draft.status : undefined,
    type: draft.type.length > 0 ? draft.type : undefined,
    auctionStatuses:
      draft.auctionStatuses.length > 0 ? draft.auctionStatuses : undefined,
    weightFrom: toNumber(draft.weightFrom),
    weightTo: toNumber(draft.weightTo),
    volumeFrom: toNumber(draft.volumeFrom),
    volumeTo: toNumber(draft.volumeTo),
    bodyTypes: toTextList(draft.bodyTypes),
    international: draft.international || undefined,
    loadDateFrom: toText(draft.loadDateFrom),
    loadDateTo: toText(draft.loadDateTo),
    unloadDateFrom: toText(draft.unloadDateFrom),
    unloadDateTo: toText(draft.unloadDateTo),
    createdFrom: toText(draft.createdFrom),
    createdTo: toText(draft.createdTo),
    biddingStartsFrom: toText(draft.biddingStartsFrom),
    biddingStartsTo: toText(draft.biddingStartsTo),
    biddingEndsFrom: toText(draft.biddingEndsFrom),
    biddingEndsTo: toText(draft.biddingEndsTo),
    available: draft.available || undefined,
    favorite: draft.favorite || undefined,
    participated: draft.participated || undefined,
    customer: toText(draft.customer),
    contractor: toText(draft.contractor),
    priceFrom: toNumber(draft.priceFrom),
    priceTo: toNumber(draft.priceTo),
    pricePerKmFrom: toNumber(draft.pricePerKmFrom),
    pricePerKmTo: toNumber(draft.pricePerKmTo),
  };
};

export const getActiveFiltersCount = (value: AuctionFiltersValue) => {
  return (Object.values(value) as unknown[]).filter((item) =>
    Array.isArray(item) ? item.length > 0 : item !== undefined,
  ).length;
};
