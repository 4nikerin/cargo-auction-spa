import { Controller } from 'react-hook-form';
import type { RefObject } from 'react';
import type { Control } from 'react-hook-form';

import { formatPrice } from '@/shared/lib/format';
import { Input } from '@/shared/ui/input';

import type { PlaceAuctionBetFormValues } from '../model/place-auction-bet';

interface PlaceAuctionBetPriceFieldProps {
  control: Control<PlaceAuctionBetFormValues>;
  disabled: boolean;
  errorMessage?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  step?: number | null;
}

export const PlaceAuctionBetPriceField = ({
  control,
  disabled,
  errorMessage,
  inputRef,
  step,
}: PlaceAuctionBetPriceFieldProps) => {
  return (
    <Controller
      name="price"
      control={control}
      render={({ field }) => (
        <div className="mt-6">
          <label htmlFor="auction-bet-price" className="text-sm font-medium">
            Цена ставки
          </label>
          <Input
            id="auction-bet-price"
            ref={(input) => {
              inputRef.current = input;
              field.ref(input);
            }}
            type="number"
            name={field.name}
            className="mt-2 h-11 text-base md:text-base"
            value={Number.isNaN(field.value) ? '' : field.value}
            step="any"
            autoComplete="off"
            disabled={disabled}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={
              errorMessage ? 'auction-bet-price-error' : undefined
            }
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(event.target.valueAsNumber)}
            onFocus={(event) => {
              const value = event.currentTarget.value;

              event.currentTarget.value = '';
              event.currentTarget.value = value;
            }}
          />
          {errorMessage ? (
            <p
              id="auction-bet-price-error"
              className="mt-2 text-sm text-destructive"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Шаг ставки: {formatPrice(step) ?? 'не указан'}
            </p>
          )}
        </div>
      )}
    />
  );
};
