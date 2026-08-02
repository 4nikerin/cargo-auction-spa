import { describe, expect, it } from 'vitest';

import { createAllFiltersDraft, toAuctionFiltersValue } from './all-filters';

describe('черновик всех фильтров', () => {
  it('не добавляет пустые значения в фильтры', () => {
    const draft = createAllFiltersDraft({ customer: 'Фрост' });

    expect(toAuctionFiltersValue(draft)).toEqual({
      customer: 'Фрост',
    });
  });

  it('преобразует списки из строки в массивы', () => {
    const draft = createAllFiltersDraft({
      status: ['Leading', 'Losing'],
      type: ['Down', 'Request'],
    });
    draft.auctionStatuses = [1, 2];
    draft.bodyTypes = 'тентованный, фургон';

    expect(toAuctionFiltersValue(draft)).toMatchObject({
      auctionStatuses: [1, 2],
      bodyTypes: ['тентованный', 'фургон'],
      status: ['Leading', 'Losing'],
      type: ['Down', 'Request'],
    });
  });

  it('сохраняет валидные фильтры, для которых в сайдбаре нет полей', () => {
    const value = {
      cargo: 'AU-10482',
      mobileStatuses: [2],
      formType: 'НДС',
      loadCityId: 77,
      loadRadius: 100,
      unloadCityId: 16,
      unloadRadius: 50,
      customerIds: [340],
      auctionIds: [101],
      replaceExternalPads: true,
    };
    const draft = createAllFiltersDraft(value);

    draft.cargo = 'AU-10483';

    expect(toAuctionFiltersValue(draft, value)).toMatchObject({
      ...value,
      cargo: 'AU-10483',
    });
  });
});
