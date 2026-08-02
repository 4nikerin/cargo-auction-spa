import type { AuctionListItem } from '../api/auction-api';

type AuctionType = NonNullable<AuctionListItem['main']>['auc_type'];
type AuctionTypeCode = NonNullable<AuctionType>;

interface AuctionTypeOption {
  value: AuctionTypeCode;
  label: string;
}

export const auctionTypeOptions = [
  { value: 'Request', label: 'Запрос предложений' },
  { value: 'Up', label: 'На повышение' },
  { value: 'Down', label: 'На понижение' },
  { value: 'FixPrice', label: 'Фиксированная цена' },
] as const satisfies readonly AuctionTypeOption[];

export const getAuctionTypeLabel = (type: AuctionType) => {
  return (
    auctionTypeOptions.find((option) => option.value === type)?.label ??
    'Тип не указан'
  );
};
