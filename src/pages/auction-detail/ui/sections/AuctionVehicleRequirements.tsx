import { Truck } from 'lucide-react';

import { formatNumber } from '@/shared/lib/format';
import type { AuctionDetail } from '@/entities/auction';

import { AuctionDetailField } from '../AuctionDetailField';

interface AuctionVehicleRequirementsProps {
  requirements: AuctionDetail['cargo']['car'];
}

export const AuctionVehicleRequirements = ({
  requirements,
}: AuctionVehicleRequirementsProps) => {
  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="flex items-center gap-2 font-medium">
        <Truck className="size-4 text-muted-foreground" />
        Требования к автомобилю
      </h3>
      {requirements ? (
        <dl className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AuctionDetailField
            label="Тип ТС"
            value={requirements.type ?? 'Не указан'}
          />
          <AuctionDetailField
            label="Грузоподъёмность"
            value={formatNumber(requirements.weight, ' т') ?? 'Не указана'}
          />
          <AuctionDetailField
            label="Объём кузова"
            value={formatNumber(requirements.volume, ' м³') ?? 'Не указан'}
          />
          <AuctionDetailField
            label="Габариты кузова"
            value={
              requirements.length != null ||
              requirements.width != null ||
              requirements.height != null
                ? `${requirements.length ?? '—'} × ${requirements.width ?? '—'} × ${requirements.height ?? '—'} м`
                : 'Не указаны'
            }
          />
        </dl>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          Дополнительные требования к автомобилю не заданы.
        </p>
      )}
    </div>
  );
};
