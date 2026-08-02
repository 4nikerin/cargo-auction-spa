import { Gavel } from 'lucide-react';

import {
  AuctionTradingStatusBadge,
  getAuctionStatusLabel,
} from '@/entities/auction';
import { formatDateTime } from '@/shared/lib/format';
import type { AuctionDetail } from '@/entities/auction';

import {
  formatBoolean,
  getBidMeasurementLabel,
} from '../../model/auction-detail-labels';
import { getAuctionDetailVisibility } from '../../model/auction-detail-visibility';
import { AuctionDetailField } from '../AuctionDetailField';
import { AuctionDetailSection } from '../AuctionDetailSection';
import { AuctionOwnBetSection } from './AuctionOwnBetSection';
import { AuctionPricePanel } from './AuctionPricePanel';
import { AuctionVisibilityRestrictions } from './AuctionVisibilityRestrictions';

interface AuctionTradingSectionProps {
  detail: AuctionDetail;
}

export const AuctionTradingSection = ({
  detail,
}: AuctionTradingSectionProps) => {
  const { trading } = detail;
  const { price, settings } = trading;
  const visibility = getAuctionDetailVisibility(detail);

  return (
    <AuctionDetailSection title="Параметры торгов" icon={<Gavel />}>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AuctionDetailField
            label="Статус аукциона"
            value={getAuctionStatusLabel(trading.status)}
          />
          <AuctionDetailField
            label="Ваш статус"
            value={<AuctionTradingStatusBadge status={trading.status_mobile} />}
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
            label="Встречные ставки"
            value={formatBoolean(
              trading.allow_counter_bets,
              'Разрешены',
              'Запрещены',
            )}
          />
          <AuctionDetailField
            label="Продление после ставки"
            value={
              settings?.prolong_after_bet != null
                ? `${settings.prolong_after_bet} мин`
                : 'Не указано'
            }
          />
          <AuctionDetailField
            label="Время на передачу"
            value={
              settings?.transmission_time_in != null
                ? `${settings.transmission_time_in} ч`
                : 'Не указано'
            }
          />
        </dl>

        <AuctionPricePanel price={price} />
      </div>

      <AuctionOwnBetSection trading={trading} />
      <AuctionVisibilityRestrictions visibility={visibility} />
    </AuctionDetailSection>
  );
};
