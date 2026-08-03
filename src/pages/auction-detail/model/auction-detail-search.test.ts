import { describe, expect, it } from 'vitest';

import { auctionDetailSearchSchema } from './auction-detail-search';

describe('auctionDetailSearchSchema', () => {
  it('разрешает открыть форму ставки через URL', () => {
    expect(auctionDetailSearchSchema.parse({ action: 'place-bet' })).toEqual({
      action: 'place-bet',
    });
  });

  it('безопасно отбрасывает неизвестное действие', () => {
    expect(auctionDetailSearchSchema.parse({ action: 'unknown' })).toEqual({
      action: undefined,
    });
  });
});
