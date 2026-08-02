import { PackageOpen } from 'lucide-react';

export const EmptyAuctionList = () => {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card px-4 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <PackageOpen
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        />
      </span>
      <h2 className="mt-4 text-lg font-semibold">Аукционы не найдены</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Попробуйте изменить или сбросить параметры поиска.
      </p>
    </div>
  );
};
