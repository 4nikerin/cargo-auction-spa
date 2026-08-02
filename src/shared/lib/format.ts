const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

const numberFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 1,
});

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

// Форматтеры не выбирают UI-текст для пустого значения: подходящий fallback задаёт экран.
export const formatDateTime = (value: string | null | undefined) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : dateTimeFormatter.format(date);
};

export const formatNumber = (value: number | null | undefined, suffix = '') => {
  return value == null ? null : `${numberFormatter.format(value)}${suffix}`;
};

export const formatPrice = (value: number | null | undefined) => {
  return value == null ? null : currencyFormatter.format(value);
};
