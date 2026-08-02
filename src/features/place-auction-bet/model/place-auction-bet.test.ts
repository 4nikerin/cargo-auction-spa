import { describe, expect, it } from 'vitest';

import { createPlaceAuctionBetSchema } from './place-auction-bet';

const schema = createPlaceAuctionBetSchema({
  current: 100,
  min: 50,
  max: 150,
  step: 10,
});

describe('createPlaceAuctionBetSchema', () => {
  it.each([0, 40, 160, 115])('отклоняет недопустимую цену %s', (price) => {
    expect(schema.safeParse({ price }).success).toBe(false);
  });

  it.each([50, 90, 110, 150])('принимает допустимую цену %s', (price) => {
    expect(schema.safeParse({ price }).success).toBe(true);
  });
});
