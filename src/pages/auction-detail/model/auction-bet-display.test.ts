import { describe, expect, it } from 'vitest';

import { getAuctionParticipantsCount } from './auction-bet-display';

describe('getAuctionParticipantsCount', () => {
  it('считает организацию один раз при нескольких ставках', () => {
    expect(
      getAuctionParticipantsCount([
        { organization_id: 10, subscriber_id: 100 },
        { organization_id: 10, subscriber_id: 101 },
        { organization_id: 20, subscriber_id: 200 },
      ]),
    ).toBe(2);
  });

  it('использует перевозчика, если организация не указана', () => {
    expect(
      getAuctionParticipantsCount([
        { subscriber_id: 100 },
        { subscriber_id: 100 },
        { subscriber_id: 200 },
      ]),
    ).toBe(2);
  });

  it('использует ИНН и название организации для DTO без ID', () => {
    expect(
      getAuctionParticipantsCount([
        { organization_inn: '7701001001', organization_name: 'ООО ТрансЛог' },
        { organization_inn: '7701001001', organization_name: 'ТрансЛог' },
        { organization_name: ' ООО СеверТранс ' },
        { organization_name: 'ооо северТранс' },
      ]),
    ).toBe(2);
  });

  it('не считает ставку без данных участника', () => {
    expect(getAuctionParticipantsCount([{}, { organization_id: 10 }])).toBe(1);
  });
});
