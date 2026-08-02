import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { auctionListSortOptions } from '../model/auction-list-search';
import type { AuctionListSort } from '../model/auction-list-search';

interface AuctionSortSelectProps {
  value: AuctionListSort;
  disabled: boolean;
  onChange: (value: AuctionListSort) => void;
}

export const AuctionSortSelect = ({
  value,
  disabled,
  onChange,
}: AuctionSortSelectProps) => {
  const label = auctionListSortOptions.find(
    (option) => option.value === value,
  )?.label;

  return (
    <Select
      value={value}
      disabled={disabled}
      onValueChange={(nextValue) => onChange(nextValue as AuctionListSort)}
    >
      <SelectTrigger className="h-auto justify-start border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:ring-0">
        <SelectValue className="flex-none">{label}</SelectValue>
      </SelectTrigger>
      <SelectContent
        className="w-80 max-w-[calc(100vw-2rem)] rounded-2xl p-2"
        align="start"
        alignItemWithTrigger={false}
        sideOffset={12}
      >
        {auctionListSortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} indicator="radio">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
