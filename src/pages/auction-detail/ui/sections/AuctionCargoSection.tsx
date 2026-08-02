import { Package } from 'lucide-react';

import { formatNumber, formatPrice } from '@/shared/lib/format';
import type { AuctionDetail } from '@/entities/auction';

import { formatBoolean } from '../../model/auction-detail-labels';
import { getAuctionDetailVisibility } from '../../model/auction-detail-visibility';
import { AuctionDetailField } from '../AuctionDetailField';
import { AuctionDetailSection } from '../AuctionDetailSection';
import { AuctionVehicleRequirements } from './AuctionVehicleRequirements';

interface AuctionCargoSectionProps {
  detail: AuctionDetail;
}

const getEnabledLabels = (
  values: Array<{ enabled?: boolean; label: string }>,
) => {
  const labels = values
    .filter(({ enabled }) => enabled)
    .map(({ label }) => label);

  return labels.length ? labels.join(', ') : 'Не указаны';
};

export const AuctionCargoSection = ({ detail }: AuctionCargoSectionProps) => {
  const { cargo, routes } = detail;
  const { isCargoPriceHidden } = getAuctionDetailVisibility(detail);
  const routeCargo = routes.find((point) => point.cargo)?.cargo;

  const loadingTypes = getEnabledLabels([
    { enabled: cargo.loading_types?.side, label: 'боковая' },
    { enabled: cargo.loading_types?.top, label: 'верхняя' },
    { enabled: cargo.loading_types?.rear, label: 'задняя' },
    { enabled: cargo.loading_types?.full, label: 'полная растентовка' },
  ]);
  const requiredDocuments = getEnabledLabels([
    { enabled: cargo.docs?.tir, label: 'TIR' },
    { enabled: cargo.docs?.cmr, label: 'CMR' },
    { enabled: cargo.docs?.t1, label: 'T1' },
    { enabled: cargo.docs?.med, label: 'медкнижка' },
  ]);
  const additionalRequirements = getEnabledLabels([
    { enabled: Boolean(cargo.conics), label: `коники: ${cargo.conics}` },
    { enabled: Boolean(cargo.belts), label: `ремни: ${cargo.belts}` },
    { enabled: Boolean(cargo.adr), label: `ADR: ${cargo.adr}` },
    { enabled: cargo.coupling === true, label: 'сцепка' },
    { enabled: cargo.air_pass === true, label: 'пневмоподвеска' },
    { enabled: cargo.low_loader === true, label: 'низкорамник' },
    { enabled: cargo.additional_load === true, label: 'догруз' },
  ]);

  return (
    <AuctionDetailSection title="Груз и требования к ТС" icon={<Package />}>
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AuctionDetailField
          label="Груз"
          value={routeCargo?.name ?? 'Не указан'}
        />
        <AuctionDetailField
          label="Вес"
          value={routeCargo?.weight ? `${routeCargo.weight} т` : 'Не указан'}
        />
        <AuctionDetailField
          label="Объём"
          value={routeCargo?.volume ? `${routeCargo.volume} м³` : 'Не указан'}
        />
        <AuctionDetailField
          label="Тип кузова"
          value={cargo.body_type ?? 'Не указан'}
        />
        <AuctionDetailField
          label="Количество машин"
          value={formatNumber(cargo.truck_count) ?? 'Не указано'}
        />
        <AuctionDetailField
          label="Расстояние"
          value={formatNumber(cargo.distance, ' км') ?? 'Не указано'}
        />
        <AuctionDetailField
          label="Международная перевозка"
          value={formatBoolean(cargo.is_international)}
        />
        <AuctionDetailField
          label="Температурный режим"
          value={
            cargo.temp_from != null || cargo.temp_to != null
              ? `${cargo.temp_from ?? '—'}…${cargo.temp_to ?? '—'} °C`
              : 'Не указан'
          }
        />
        <AuctionDetailField label="Типы загрузки" value={loadingTypes} />
        <AuctionDetailField
          label="Необходимые документы"
          value={requiredDocuments}
        />
        <AuctionDetailField
          label="Дополнительные требования"
          value={additionalRequirements}
        />
        <AuctionDetailField
          label="Контейнер"
          value={
            cargo.containered
              ? [cargo.container_type, cargo.container_size]
                  .filter(Boolean)
                  .join(' · ') || 'Требуется'
              : 'Не требуется'
          }
        />
        {!isCargoPriceHidden ? (
          <AuctionDetailField
            label="Объявленная стоимость груза"
            value={
              cargo.price && Number(cargo.price) > 0
                ? formatPrice(Number(cargo.price))
                : 'Не указана'
            }
          />
        ) : null}
      </dl>

      <AuctionVehicleRequirements requirements={cargo.car} />
    </AuctionDetailSection>
  );
};
