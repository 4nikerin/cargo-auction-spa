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
  // Запускаем запрос при preload, но не блокируем монтирование страницы:
  // фильтры остаются на месте, а pending/error отображаются внутри списка.
  loader: ({ context, deps }) => {
    void context.queryClient.prefetchQuery(
      auctionListQueryOptions(deps.params),
    );
  },
  component: AuctionListPage,
  errorComponent: AuctionListRouteError,
});
