import { Skeleton } from '@/shared/ui/skeleton';

export const AuctionListSkeleton = () => {
  return (
    <div className="space-y-4" aria-label="Загрузка аукционов">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="h-72 w-full rounded-xl" />
      ))}
    </div>
  );
};
