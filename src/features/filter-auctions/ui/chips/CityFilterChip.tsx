import { Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

import { mockCityOptions } from '@/shared/api/mocks/cities';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { filterChipStyles } from './filter-chip-styles';

interface CityFilterChipProps {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
}

export const CityFilterChip = ({
  label,
  value,
  onChange,
}: CityFilterChipProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectedCity = mockCityOptions.find((city) => city.value === value);
  const isActive = selectedCity != null;
  const normalizedSearch = search.trim().toLocaleLowerCase('ru');
  const filteredCities = normalizedSearch
    ? mockCityOptions.filter((city) =>
        city.label.toLocaleLowerCase('ru').includes(normalizedSearch),
      )
    : mockCityOptions;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) {
      setSearch('');
    }
  };

  const selectCity = (cityId: number) => {
    onChange(cityId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <div
        className={cn(
          filterChipStyles({ active: isActive }),
          isActive && 'gap-0 py-0 pr-2 pl-0',
        )}
      >
        <PopoverTrigger
          className={cn(
            'flex h-full items-center gap-2 rounded-full outline-none',
            isActive ? 'pl-4' : '-mx-4 px-4',
          )}
          aria-label={label}
        >
          {!isActive ? <Plus className="size-4" aria-hidden="true" /> : null}
          {selectedCity?.label ?? label}
        </PopoverTrigger>

        {isActive ? (
          <button
            className="ml-2 rounded-full p-1 outline-none hover:bg-primary-foreground/15 focus-visible:ring-2 focus-visible:ring-primary-foreground/70"
            type="button"
            aria-label={`Сбросить фильтр «${label}»`}
            onClick={() => onChange(undefined)}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <PopoverContent className="w-72 p-2">
        <div className="relative mb-2">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            className="pl-8"
            value={search}
            placeholder="Найти город"
            aria-label="Поиск города"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <ScrollArea
          className="h-72"
          contentClassName="grid gap-1 pr-2"
          role="radiogroup"
          aria-label={label}
        >
          {filteredCities.map((city) => {
            const isSelected = city.value === value;

            return (
              <button
                key={city.value}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
                  isSelected && 'bg-muted',
                )}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => selectCity(city.value)}
              >
                <span
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-full border border-muted-foreground/40',
                    isSelected && 'border-primary',
                  )}
                  aria-hidden="true"
                >
                  {isSelected ? (
                    <span className="block size-2 rounded-full bg-primary" />
                  ) : null}
                </span>
                {city.label}
              </button>
            );
          })}
          {filteredCities.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Города не найдены
            </p>
          ) : null}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
