import { createFileRoute } from '@tanstack/react-router';

import {
  AuctionBetsPage,
  auctionBetsSearchSchema,
} from '@/pages/auction-detail';

export const Route = createFileRoute('/auctions/$auctionUuid/bets')({
  staticData: {
    breadcrumb: 'Ставки',
  },
  validateSearch: auctionBetsSearchSchema,
  component: () => <AuctionBetsRoute />,
});

const AuctionBetsRoute = () => {
  const { auctionUuid } = Route.useParams();
  const { all } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <AuctionBetsPage
      auctionUuid={auctionUuid}
      showAll={all === true}
      onShowAllChange={(showAll) => {
        void navigate({
          search: { all: showAll ? true : undefined },
          replace: true,
        });
      }}
    />
  );
};
