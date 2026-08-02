import type { AuctionDetail } from '../api/auction-api';

type AuctionStatus = AuctionDetail['trading']['status'];
type AuctionStatusCode = NonNullable<AuctionStatus>;

const auctionStatusLabels = {
  Planning: 'Планирование',
  Auction: 'Торги идут',
  DeterminateWinner: 'Определение победителя',
  WaitDeal: 'Ожидание сделки',
  InProgress: 'В работе',
  Finished: 'Завершён',
  Stopped: 'Остановлен',
  Canceled: 'Отменён',
  Unknown: 'Неизвестный статус',
} as const satisfies Record<AuctionStatusCode, string>;

export const getAuctionStatusLabel = (status: AuctionStatus) => {
  return status ? auctionStatusLabels[status] : 'Статус не указан';
};
