import { MapPin } from 'lucide-react';

import { formatDateTime } from '@/shared/lib/format';
import type { AuctionDetail } from '@/entities/auction';

import { getOperationTypeLabel } from '../../model/auction-detail-labels';

type RoutePoint = AuctionDetail['routes'][number];

interface AuctionRoutePointProps {
  point: RoutePoint;
  hideAddressAndContacts: boolean;
}

export const AuctionRoutePoint = ({
  point,
  hideAddressAndContacts,
}: AuctionRoutePointProps) => {
  const { cargo, contact, location } = point;

  return (
    <li className="relative rounded-xl border bg-muted/25 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
          <MapPin className="size-4 text-muted-foreground" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">
            {getOperationTypeLabel(point.op_type)}
          </p>
          <p className="mt-1 text-lg font-medium">
            {location?.city_name ??
              location?.city_full_name ??
              'Город не указан'}
          </p>
          {!hideAddressAndContacts && location?.loading_address ? (
            <p className="text-sm text-muted-foreground">
              {location.loading_address}
            </p>
          ) : null}
          {hideAddressAndContacts ? (
            <p className="text-sm text-muted-foreground">
              Адрес и контакты скрыты организатором
            </p>
          ) : null}
        </div>
      </div>

      <dl className="mt-4 grid gap-4 border-t pt-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <dt className="text-xs text-muted-foreground">Начало</dt>
          <dd className="mt-1 text-sm font-medium">
            {formatDateTime(point.start_date) ?? 'Не указано'}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Окончание</dt>
          <dd className="mt-1 text-sm font-medium">
            {formatDateTime(point.end_date) ?? 'Не указано'}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Груз</dt>
          <dd className="mt-1 text-sm font-medium">
            {cargo?.name ?? 'Не указан'}
          </dd>
          {cargo?.weight || cargo?.volume ? (
            <dd className="text-xs text-muted-foreground">
              {[
                cargo.weight && `${cargo.weight} т`,
                cargo.volume && `${cargo.volume} м³`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </dd>
          ) : null}
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Контрагент</dt>
          <dd className="mt-1 text-sm font-medium">
            {point.contractor || 'Не указан'}
          </dd>
          {point.contractor_inn ? (
            <dd className="text-xs text-muted-foreground">
              ИНН {point.contractor_inn}
            </dd>
          ) : null}
        </div>
        {!hideAddressAndContacts ? (
          <div>
            <dt className="text-xs text-muted-foreground">Контакт на точке</dt>
            <dd className="mt-1 text-sm font-medium">
              {contact?.name || contact?.phone
                ? [contact.name, contact.phone].filter(Boolean).join(' · ')
                : 'Не указан'}
            </dd>
          </div>
        ) : null}
      </dl>

      {point.comment ? (
        <p className="mt-4 rounded-lg bg-background p-3 text-sm">
          {point.comment}
        </p>
      ) : null}
    </li>
  );
};
