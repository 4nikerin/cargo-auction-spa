import { AuctionFiltersBar } from './AuctionFiltersBar';
import type { AuctionFiltersValue } from '../model/auction-filters';

interface AuctionFiltersProps {
  value: AuctionFiltersValue;
  onChange: (value: AuctionFiltersValue) => void;
}

export const AuctionFilters = ({ value, onChange }: AuctionFiltersProps) => {
  // Не задаём key из value: после изменения URL новый key размонтировал бы
  // панель вместе с открытым popover. Входные значения синхронизирует useAuctionFilters.
  return <AuctionFiltersBar initialValue={value} onChange={onChange} />;
};
