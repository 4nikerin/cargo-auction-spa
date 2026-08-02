import { mockCityOptions } from '@/shared/api/mocks/cities';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { AllFiltersCheckbox } from './AllFiltersCheckbox';
import { AllFiltersField } from './AllFiltersField';
import type { AllFiltersSectionProps } from './types';

export const RouteFiltersSection = ({
  draft,
  setField,
}: AllFiltersSectionProps) => {
  const loadCityLabel =
    mockCityOptions.find((city) => city.value === draft.from)?.label ??
    'Любой город';
  const unloadCityLabel =
    mockCityOptions.find((city) => city.value === draft.to)?.label ??
    'Любой город';

  return (
    <section className="grid gap-4" aria-labelledby="route-filters-title">
      <h3 id="route-filters-title" className="text-lg font-semibold">
        Маршрут
      </h3>

      <AllFiltersField label="Город погрузки">
        <Select
          value={draft.from?.toString() ?? 'all'}
          onValueChange={(value) =>
            setField('from', value === 'all' ? undefined : Number(value))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue>{loadCityLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all" indicator="radio">
              Любой город
            </SelectItem>
            {mockCityOptions.map((city) => (
              <SelectItem
                key={city.value}
                value={city.value.toString()}
                indicator="radio"
              >
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AllFiltersField>

      <AllFiltersField label="Город выгрузки">
        <Select
          value={draft.to?.toString() ?? 'all'}
          onValueChange={(value) =>
            setField('to', value === 'all' ? undefined : Number(value))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue>{unloadCityLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all" indicator="radio">
              Любой город
            </SelectItem>
            {mockCityOptions.map((city) => (
              <SelectItem
                key={city.value}
                value={city.value.toString()}
                indicator="radio"
              >
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
