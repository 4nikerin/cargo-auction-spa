import {
  AuctionTradingStatusBadge,
  getAuctionTypeLabel,
} from '@/entities/auction';
import { PlaceAuctionBetButton } from '@/features/place-auction-bet';
import { Badge } from '@/shared/ui/badge';
import { StickySurface } from '@/shared/ui/sticky-surface';
import type { AuctionDetail } from '@/entities/auction';

interface AuctionDetailStickyHeaderProps {
  auctionUuid: string;
  detail: AuctionDetail;
  placeBetOpenFromUrl: boolean;
  onPlaceBetUrlClose: () => void;
}

export const AuctionDetailStickyHeader = ({
  auctionUuid,
  detail,
  placeBetOpenFromUrl,
  onPlaceBetUrlClose,
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

        <PlaceAuctionBetButton
          auctionUuid={auctionUuid}
          trading={detail.trading}
          openFromUrl={placeBetOpenFromUrl}
          onUrlClose={onPlaceBetUrlClose}
        />
      </div>
    </StickySurface>
  );
};
