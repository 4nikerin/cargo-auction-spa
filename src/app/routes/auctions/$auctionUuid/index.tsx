import { createFileRoute } from '@tanstack/react-router';

import { AuctionDetailPage } from '@/pages/auction-detail';

export const Route = createFileRoute('/auctions/$auctionUuid/')({
  component: () => <AuctionDetailIndexRoute />,
});

const AuctionDetailIndexRoute = () => {
  const { auctionUuid } = Route.useParams();

  return <AuctionDetailPage auctionUuid={auctionUuid} />;
};
