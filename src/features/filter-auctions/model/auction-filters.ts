import { z } from 'zod';

import { auctionTypeOptions } from '@/entities/auction';
import type { AuctionListRequest } from '@/entities/auction';

type AuctionFilterStatus = NonNullable<AuctionListRequest['status']>[number];

export const auctionFilterStatusOptions = [
  { value: 'NotParticipating', label: 'Не участвуете' },
  { value: 'Leading', label: 'Вы лидируете' },
  { value: 'Losing', label: 'Ставка перебита' },
  { value: 'OnPending', label: 'На рассмотрении' },
  { value: 'Confirmed', label: 'Подтверждено' },
  { value: 'ChoosingWinner', label: 'Выбор победителя' },
  { value: 'Winner', label: 'Вы победили' },
  { value: 'Accepted', label: 'Принято' },
  { value: 'Unknown', label: 'Неизвестный статус' },
] as const satisfies ReadonlyArray<{
  value: AuctionFilterStatus;
  label: string;
}>;

export const auctionStatusOptions = [
  { value: 1, label: 'Планирование' },
  { value: 2, label: 'Торги идут' },
  { value: 3, label: 'Определение победителя' },
  { value: 4, label: 'Ожидание сделки' },
  { value: 5, label: 'В работе' },
  { value: 6, label: 'Завершён' },
  { value: 7, label: 'Остановлен' },
  { value: 8, label: 'Отменён' },
] as const;

const auctionTradingStatuses = auctionFilterStatusOptions.map(
  ({ value }) => value,
);
const auctionTypes = auctionTypeOptions.map(({ value }) => value);

const optionalFilterTextSchema = z
  .string()
  .trim()
  .min(1)
  .optional()
  .catch(undefined);

const optionalFilterNumberSchema = z.number().optional().catch(undefined);

const optionalFilterBooleanSchema = z.boolean().optional().catch(undefined);

const optionalDateTimeSchema = z
  .string()
  .trim()
  .refine((value) => !Number.isNaN(new Date(value).getTime()))
  .optional()
  .catch(undefined);

const optionalNumberArraySchema = z
  .array(z.number().int())
  .min(1)
  .optional()
  .catch(undefined);

const optionalTextArraySchema = z
  .array(z.string().trim().min(1))
  .min(1)
  .optional()
  .catch(undefined);

export const auctionFiltersSchema = z.object({
  cargo: optionalFilterTextSchema,
  from: optionalFilterTextSchema,
  to: optionalFilterTextSchema,
  status: z
    .array(z.enum(auctionTradingStatuses))
    .min(1)
    .optional()
    .catch(undefined),
  type: z.array(z.enum(auctionTypes)).min(1).optional().catch(undefined),
  mobileStatuses: optionalNumberArraySchema,
  auctionStatuses: optionalNumberArraySchema,
  weightFrom: optionalFilterNumberSchema,
  weightTo: optionalFilterNumberSchema,
  volumeFrom: optionalFilterNumberSchema,
  volumeTo: optionalFilterNumberSchema,
  bodyTypes: optionalTextArraySchema,
  formType: optionalFilterTextSchema,
  international: optionalFilterBooleanSchema,
  loadCityId: optionalFilterNumberSchema,
  loadRadius: optionalFilterNumberSchema,
  unloadCityId: optionalFilterNumberSchema,
  unloadRadius: optionalFilterNumberSchema,
  loadDateFrom: optionalDateTimeSchema,
  loadDateTo: optionalDateTimeSchema,
  unloadDateFrom: optionalDateTimeSchema,
  unloadDateTo: optionalDateTimeSchema,
  createdFrom: optionalDateTimeSchema,
  createdTo: optionalDateTimeSchema,
  biddingStartsFrom: optionalDateTimeSchema,
  biddingStartsTo: optionalDateTimeSchema,
  biddingEndsFrom: optionalDateTimeSchema,
  biddingEndsTo: optionalDateTimeSchema,
  available: optionalFilterBooleanSchema,
  favorite: optionalFilterBooleanSchema,
  participated: optionalFilterBooleanSchema,
  customer: optionalFilterTextSchema,
  customerIds: optionalNumberArraySchema,
  contractor: optionalFilterTextSchema,
  auctionIds: optionalNumberArraySchema,
  replaceExternalPads: optionalFilterBooleanSchema,
  priceFrom: optionalFilterNumberSchema,
  priceTo: optionalFilterNumberSchema,
  pricePerKmFrom: optionalFilterNumberSchema,
  pricePerKmTo: optionalFilterNumberSchema,
});

export type AuctionFiltersValue = z.infer<typeof auctionFiltersSchema>;
export type AuctionTradingStatus = NonNullable<
  AuctionFiltersValue['status']
>[number];
export type AuctionType = NonNullable<AuctionFiltersValue['type']>[number];

/** Создаёт стабильный ключ из всех фильтров, описанных в Zod-схеме. */
export const getAuctionFiltersKey = (value: AuctionFiltersValue) => {
  const normalizedValue = auctionFiltersSchema.parse(value);
  const entries = (Object.entries(normalizedValue) as Array<[string, unknown]>)
    .filter(([, entryValue]) => entryValue !== undefined)
    .sort(([leftKey], [rightKey]) => {
      if (leftKey < rightKey) return -1;
      if (leftKey > rightKey) return 1;
      return 0;
    });

  return JSON.stringify(entries);
};
