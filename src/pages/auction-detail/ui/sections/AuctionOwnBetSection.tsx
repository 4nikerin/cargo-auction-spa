import { Badge } from '@/shared/ui/badge';
import type { AuctionDetail } from '@/entities/auction';

import {
  formatAuctionPrice,
  formatBoolean,
} from '../../model/auction-detail-labels';
import { AuctionDetailField } from '../AuctionDetailField';

interface AuctionOwnBetSectionProps {
  trading: AuctionDetail['trading'];
}

export const AuctionOwnBetSection = ({
  trading,
}: AuctionOwnBetSectionProps) => {
  const { your } = trading;

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="font-medium">Ваша ставка</h3>
      <dl className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AuctionDetailField
          label="Ставка сделана"
          value={formatBoolean(your?.bet)}
        />
        <AuctionDetailField
          label="Последняя ставка"
          value={formatAuctionPrice(your?.last_bet_with_vat ?? your?.last_bet)}
        />
        <AuctionDetailField label="Победа" value={formatBoolean(your?.win)} />
        <AuctionDetailField
          label="Можно сделать ставку"
          value={
            <Badge variant={trading.can_set_bet ? 'default' : 'secondary'}>
              {trading.can_set_bet ? 'Доступно' : 'Недоступно'}
            </Badge>
          }
        />
      </dl>
    </div>
  );
};
