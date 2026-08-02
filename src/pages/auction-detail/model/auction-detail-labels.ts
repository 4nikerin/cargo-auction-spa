import { formatPrice } from '@/shared/lib/format';
import type { AuctionDetail } from '@/entities/auction';

type BidMeasurementType = AuctionDetail['trading']['bid_measurement_type'];
type OperationType = AuctionDetail['routes'][number]['op_type'];
type PaymentDelayType = AuctionDetail['payment']['delay_type'];

export const getBidMeasurementLabel = (value: BidMeasurementType) => {
  switch (value) {
    case 'PerRoute':
      return 'За рейс';
    case 'PerKm':
      return 'За километр';
    default:
      return 'Не указана';
  }
};

export const getOperationTypeLabel = (value: OperationType) => {
  switch (value) {
    case 'Loading':
      return 'Погрузка';
    case 'Unloading':
      return 'Выгрузка';
    default:
      return 'Точка маршрута';
  }
};

export const getPaymentDelayTypeLabel = (value: PaymentDelayType) => {
  switch (value) {
    case 'CalendarDays':
      return 'календарных дней';
    case 'WorkDays':
      return 'рабочих дней';
    default:
      return 'дней';
  }
};

export const formatBoolean = (
  value: boolean | null | undefined,
  trueLabel = 'Да',
  falseLabel = 'Нет',
) => {
  if (value == null) {
    return 'Не указано';
  }

  return value ? trueLabel : falseLabel;
};

export const formatAuctionPrice = (value: number | null | undefined) => {
  return formatPrice(value) ?? 'Не указана';
};
