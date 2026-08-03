import { describe, expect, it } from 'vitest';

import { auctionBetsSearchSchema } from './auction-bets-search';

describe('auctionBetsSearchSchema', () => {
  it('разрешает показать отменённые ставки через URL', () => {
    expect(auctionBetsSearchSchema.parse({ all: true })).toEqual({
      all: true,
    });
  });

  it('безопасно отбрасывает некорректное значение', () => {
    expect(auctionBetsSearchSchema.parse({ all: 'unknown' })).toEqual({
      all: undefined,
    });
  });
});
