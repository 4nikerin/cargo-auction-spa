import type { AuctionBet } from '@/entities/auction';

export type AuctionBetStatus = 'active' | 'counter' | 'rejected' | 'winner';

export const getAuctionBetStatus = (bet: AuctionBet): AuctionBetStatus => {
  if (bet.is_rejected) return 'rejected';
  if (bet.is_win) return 'winner';
  if (bet.is_counter) return 'counter';

  return 'active';
};

export const getAuctionBetPriceWithVat = (bet: AuctionBet) => {
  return bet.price_info?.price_with_vat ?? bet.price_with_vat;
};

export const getAuctionBetPriceNoVat = (bet: AuctionBet) => {
  return bet.price_info?.price_no_vat ?? bet.price_no_vat;
};

export const getAuctionParticipantsCount = (bets: AuctionBet[]) => {
  const participantIds = new Set<string>();

  for (const bet of bets) {
    if (bet.organization_inn) {
      participantIds.add(`organization-inn:${bet.organization_inn}`);
    } else if (bet.organization_id != null) {
      participantIds.add(`organization:${bet.organization_id}`);
    } else if (bet.subscriber_id != null) {
      participantIds.add(`subscriber:${bet.subscriber_id}`);
    } else if (bet.organization_name) {
      participantIds.add(
        `organization-name:${bet.organization_name.trim().toLocaleLowerCase('ru')}`,
      );
    }
  }

  return participantIds.size;
};
