import { auctionTypeOptions } from '@/entities/auction';

import { auctionFilterStatusOptions } from '../model/auction-filters';
import { useAuctionFilters } from '../model/use-auction-filters';
import { ChoiceFilterChip } from './chips/ChoiceFilterChip';
import { TextFilterChip } from './chips/TextFilterChip';
import { AuctionFiltersSheet } from './sheet/AuctionFiltersSheet';
import type { AuctionFiltersValue } from '../model/auction-filters';

interface AuctionFiltersBarProps {
  initialValue: AuctionFiltersValue;
  onChange: (value: AuctionFiltersValue) => void;
}

export const AuctionFiltersBar = ({
  initialValue,
  onChange,
}: AuctionFiltersBarProps) => {
  const { applyValue, filters, setFilter, value } = useAuctionFilters({
    initialValue,
    onChange,
  });

  return (
    <div
      className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
      aria-label="Фильтры аукционов"
    >
      <TextFilterChip
        label="Номер груза"
        value={filters.cargo}
        placeholder="Например, AU-10482"
        onChange={(value) => setFilter('cargo', value)}
      />
      <TextFilterChip
        label="Откуда"
        value={filters.from}
        placeholder="Город погрузки"
        onChange={(value) => setFilter('from', value)}
      />
      <TextFilterChip
        label="Куда"
        value={filters.to}
        placeholder="Город выгрузки"
        onChange={(value) => setFilter('to', value)}
      />
      <ChoiceFilterChip
        label="Ваш статус"
        value={filters.status}
        options={auctionFilterStatusOptions}
        onChange={(value) => setFilter('status', value)}
      />
      <ChoiceFilterChip
        label="Тип аукциона"
        value={filters.type}
        options={auctionTypeOptions}
        onChange={(value) => setFilter('type', value)}
      />

      <AuctionFiltersSheet value={value} onApply={applyValue} />
    </div>
  );
};
