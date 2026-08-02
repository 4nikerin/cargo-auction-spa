import { createFileRoute } from '@tanstack/react-router';

import { auctionListQueryOptions } from '@/entities/auction';
import {
  AuctionListPage,
  AuctionListRouteError,
  auctionListSearchSchema,
  toAuctionListRequest,
} from '@/pages/auction-list';

export const Route = createFileRoute('/auctions/')({
  validateSearch: auctionListSearchSchema,
  loaderDeps: ({ search }) => ({ params: toAuctionListRequest(search) }),
  // Loader и страница используют одну queryOptions-фабрику, поэтому делят запись кэша.
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(auctionListQueryOptions(deps.params)),
  component: AuctionListPage,
  errorComponent: AuctionListRouteError,
});
