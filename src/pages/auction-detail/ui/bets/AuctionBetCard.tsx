import { Building2, Phone, UserRound } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { formatDateTime } from '@/shared/lib/format';
import { Badge } from '@/shared/ui/badge';
import type { AuctionBet } from '@/entities/auction';

import {
  getAuctionBetPriceNoVat,
  getAuctionBetPriceWithVat,
  getAuctionBetStatus,
} from '../../model/auction-bet-display';
import { formatAuctionPrice } from '../../model/auction-detail-labels';
import { AuctionDetailField } from '../AuctionDetailField';

interface AuctionBetCardProps {
  bet: AuctionBet;
}

const statusBadges = {
  active: { label: 'Активная', variant: 'outline' },
  counter: { label: 'Встречная', variant: 'secondary' },
  rejected: { label: 'Отменена', variant: 'destructive' },
  winner: { label: 'Победитель', variant: 'default' },
} as const;

export const AuctionBetCard = ({ bet }: AuctionBetCardProps) => {
  const status = getAuctionBetStatus(bet);
  const statusBadge = statusBadges[status];
  const priceWithVat = getAuctionBetPriceWithVat(bet);
  const priceNoVat = getAuctionBetPriceNoVat(bet);
  const hasContact = Boolean(bet.contact_name || bet.contact_phone);

  return (
    <li
      className={cn(
        'rounded-2xl border bg-card p-4 sm:p-5',
        status === 'winner' && 'border-emerald-300 bg-emerald-50/35',
        status === 'rejected' && 'bg-muted/35',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {bet.place != null ? (
              <Badge variant="outline">Место {bet.place}</Badge>
            ) : null}
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          </div>

          <p className="mt-3 flex items-center gap-2 font-semibold">
            <Building2
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            {bet.organization_name || 'Организация не указана'}
          </p>
          {bet.organization_inn ? (
            <p className="mt-1 text-sm text-muted-foreground">
              ИНН {bet.organization_inn}
            </p>
          ) : null}
        </div>

        <div className="sm:text-right">
          <p className="text-sm text-muted-foreground">Ставка с НДС</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {formatAuctionPrice(priceWithVat)}
          </p>
          {priceNoVat != null ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {formatAuctionPrice(priceNoVat)} без НДС
            </p>
          ) : null}
        </div>
      </div>

      <dl className="mt-5 grid gap-4 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <AuctionDetailField
          label="Дата ставки"
          value={formatDateTime(bet.created_at) ?? 'Не указана'}
        />
        <AuctionDetailField
          label="Условия оплаты"
          value={bet.price_info?.payment_type ?? 'Не указаны'}
        />
        <AuctionDetailField
          label="Ставка НДС"
          value={
            bet.price_info?.vat_rate
              ? `${bet.price_info.vat_rate}%`
              : 'Не указана'
          }
        />
        <AuctionDetailField
          label="Номер рейса"
          value={bet.run_number ? String(bet.run_number) : 'Не указан'}
        />
      </dl>

      {hasContact ? (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-sm">
          {bet.contact_name ? (
            <p className="flex items-center gap-2">
              <UserRound
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              {bet.contact_name}
            </p>
          ) : null}
          {bet.contact_phone ? (
            <p className="flex items-center gap-2">
              <Phone
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              {bet.contact_phone}
            </p>
          ) : null}
        </div>
      ) : null}

      {bet.transporter_comment ? (
        <p className="mt-4 rounded-lg bg-muted/50 p-3 text-sm">
          {bet.transporter_comment}
        </p>
      ) : null}

      {status === 'rejected' ? (
        <p className="mt-4 text-sm text-destructive">
          {bet.cancel_reason || 'Причина отмены не указана'}
        </p>
      ) : null}
    </li>
  );
};
