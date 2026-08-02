import { describe, expect, it } from 'vitest';

import { getAuctionFiltersKey } from './auction-filters';

describe('ключ фильтров аукционов', () => {
  it('не зависит от порядка полей', () => {
    expect(getAuctionFiltersKey({ cargo: 'AU-10', from: 77 })).toBe(
      getAuctionFiltersKey({ from: 77, cargo: 'AU-10' }),
    );
  });

  it('нормализует значения по Zod-схеме', () => {
    expect(getAuctionFiltersKey({ cargo: '  AU-10  ', from: undefined })).toBe(
      getAuctionFiltersKey({ cargo: 'AU-10' }),
    );
  });
});
