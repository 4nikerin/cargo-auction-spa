import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { auctionDetailQueryOptions } from '@/entities/auction';

import { AuctionDetailStickyHeader } from './AuctionDetailStickyHeader';

interface AuctionDetailLayoutProps {
  auctionUuid: string;
  children: ReactNode;
  placeBetOpen: boolean;
  onPlaceBetOpenChange: (open: boolean) => void;
}

const tabClassName =
  'rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground';

export const AuctionDetailLayout = ({
  auctionUuid,
  children,
  placeBetOpen,
  onPlaceBetOpenChange,
}: AuctionDetailLayoutProps) => {
  const { data: detail } = useSuspenseQuery(
    auctionDetailQueryOptions({ auctionUuid }),
  );

  return (
    <main className="w-full pb-8 lg:pb-10">
      <AuctionDetailStickyHeader
        auctionUuid={auctionUuid}
        detail={detail}
        placeBetOpen={placeBetOpen}
        onPlaceBetOpenChange={onPlaceBetOpenChange}
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="mx-auto my-5 flex w-fit rounded-xl bg-muted p-1"
          aria-label="Разделы аукциона"
        >
          <Link
            to="/auctions/$auctionUuid"
            params={{ auctionUuid }}
            activeOptions={{ exact: true }}
            className={tabClassName}
            activeProps={{
              className: 'bg-background text-foreground shadow-sm',
            }}
          >
            Данные аукциона
          </Link>
          <Link
            to="/auctions/$auctionUuid/bets"
            params={{ auctionUuid }}
            className={tabClassName}
            activeProps={{
              className: 'bg-background text-foreground shadow-sm',
            }}
          >
            Ставки
          </Link>
        </nav>

        {children}
      </div>
    </main>
  );
};
