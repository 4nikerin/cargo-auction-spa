import type { AuctionDetail } from '../api/auction-api';

type TradingStatus = AuctionDetail['trading']['status_mobile'];
type TradingStatusCode = NonNullable<TradingStatus>;

interface AuctionTradingStatusOption {
  value: TradingStatusCode;
  label: string;
}

export const auctionTradingStatusOptions = [
  { value: 'NotParticipating', label: 'Не участвуете' },
  { value: 'Leading', label: 'Вы лидируете' },
  { value: 'Losing', label: 'Ставка перебита' },
  { value: 'OnPending', label: 'На рассмотрении' },
  { value: 'Confirmed', label: 'Подтверждено' },
  { value: 'ChoosingWinner', label: 'Выбор победителя' },
  { value: 'Winner', label: 'Вы победили' },
  { value: 'Accepted', label: 'Принято' },
  { value: 'Unknown', label: 'Неизвестный статус' },
] as const satisfies readonly AuctionTradingStatusOption[];

export const getTradingStatusLabel = (status: TradingStatus) => {
  return (
    auctionTradingStatusOptions.find((option) => option.value === status)
      ?.label ?? 'Статус неизвестен'
  );
};
