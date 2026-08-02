import { describe, expect, it } from 'vitest';

import { hasAuctionOwnBet } from './auction-own-bet';

describe('hasAuctionOwnBet', () => {
  it('использует явный флаг своей ставки', () => {
    expect(hasAuctionOwnBet({ your: { bet: true }, is_bidder: false })).toBe(
      true,
    );
    expect(hasAuctionOwnBet({ your: { bet: false }, is_bidder: true })).toBe(
      false,
    );
  });

  it('использует is_bidder, если your.bet отсутствует', () => {
    expect(hasAuctionOwnBet({ is_bidder: true })).toBe(true);
    expect(hasAuctionOwnBet({ is_bidder: false })).toBe(false);
  });
});
