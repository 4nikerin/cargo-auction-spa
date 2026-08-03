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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const useAllFilters = ({
  value,
  onApply,
  open,
  onOpenChange,
}: UseAllFiltersParams) => {
  const [draft, setDraft] = useState(() => createAllFiltersDraft(value));

  const setField: SetAllFiltersDraftField = (key, fieldValue) => {
    setDraft((current) => ({ ...current, [key]: fieldValue }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setDraft(createAllFiltersDraft(value));
    onOpenChange(nextOpen);
  };

  const applyFilters = () => {
    onApply(toAuctionFiltersValue(draft, value));
    onOpenChange(false);
  };

  const resetFilters = () => {
    const emptyValue: AuctionFiltersValue = {};

    setDraft(createAllFiltersDraft(emptyValue));
    onApply(emptyValue);
    onOpenChange(false);
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
