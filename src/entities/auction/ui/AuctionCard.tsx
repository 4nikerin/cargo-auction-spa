import {
  ArrowRight,
  Building2,
  CalendarClock,
  Package,
  Scale,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { formatDateTime, formatNumber, formatPrice } from '@/shared/lib/format';
import { Badge } from '@/shared/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { hasAuctionOwnBet } from '../model/auction-own-bet';
import { getAuctionStatusLabel } from '../model/auction-status-labels';
import { getAuctionTypeLabel } from '../model/auction-type-labels';
import { AuctionCardInfoItem } from './AuctionCardInfoItem';
import { AuctionCardRoutePoint } from './AuctionCardRoutePoint';
import { AuctionTradingStatusBadge } from './AuctionTradingStatusBadge';
import type { AuctionListItem } from '../api/auction-api';

interface AuctionCardProps {
  action?: ReactNode;
  auction: AuctionListItem;
  detailsLink?: ReactNode;
}

/** Краткое представление аукциона для списков. */
export const AuctionCard = ({
  action,
  auction,
  detailsLink,
}: AuctionCardProps) => {
  const { cargo, main, organizer, route, trading } = auction;
  const isLeading = trading?.status_mobile === 'Leading';

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-shadow hover:shadow-md',
        isLeading &&
          'border-l-4 border-l-emerald-500 bg-linear-to-r from-emerald-50/55 via-card to-card dark:from-emerald-950/25',
      )}
    >
      {detailsLink}
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{main?.cargo_num ?? 'Аукцион без номера'}</CardTitle>
          <Badge variant="outline">{getAuctionTypeLabel(main?.auc_type)}</Badge>
          <Badge variant="secondary">
            {getAuctionStatusLabel(trading?.status)}
          </Badge>
          <AuctionTradingStatusBadge status={trading?.status_mobile} />
        </div>
        <CardDescription className="flex items-center gap-1.5">
          <Building2 className="size-3.5" aria-hidden="true" />
          {organizer?.organization_name ?? 'Организатор не указан'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 rounded-lg bg-muted/55 p-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <AuctionCardRoutePoint
            label="Погрузка"
            city={route?.load?.city}
            address={route?.load?.address}
            date={route?.load?.date}
          />
          <ArrowRight
            className="hidden size-5 text-muted-foreground sm:block"
            aria-hidden="true"
          />
          <AuctionCardRoutePoint
            label="Выгрузка"
            city={route?.unload?.city}
            address={route?.unload?.address}
            date={route?.unload?.date}
          />
        </div>

        <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <AuctionCardInfoItem
            icon={<Package />}
            label="Груз"
            value={cargo?.name ?? 'Не указан'}
          />
          <AuctionCardInfoItem
            icon={<Scale />}
            label="Параметры"
            value={`${formatNumber(cargo?.weight, ' т') ?? 'Не указано'} · ${formatNumber(cargo?.volume, ' м³') ?? 'Не указано'}`}
          />
          <AuctionCardInfoItem
            icon={<CalendarClock />}
            label="Окончание торгов"
            value={formatDateTime(trading?.stop_time) ?? 'Не указано'}
          />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Текущая цена</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatPrice(trading?.price?.current) ?? 'Цена не указана'}
            </p>
            {main?.price_per_km != null ? (
              <p className="text-xs text-muted-foreground">
                {formatPrice(main.price_per_km)} / км
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-wrap justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>Кузов: {cargo?.body_type ?? 'не указан'}</span>
          <span>Моя ставка: {hasAuctionOwnBet(trading) ? 'есть' : 'нет'}</span>
        </div>
        {action ? <div className="relative z-20 ml-auto">{action}</div> : null}
      </CardFooter>
    </Card>
  );
};
