import { useState } from 'react';

import { getAuctionFiltersKey } from './auction-filters';
import type { AuctionFiltersValue } from './auction-filters';

interface UseAuctionFiltersParams {
  initialValue: AuctionFiltersValue;
  onChange: (value: AuctionFiltersValue) => void;
}

export interface AuctionFiltersDraft extends Omit<
  AuctionFiltersValue,
  'cargo' | 'status' | 'type'
> {
  cargo: string;
  status: NonNullable<AuctionFiltersValue['status']>;
  type: NonNullable<AuctionFiltersValue['type']>;
}

const createDraft = (value: AuctionFiltersValue): AuctionFiltersDraft => {
  return {
    ...value,
    cargo: value.cargo ?? '',
    status: value.status ?? [],
    type: value.type ?? [],
  };
};

const createValue = (draft: AuctionFiltersDraft): AuctionFiltersValue => {
  const { cargo: cargoDraft, status, type, ...rest } = draft;
  const value: AuctionFiltersValue = { ...rest };
  const cargo = cargoDraft.trim();

  if (cargo) value.cargo = cargo;
  if (status.length > 0) value.status = status;
  if (type.length > 0) value.type = type;

  return value;
};

export const useAuctionFilters = ({
  initialValue,
  onChange,
}: UseAuctionFiltersParams) => {
  // Локальный черновик показывает введённое значение до завершения обновления URL.
  const [filters, setFilters] = useState(() => createDraft(initialValue));
  const initialValueKey = getAuctionFiltersKey(initialValue);
  const [syncedInitialValueKey, setSyncedInitialValueKey] =
    useState(initialValueKey);
  const [submittedValueKey, setSubmittedValueKey] = useState<string | null>(
    null,
  );
  // Сравниваем содержимое, а не ссылки на объекты: роутер может вернуть новый объект
  // с прежними значениями во время ввода. Запоздавший ответ на собственное изменение
  // URL только подтверждаем: он не должен затирать текст, введённый после отправки.
  // Реальное внешнее изменение (например, Back/Forward) синхронизирует черновик.
  if (initialValueKey !== syncedInitialValueKey) {
    setSyncedInitialValueKey(initialValueKey);

    if (initialValueKey === submittedValueKey) {
      setSubmittedValueKey(null);
    } else {
      setSubmittedValueKey(null);
      setFilters(createDraft(initialValue));
    }
  }

  const applyDraft = (nextFilters: AuctionFiltersDraft) => {
    const nextValue = createValue(nextFilters);
    const nextValueKey = getAuctionFiltersKey(nextValue);

    setFilters(nextFilters);

    if (nextValueKey === getAuctionFiltersKey(initialValue)) {
      return;
    }

    setSubmittedValueKey(nextValueKey);
    onChange(nextValue);
  };

  const setFilter = <Key extends keyof AuctionFiltersDraft>(
    name: Key,
    value: AuctionFiltersDraft[Key],
  ) => {
    applyDraft({ ...filters, [name]: value });
  };

  const applyValue = (nextValue: AuctionFiltersValue) => {
    setFilters(createDraft(nextValue));
    setSubmittedValueKey(getAuctionFiltersKey(nextValue));
    onChange(nextValue);
  };

  return {
    filters,
    value: createValue(filters),
    applyValue,
    setFilter,
  };
};
