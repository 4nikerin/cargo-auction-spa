import { Gavel } from 'lucide-react';

interface AuctionBetsEmptyStateProps {
  showAll: boolean;
}

export const AuctionBetsEmptyState = ({
  showAll,
}: AuctionBetsEmptyStateProps) => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Gavel className="size-6 text-muted-foreground" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-semibold">Ставок пока нет</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {showAll
          ? 'В аукционе нет активных или отменённых ставок.'
          : 'Участники ещё не сделали ни одной активной ставки.'}
      </p>
    </div>
  );
};
