import type {
  AllFiltersDraft,
  SetAllFiltersDraftField,
} from '../../model/all-filters';

export interface AllFiltersSectionProps {
  draft: AllFiltersDraft;
  setField: SetAllFiltersDraftField;
}
