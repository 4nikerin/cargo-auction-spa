import { Input } from '@/shared/ui/input';

import { AllFiltersCheckbox } from './AllFiltersCheckbox';
import { AllFiltersField } from './AllFiltersField';
import type { AllFiltersSectionProps } from './types';

export const RouteFiltersSection = ({
  draft,
  setField,
}: AllFiltersSectionProps) => {
  return (
    <section className="grid gap-4" aria-labelledby="route-filters-title">
      <h3 id="route-filters-title" className="text-lg font-semibold">
        Маршрут
      </h3>

      <AllFiltersField label="Город погрузки">
        <Input
          value={draft.from}
          placeholder="Москва"
          onChange={(event) => setField('from', event.target.value)}
        />
      </AllFiltersField>

      <AllFiltersField label="Город выгрузки">
        <Input
          value={draft.to}
          placeholder="Казань"
          onChange={(event) => setField('to', event.target.value)}
        />
      </AllFiltersField>

      <AllFiltersField label="Типы кузова">
        <Input
          value={draft.bodyTypes}
          placeholder="тентованный, фургон"
          onChange={(event) => setField('bodyTypes', event.target.value)}
        />
      </AllFiltersField>
      <AllFiltersCheckbox
        label="Только международные перевозки"
        checked={draft.international}
        onChange={(checked) => setField('international', checked)}
      />
    </section>
  );
};
