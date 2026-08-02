import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { auctionListPageSizeOptions } from '../model/auction-list-search';
import type { AuctionListPageSize } from '../model/auction-list-search';

interface AuctionPageSizeSelectProps {
  value: AuctionListPageSize;
  disabled: boolean;
  onChange: (value: AuctionListPageSize) => void;
}

export const AuctionPageSizeSelect = ({
  value,
  disabled,
  onChange,
}: AuctionPageSizeSelectProps) => {
  return (
    <Select
      value={value}
      disabled={disabled}
      onValueChange={(nextValue) => onChange(nextValue as AuctionListPageSize)}
    >
      <SelectTrigger className="h-auto justify-start border-0 bg-transparent px-0 py-0 text-base shadow-none focus-visible:ring-0">
        <SelectValue className="flex-none">{value} аукционов</SelectValue>
      </SelectTrigger>
      <SelectContent
        className="w-56 rounded-2xl p-2"
        align="start"
        alignItemWithTrigger={false}
        sideOffset={12}
      >
        {auctionListPageSizeOptions.map((pageSize) => (
          <SelectItem key={pageSize} value={pageSize} indicator="radio">
            {pageSize} аукционов
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
