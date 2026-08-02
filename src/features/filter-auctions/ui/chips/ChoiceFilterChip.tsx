import { Plus, X } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

import { filterChipStyles } from './filter-chip-styles';

interface ChoiceFilterChipProps<Value extends string> {
  label: string;
  value: Value[];
  options: ReadonlyArray<{ value: Value; label: string }>;
  onChange: (value: Value[]) => void;
}

export const ChoiceFilterChip = <Value extends string>({
  label,
  value,
  options,
  onChange,
}: ChoiceFilterChipProps<Value>) => {
  const isActive = value.length > 0;
  const selectedLabel =
    value.length === 1
      ? options.find((option) => option.value === value[0])?.label
      : `${label}: ${value.length}`;

  const toggle = (optionValue: Value, checked: boolean) => {
    const selectedValues = new Set(value);

    if (checked) selectedValues.add(optionValue);
    else selectedValues.delete(optionValue);

    const nextValue = options
      .filter((option) => selectedValues.has(option.value))
      .map((option) => option.value);

    onChange(nextValue);
  };

  return (
    <Popover>
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
          {isActive ? selectedLabel : label}
        </PopoverTrigger>

        {isActive ? (
          <button
            className="ml-2 rounded-full p-1 outline-none hover:bg-primary-foreground/15 focus-visible:ring-2 focus-visible:ring-primary-foreground/70"
            type="button"
            aria-label={`Сбросить фильтр «${label}»`}
            onClick={() => onChange([])}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <PopoverContent className="w-72 p-2">
        <fieldset>
          <legend className="sr-only">{label}</legend>
          <div className="grid gap-1">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted"
              >
                <input
                  className="size-4 accent-primary"
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={(event) =>
                    toggle(option.value, event.target.checked)
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </PopoverContent>
    </Popover>
  );
};
