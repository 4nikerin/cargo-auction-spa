import { useState } from 'react';

import {
  createAllFiltersDraft,
  getActiveFiltersCount,
  toAuctionFiltersValue,
} from './all-filters';
import type { SetAllFiltersDraftField } from './all-filters';
import type { AuctionFiltersValue } from './auction-filters';

interface UseAllFiltersParams {
  value: AuctionFiltersValue;
  onApply: (value: AuctionFiltersValue) => void;
}

export const useAllFilters = ({ value, onApply }: UseAllFiltersParams) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => createAllFiltersDraft(value));

  const setField: SetAllFiltersDraftField = (key, fieldValue) => {
    setDraft((current) => ({ ...current, [key]: fieldValue }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setDraft(createAllFiltersDraft(value));
    setOpen(nextOpen);
  };

  const applyFilters = () => {
    onApply(toAuctionFiltersValue(draft, value));
    setOpen(false);
  };

  const resetFilters = () => {
    const emptyValue: AuctionFiltersValue = {};

    setDraft(createAllFiltersDraft(emptyValue));
    onApply(emptyValue);
    setOpen(false);
  };

  return {
    activeFiltersCount: getActiveFiltersCount(value),
    applyFilters,
    draft,
    handleOpenChange,
    open,
    resetFilters,
    setField,
  };
};
