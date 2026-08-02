import type { AuctionListItem } from '../api/auction-api';

export const hasAuctionOwnBet = (
  trading: AuctionListItem['trading'],
): boolean => trading?.your?.bet ?? trading?.is_bidder ?? false;
