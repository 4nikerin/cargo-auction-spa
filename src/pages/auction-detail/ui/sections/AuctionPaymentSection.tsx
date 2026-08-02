import { CreditCard } from 'lucide-react';

import type { AuctionDetail } from '@/entities/auction';

import { getPaymentDelayTypeLabel } from '../../model/auction-detail-labels';
import { AuctionDetailField } from '../AuctionDetailField';
import { AuctionDetailSection } from '../AuctionDetailSection';

interface AuctionPaymentSectionProps {
  detail: AuctionDetail;
}

export const AuctionPaymentSection = ({
  detail: { payment },
}: AuctionPaymentSectionProps) => {
  return (
    <AuctionDetailSection title="Условия оплаты" icon={<CreditCard />}>
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AuctionDetailField
          label="Форма оплаты"
          value={payment.form ?? 'Не указана'}
        />
        <AuctionDetailField
          label="Условие оплаты"
          value={payment.condition ?? 'Не указано'}
        />
        <AuctionDetailField
          label="Отсрочка"
          value={
            payment.delay != null
              ? `${payment.delay} ${getPaymentDelayTypeLabel(payment.delay_type)}`
              : 'Не указана'
          }
        />
        <AuctionDetailField
          label="Предоплата"
          value={payment.prepay ?? 'Не указана'}
        />
        <AuctionDetailField
          label="Код валюты"
          value={payment.currency_code ?? 'Не указан'}
        />
      </dl>
    </AuctionDetailSection>
  );
};
