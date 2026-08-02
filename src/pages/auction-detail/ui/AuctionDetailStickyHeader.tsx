import { Gavel } from 'lucide-react';

import {
  AuctionTradingStatusBadge,
  getAuctionTypeLabel,
} from '@/entities/auction';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { StickySurface } from '@/shared/ui/sticky-surface';
import type { AuctionDetail } from '@/entities/auction';

interface AuctionDetailStickyHeaderProps {
  detail: AuctionDetail;
}

export const AuctionDetailStickyHeader = ({
  detail,
}: AuctionDetailStickyHeaderProps) => {
  return (
    <StickySurface>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {detail.main.cargo_num
                ? `Аукцион ${detail.main.cargo_num}`
                : 'Аукцион'}
            </h1>
            <Badge variant="outline">
              {getAuctionTypeLabel(detail.main.auc_type)}
            </Badge>
            <AuctionTradingStatusBadge status={detail.trading.status_mobile} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {detail.organizer.organization_name ?? 'Организатор не указан'}
          </p>
        </div>

        <Button
          type="button"
          disabled
          title="Форма ставки будет реализована следующим этапом"
        >
          <Gavel data-icon="inline-start" aria-hidden="true" />
          Сделать ставку
        </Button>
      </div>
    </StickySurface>
  );
};
