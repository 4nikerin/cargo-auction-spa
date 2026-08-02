import { Construction } from 'lucide-react';

export const AuctionBetsPlaceholderPage = () => {
  return (
    <section className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Construction
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        />
      </span>
      <h2 className="mt-4 text-lg font-semibold">Ставки</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        История ставок будет реализована следующим этапом.
      </p>
    </section>
  );
};
