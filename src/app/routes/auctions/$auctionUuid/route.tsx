import { Outlet, createFileRoute } from '@tanstack/react-router';

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

  const handlePlaceBetUrlClose = () => {
    void navigate({
      search: (current) => ({
        ...current,
        action: undefined,
      }),
      replace: true,
    });
  };

  return (
    <AuctionDetailLayout
      auctionUuid={auctionUuid}
      placeBetOpenFromUrl={action === 'place-bet'}
      onPlaceBetUrlClose={handlePlaceBetUrlClose}
    >
      <Outlet />
    </AuctionDetailLayout>
  );
};
