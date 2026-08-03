import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import { useRef } from 'react';

import { auctionDetailQueryOptions } from '@/entities/auction';
import {
  AuctionDetailLayout,
  AuctionDetailRouteError,
  AuctionDetailSkeleton,
  auctionDetailSearchSchema,
} from '@/pages/auction-detail';

export const Route = createFileRoute('/auctions/$auctionUuid')({
  validateSearch: auctionDetailSearchSchema,
  staticData: {
    breadcrumb: ({ auctionUuid }) =>
      auctionUuid ? `Аукцион #${auctionUuid}` : 'Аукцион',
  },
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      auctionDetailQueryOptions({ auctionUuid: params.auctionUuid }),
    ),
  component: () => <AuctionDetailRoute />,
  pendingComponent: AuctionDetailSkeleton,
  errorComponent: AuctionDetailRouteError,
});

const AuctionDetailRoute = () => {
  const { auctionUuid } = Route.useParams();
  const { action } = Route.useSearch();
  const navigate = Route.useNavigate();
  const router = useRouter();
  const openedFromDetailRef = useRef(false);

  const handlePlaceBetOpenChange = (open: boolean) => {
    if (!open && openedFromDetailRef.current) {
      openedFromDetailRef.current = false;
      router.history.back();
      return;
    }

    if (open) {
      openedFromDetailRef.current = true;
    }

    void navigate({
      search: (current) => ({
        ...current,
        action: open ? 'place-bet' : undefined,
      }),
      replace: !open,
    });
  };

  return (
    <AuctionDetailLayout
      auctionUuid={auctionUuid}
      placeBetOpen={action === 'place-bet'}
      onPlaceBetOpenChange={handlePlaceBetOpenChange}
    >
      <Outlet />
    </AuctionDetailLayout>
  );
};
