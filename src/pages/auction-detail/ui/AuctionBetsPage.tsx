import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  auctionBetsQueryOptions,
  auctionDetailQueryOptions,
} from '@/entities/auction';
import { getRussianPluralForm } from '@/shared/lib/plural';
import { Switch } from '@/shared/ui/switch';

import { getAuctionParticipantsCount } from '../model/auction-bet-display';
import { getAuctionDetailVisibility } from '../model/auction-detail-visibility';
import { AuctionBetsEmptyState } from './bets/AuctionBetsEmptyState';
import { AuctionBetsError } from './bets/AuctionBetsError';
import { AuctionBetsHiddenState } from './bets/AuctionBetsHiddenState';
import { AuctionBetsList } from './bets/AuctionBetsList';
import { AuctionBetsSkeleton } from './bets/AuctionBetsSkeleton';

interface AuctionBetsPageProps {
  auctionUuid: string;
  showAll: boolean;
  onShowAllChange: (showAll: boolean) => void;
}

const formatBetsCount = (count: number) => {
  switch (getRussianPluralForm(count)) {
    case 'one':
      return `Найдена ${count} ставка`;
    case 'few':
      return `Найдено ${count} ставки`;
    default:
      return `Найдено ${count} ставок`;
  }
};

const formatParticipantsCount = (count: number) => {
  switch (getRussianPluralForm(count)) {
    case 'one':
      return `${count} участник`;
    case 'few':
      return `${count} участника`;
    default:
      return `${count} участников`;
  }
};

export const AuctionBetsPage = ({
  auctionUuid,
  showAll,
  onShowAllChange,
}: AuctionBetsPageProps) => {
  const { data: detail } = useSuspenseQuery(
    auctionDetailQueryOptions({ auctionUuid }),
  );
  const { isBetsHistoryHidden } = getAuctionDetailVisibility(detail);
  const betsQuery = useQuery({
    ...auctionBetsQueryOptions({ auctionUuid, showAll }),
    enabled: !isBetsHistoryHidden,
  });

  if (isBetsHistoryHidden) {
    return <AuctionBetsHiddenState />;
  }

  if (betsQuery.isPending) {
    return <AuctionBetsSkeleton />;
  }

  if (betsQuery.isError) {
    return (
      <AuctionBetsError
        error={betsQuery.error}
        onRetry={() => {
          void betsQuery.refetch();
        }}
      />
    );
  }

  const bets = betsQuery.data.bets;
  const participantsCount = getAuctionParticipantsCount(bets);

  return (
    <section aria-label="Список ставок">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {bets.length
            ? `${formatBetsCount(bets.length)} · ${formatParticipantsCount(participantsCount)}`
            : 'В этом аукционе ещё нет ставок'}
        </p>

        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
          Показать отменённые
          <Switch checked={showAll} onCheckedChange={onShowAllChange} />
        </label>
      </div>

      {bets.length ? (
        <AuctionBetsList bets={bets} />
      ) : (
        <AuctionBetsEmptyState showAll={showAll} />
      )}
    </section>
  );
};
