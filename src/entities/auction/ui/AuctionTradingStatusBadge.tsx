import { cva } from 'class-variance-authority';

import { Badge } from '@/shared/ui/badge';

import { getTradingStatusLabel } from '../model/trading-status-labels';
import type { AuctionListItem } from '../api/auction-api';

type TradingStatus = NonNullable<AuctionListItem['trading']>['status_mobile'];

const tradingStatusBadgeVariants = cva('', {
  variants: {
    status: {
      NotParticipating: 'border-border bg-muted/60 text-muted-foreground',
      Leading: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      Losing: 'border-amber-200 bg-amber-50 text-amber-800',
      Winner: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      Confirmed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      Unknown: 'border-border bg-muted/60 text-muted-foreground',
    },
  },
});

interface AuctionTradingStatusBadgeProps {
  status: TradingStatus;
}

export const AuctionTradingStatusBadge = ({
  status,
}: AuctionTradingStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={tradingStatusBadgeVariants({ status: status ?? 'Unknown' })}
    >
      {getTradingStatusLabel(status)}
    </Badge>
  );
};
