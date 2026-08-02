import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useDebounceCallback, useEventCallback } from 'usehooks-ts';

import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

import { filterChipStyles } from './filter-chip-styles';

interface TextFilterChipProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const TEXT_INPUT_DEBOUNCE_MS = 500;

export const TextFilterChip = ({
  label,
  value,
  placeholder,
  onChange,
}: TextFilterChipProps) => {
  const isActive = value.length > 0;
  const [inputValue, setInputValue] = useState(value);
  const [syncedValue, setSyncedValue] = useState(value);
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);
  // useDebounceCallback пересоздаёт таймер при смене callback, поэтому callback
  // должен быть стабильным между локальными рендерами на каждый введённый символ.
  const handleSubmit = useEventCallback((nextValue: string) => {
    setSubmittedValue(nextValue);
    onChange(nextValue);
  });
  const submitValue = useDebounceCallback(handleSubmit, TEXT_INPUT_DEBOUNCE_MS);

  // Собственное запоздавшее обновление URL не должно перезаписывать более свежий
  // локальный ввод. Внешнее изменение, например Back/Forward, синхронизирует поле.
  if (value !== syncedValue) {
    setSyncedValue(value);

    if (value === submittedValue) {
      setSubmittedValue(null);
    } else {
      submitValue.cancel();
      setSubmittedValue(null);
      setInputValue(value);
    }
  }

  const handleInputChange = (nextValue: string) => {
    setInputValue(nextValue);
    submitValue(nextValue);
  };

  const clearFilter = () => {
    submitValue.cancel();
    setInputValue('');
    setSubmittedValue('');
    onChange('');
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
        >
          {!isActive ? <Plus className="size-4" aria-hidden="true" /> : null}
          {isActive ? value : label}
        </PopoverTrigger>

        {isActive ? (
          <button
            className="ml-2 rounded-full p-1 outline-none hover:bg-primary-foreground/15 focus-visible:ring-2 focus-visible:ring-primary-foreground/70"
            type="button"
            aria-label={`Сбросить фильтр «${label}»`}
            onClick={clearFilter}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <PopoverContent>
        <Input
          value={inputValue}
          placeholder={placeholder}
          aria-label={label}
          onChange={(event) => handleInputChange(event.target.value)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Фильтр применяется автоматически
        </p>
      </PopoverContent>
    </Popover>
  );
};
