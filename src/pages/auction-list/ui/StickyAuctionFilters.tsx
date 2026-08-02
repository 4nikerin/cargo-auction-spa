import { useIntersectionObserver } from 'usehooks-ts';

import { AuctionFilters } from '@/features/filter-auctions';
import { cn } from '@/shared/lib/cn';
import type { AuctionFiltersValue } from '@/features/filter-auctions';

interface StickyAuctionFiltersProps {
  value: AuctionFiltersValue;
  onChange: (value: AuctionFiltersValue) => void;
}

export const StickyAuctionFilters = ({
  value,
  onChange,
}: StickyAuctionFiltersProps) => {
  const { ref: sentinelRef, isIntersecting: isSentinelVisible } =
    useIntersectionObserver({
      initialIsIntersecting: true,
      threshold: 1,
    });

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <div
        className={cn(
          'sticky top-0 z-30 border-b border-transparent transition-[background-color,border-color,box-shadow]',
          !isSentinelVisible &&
            'border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85',
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <AuctionFilters value={value} onChange={onChange} />
        </div>
      </div>
    </>
  );
};
