import { useSuspenseQuery } from '@tanstack/react-query';

import { auctionDetailQueryOptions } from '@/entities/auction';

import { AuctionAdmittedOrganizationsSection } from './sections/AuctionAdmittedOrganizationsSection';
import { AuctionCargoSection } from './sections/AuctionCargoSection';
import { AuctionOrganizerSection } from './sections/AuctionOrganizerSection';
import { AuctionOverviewSection } from './sections/AuctionOverviewSection';
import { AuctionPaymentSection } from './sections/AuctionPaymentSection';
import { AuctionRouteSection } from './sections/AuctionRouteSection';
import { AuctionTradingSection } from './sections/AuctionTradingSection';

interface AuctionDetailPageProps {
  auctionUuid: string;
}

export const AuctionDetailPage = ({ auctionUuid }: AuctionDetailPageProps) => {
  const { data: detail } = useSuspenseQuery(
    auctionDetailQueryOptions({ auctionUuid }),
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AuctionOverviewSection detail={detail} />
      <AuctionOrganizerSection detail={detail} />
      <div className="lg:col-span-2">
        <AuctionRouteSection detail={detail} />
      </div>
      <div className="lg:col-span-2">
        <AuctionCargoSection detail={detail} />
      </div>
      <AuctionPaymentSection detail={detail} />
      <AuctionAdmittedOrganizationsSection detail={detail} />
      <div className="lg:col-span-2">
        <AuctionTradingSection detail={detail} />
      </div>
    </div>
  );
};
