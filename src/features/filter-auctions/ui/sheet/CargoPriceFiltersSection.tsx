import { AllFiltersRange } from './AllFiltersRange';
import type { AllFiltersSectionProps } from './types';

export const CargoPriceFiltersSection = ({
  draft,
  setField,
}: AllFiltersSectionProps) => {
  return (
    <section className="grid gap-4" aria-labelledby="cargo-filters-title">
      <h3 id="cargo-filters-title" className="text-lg font-semibold">
        Груз и цена
      </h3>

      <AllFiltersRange
        label="Вес, т"
        from={draft.weightFrom}
        to={draft.weightTo}
        onFromChange={(value) => setField('weightFrom', value)}
        onToChange={(value) => setField('weightTo', value)}
      />
      <AllFiltersRange
        label="Объём, м³"
        from={draft.volumeFrom}
        to={draft.volumeTo}
        onFromChange={(value) => setField('volumeFrom', value)}
        onToChange={(value) => setField('volumeTo', value)}
      />
      <AllFiltersRange
        label="Текущая цена, ₽"
        from={draft.priceFrom}
        to={draft.priceTo}
        onFromChange={(value) => setField('priceFrom', value)}
        onToChange={(value) => setField('priceTo', value)}
      />
      <AllFiltersRange
        label="Цена за километр, ₽"
        from={draft.pricePerKmFrom}
        to={draft.pricePerKmTo}
        onFromChange={(value) => setField('pricePerKmFrom', value)}
        onToChange={(value) => setField('pricePerKmTo', value)}
      />
    </section>
  );
};
