import { Outlet, createFileRoute } from '@tanstack/react-router';

import { auctionDetailQueryOptions } from '@/entities/auction';
import {
  AuctionDetailLayout,
  AuctionDetailRouteError,
  AuctionDetailSkeleton,
} from '@/pages/auction-detail';

export const Route = createFileRoute('/auctions/$auctionUuid')({
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

  return (
    <AuctionDetailLayout auctionUuid={auctionUuid}>
      <Outlet />
    </AuctionDetailLayout>
  );
};
