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
