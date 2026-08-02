import { formatPrice } from '@/shared/lib/format';
import type { AuctionDetail } from '@/entities/auction';

import { formatAuctionPrice } from '../../model/auction-detail-labels';
import { AuctionDetailField } from '../AuctionDetailField';

interface AuctionPricePanelProps {
  price: AuctionDetail['trading']['price'];
}

export const AuctionPricePanel = ({ price }: AuctionPricePanelProps) => {
  return (
    <div className="rounded-xl bg-muted/45 p-5">
      <p className="text-sm text-muted-foreground">Текущая цена</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">
        {formatAuctionPrice(price?.current)}
      </p>
      {price?.price_per_km != null ? (
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(price.price_per_km)} / км
        </p>
      ) : null}

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
        <AuctionDetailField
          label="Доступная цена"
          value={formatAuctionPrice(price?.available)}
        />
        <AuctionDetailField
          label="Шаг"
          value={formatAuctionPrice(price?.step)}
        />
        <AuctionDetailField
          label="Минимум"
          value={formatAuctionPrice(price?.min)}
        />
        <AuctionDetailField
          label="Максимум"
          value={formatAuctionPrice(price?.max)}
        />
      </dl>
    </div>
  );
};
