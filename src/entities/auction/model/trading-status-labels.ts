import type { AuctionListItem } from '../api/auction-api';

type TradingStatus = NonNullable<AuctionListItem['trading']>['status_mobile'];
type TradingStatusCode = NonNullable<TradingStatus>;

interface AuctionTradingStatusOption {
  value: TradingStatusCode;
  label: string;
}

export const auctionTradingStatusOptions = [
  { value: 'NotParticipating', label: 'Не участвуете' },
  { value: 'Leading', label: 'Вы лидируете' },
  { value: 'Losing', label: 'Ставка перебита' },
  { value: 'Winner', label: 'Вы победили' },
  { value: 'Confirmed', label: 'Подтверждено' },
] as const satisfies readonly AuctionTradingStatusOption[];

export const getTradingStatusLabel = (status: TradingStatus) => {
  return (
    auctionTradingStatusOptions.find((option) => option.value === status)
      ?.label ?? 'Статус неизвестен'
  );
};
