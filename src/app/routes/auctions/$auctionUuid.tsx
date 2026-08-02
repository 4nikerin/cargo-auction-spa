import { createFileRoute } from '@tanstack/react-router';

import { AuctionDetailPage } from '@/pages/auction-detail';

export const Route = createFileRoute('/auctions/$auctionUuid')({
  staticData: {
    breadcrumb: ({ auctionUuid }) =>
      auctionUuid ? `Аукцион #${auctionUuid}` : 'Аукцион',
  },
  // Обёртка откладывает обращение к компоненту до рендера, когда Route уже создан.
  component: () => <AuctionDetailRoute />,
});

const AuctionDetailRoute = () => {
  const { auctionUuid } = Route.useParams();

  return <AuctionDetailPage auctionNumber={auctionUuid} />;
};
