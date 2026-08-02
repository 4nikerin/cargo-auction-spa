import { Skeleton } from '@/shared/ui/skeleton';

import { AuctionPageSizeSelect } from './AuctionPageSizeSelect';
import { AuctionSortSelect } from './AuctionSortSelect';
import type {
  AuctionListPageSize,
  AuctionListSort,
} from '../model/auction-list-search';

interface AuctionListToolbarProps {
  total?: number;
  sort: AuctionListSort;
  pageSize: AuctionListPageSize;
  isPending: boolean;
  onSortChange: (sort: AuctionListSort) => void;
  onPageSizeChange: (pageSize: AuctionListPageSize) => void;
}

const totalFormatter = new Intl.NumberFormat('ru-RU');
const auctionPluralRules = new Intl.PluralRules('ru-RU');

const getAuctionCountLabel = (total: number) => {
  switch (auctionPluralRules.select(total)) {
    case 'one':
      return 'аукцион';
    case 'few':
      return 'аукциона';
    default:
      return 'аукционов';
  }
};

export const AuctionListToolbar = ({
  total,
  sort,
  pageSize,
  isPending,
  onSortChange,
  onPageSizeChange,
}: AuctionListToolbarProps) => {
  return (
    <div className="my-7 grid min-h-20 content-start gap-2">
      {isPending ? (
        <Skeleton className="h-8 w-52" />
      ) : total != null ? (
        <p className="text-2xl font-medium tracking-tight">
          Найдено {totalFormatter.format(total)} {getAuctionCountLabel(total)}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <AuctionSortSelect
          value={sort}
          disabled={isPending}
          onChange={onSortChange}
        />
        <AuctionPageSizeSelect
          value={pageSize}
          disabled={isPending}
          onChange={onPageSizeChange}
        />
      </div>
    </div>
  );
};
