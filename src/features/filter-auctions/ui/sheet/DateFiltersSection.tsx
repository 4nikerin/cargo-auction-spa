import { AllFiltersRange } from './AllFiltersRange';
import type { AllFiltersSectionProps } from './types';

export const DateFiltersSection = ({
  draft,
  setField,
}: AllFiltersSectionProps) => {
  return (
    <section className="grid gap-4" aria-labelledby="date-filters-title">
      <h3 id="date-filters-title" className="text-lg font-semibold">
        Даты
      </h3>

      <AllFiltersRange
        label="Погрузка"
        type="datetime-local"
        from={draft.loadDateFrom}
        to={draft.loadDateTo}
        onFromChange={(value) => setField('loadDateFrom', value)}
        onToChange={(value) => setField('loadDateTo', value)}
      />
      <AllFiltersRange
        label="Выгрузка"
        type="datetime-local"
        from={draft.unloadDateFrom}
        to={draft.unloadDateTo}
        onFromChange={(value) => setField('unloadDateFrom', value)}
        onToChange={(value) => setField('unloadDateTo', value)}
      />
      <AllFiltersRange
        label="Создание аукциона"
        type="datetime-local"
        from={draft.createdFrom}
        to={draft.createdTo}
        onFromChange={(value) => setField('createdFrom', value)}
        onToChange={(value) => setField('createdTo', value)}
      />
      <AllFiltersRange
        label="Начало торгов"
        type="datetime-local"
        from={draft.biddingStartsFrom}
        to={draft.biddingStartsTo}
        onFromChange={(value) => setField('biddingStartsFrom', value)}
        onToChange={(value) => setField('biddingStartsTo', value)}
      />
      <AllFiltersRange
        label="Окончание торгов"
        type="datetime-local"
        from={draft.biddingEndsFrom}
        to={draft.biddingEndsTo}
        onFromChange={(value) => setField('biddingEndsFrom', value)}
        onToChange={(value) => setField('biddingEndsTo', value)}
      />
    </section>
  );
};
