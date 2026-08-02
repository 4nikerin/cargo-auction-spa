import { Skeleton } from '@/shared/ui/skeleton';

export const AuctionDetailSkeleton = () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-4 px-4 pt-4 pb-8 sm:px-6 lg:px-8">
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-12 w-72 rounded-xl" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-72 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl lg:col-span-2" />
      </div>
    </main>
  );
};
