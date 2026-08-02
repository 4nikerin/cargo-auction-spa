import { AuctionFilters } from '@/features/filter-auctions';
import { StickySurface } from '@/shared/ui/sticky-surface';
import type { AuctionFiltersValue } from '@/features/filter-auctions';

interface StickyAuctionFiltersProps {
  value: AuctionFiltersValue;
  onChange: (value: AuctionFiltersValue) => void;
}

export const StickyAuctionFilters = ({
  value,
  onChange,
}: StickyAuctionFiltersProps) => {
  return (
    <StickySurface>
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <AuctionFilters value={value} onChange={onChange} />
      </div>
    </StickySurface>
  );
};
