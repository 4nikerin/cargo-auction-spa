import type { AuctionBet } from '@/entities/auction';

import { AuctionBetCard } from './AuctionBetCard';

interface AuctionBetsListProps {
  bets: AuctionBet[];
}

export const AuctionBetsList = ({ bets }: AuctionBetsListProps) => {
  return (
    <ol className="space-y-3">
      {bets.map((bet, index) => (
        <AuctionBetCard key={bet.id ?? index} bet={bet} />
      ))}
    </ol>
  );
};
