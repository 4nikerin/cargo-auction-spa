import { createFileRoute } from '@tanstack/react-router';

import { AuctionBetsPlaceholderPage } from '@/pages/auction-detail';

export const Route = createFileRoute('/auctions/$auctionUuid/bets')({
  staticData: {
    breadcrumb: 'Ставки',
  },
  component: AuctionBetsPlaceholderPage,
});
