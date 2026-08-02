import { CalendarDays } from 'lucide-react';

import { getAuctionStatusLabel, getAuctionTypeLabel } from '@/entities/auction';
import { formatDateTime } from '@/shared/lib/format';
import type { AuctionDetail } from '@/entities/auction';

import { getBidMeasurementLabel } from '../../model/auction-detail-labels';
import { AuctionDetailField } from '../AuctionDetailField';
import { AuctionDetailSection } from '../AuctionDetailSection';

interface AuctionOverviewSectionProps {
  detail: AuctionDetail;
}

export const AuctionOverviewSection = ({
  detail: { assembly, main, trading },
}: AuctionOverviewSectionProps) => {
  return (
    <AuctionDetailSection title="Основные данные" icon={<CalendarDays />}>
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AuctionDetailField
          label="Номер заявки"
          value={main.cargo_num ?? 'Не указан'}
        />
        <AuctionDetailField
          label="Тип аукциона"
          value={getAuctionTypeLabel(main.auc_type)}
        />
        <AuctionDetailField
          label="Статус аукциона"
          value={getAuctionStatusLabel(trading.status)}
        />
        <AuctionDetailField
          label="Дата заявки"
          value={formatDateTime(main.cargo_date) ?? 'Не указана'}
        />
        <AuctionDetailField
          label="Создан"
          value={formatDateTime(main.created_at) ?? 'Не указано'}
        />
        <AuctionDetailField
          label="Единица ставки"
          value={getBidMeasurementLabel(trading.bid_measurement_type)}
        />
        <AuctionDetailField
          label="Начало торгов"
          value={formatDateTime(trading.start_time) ?? 'Не указано'}
        />
        <AuctionDetailField
          label="Окончание торгов"
          value={formatDateTime(trading.stop_time) ?? 'Не указано'}
        />
        <AuctionDetailField
          label="Избранное"
          value={trading.is_favorite ? 'Добавлен' : 'Не добавлен'}
        />
        <AuctionDetailField
          label="Номер сборки"
          value={assembly.num ?? 'Не указан'}
        />
        <AuctionDetailField
          label="Дата сборки"
          value={formatDateTime(assembly.date) ?? 'Не указана'}
        />
      </dl>
    </AuctionDetailSection>
  );
};
