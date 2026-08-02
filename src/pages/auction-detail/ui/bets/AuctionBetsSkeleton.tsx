import { Skeleton } from '@/shared/ui/skeleton';

export const AuctionBetsSkeleton = () => {
  return (
    <div className="space-y-3" role="status">
      <span className="sr-only">Загрузка ставок</span>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-8 w-48" />
      </div>
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="h-52 w-full rounded-2xl" />
      ))}
    </div>
  );
};
