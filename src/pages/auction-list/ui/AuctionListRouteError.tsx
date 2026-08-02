import { useRouter } from '@tanstack/react-router';
import type { ErrorRouteComponent } from '@tanstack/react-router';

import { AuctionListError } from './states';

export const AuctionListRouteError: ErrorRouteComponent = ({
  error,
  reset,
}) => {
  const router = useRouter();

  const retry = () => {
    reset();
    void router.invalidate();
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pt-4 lg:pb-10">
      <AuctionListError error={error} onRetry={retry} />
    </main>
  );
};
