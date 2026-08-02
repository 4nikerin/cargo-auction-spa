import { Route } from 'lucide-react';

import type { AuctionDetail } from '@/entities/auction';

import { getAuctionDetailVisibility } from '../../model/auction-detail-visibility';
import { AuctionDetailSection } from '../AuctionDetailSection';
import { AuctionRoutePoint } from './AuctionRoutePoint';

interface AuctionRouteSectionProps {
  detail: AuctionDetail;
}

export const AuctionRouteSection = ({ detail }: AuctionRouteSectionProps) => {
  const { arePointDetailsHidden, isRouteHidden } =
    getAuctionDetailVisibility(detail);

  const points = [...detail.routes].sort(
    (left, right) => (left.row_num ?? 0) - (right.row_num ?? 0),
  );

  return (
    <AuctionDetailSection title="Маршрут" icon={<Route />}>
      {isRouteHidden ? (
        <p className="text-sm text-muted-foreground">
          Информация о маршруте скрыта организатором.
        </p>
      ) : points.length ? (
        <ol className="space-y-3">
          {points.map((point, index) => (
            <AuctionRoutePoint
              key={`${point.row_num ?? index}-${point.op_type ?? 'point'}`}
              point={point}
              hideAddressAndContacts={arePointDetailsHidden}
            />
          ))}
        </ol>
      ) : (
        <p className="text-sm text-muted-foreground">
          Точки маршрута не указаны.
        </p>
      )}
    </AuctionDetailSection>
  );
};
