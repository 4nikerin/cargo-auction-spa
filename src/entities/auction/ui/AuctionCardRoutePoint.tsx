import { MapPin } from 'lucide-react';

import { formatDateTime } from '@/shared/lib/format';

interface AuctionCardRoutePointProps {
  label: string;
  city?: string;
  address?: string;
  date?: string;
}

export const AuctionCardRoutePoint = ({
  label,
  city,
  address,
  date,
}: AuctionCardRoutePointProps) => {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <MapPin className="size-3.5" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1 truncate font-medium">{city ?? 'Город не указан'}</p>
      <p className="truncate text-xs text-muted-foreground">
        {address ?? 'Адрес не указан'}
      </p>
      <p className="mt-1 text-xs">{formatDateTime(date) ?? 'Не указано'}</p>
    </div>
  );
};
