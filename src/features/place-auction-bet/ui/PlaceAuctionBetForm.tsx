import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Gavel, LoaderCircle } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { RefObject, SyntheticEvent } from 'react';

import { applyApiFormErrors } from '@/shared/lib/apply-api-form-errors';
import { formatPrice } from '@/shared/lib/format';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import type { AuctionDetail } from '@/entities/auction';

import {
  createPlaceAuctionBetSchema,
  placeAuctionBetSchema,
} from '../model/place-auction-bet';
import { PlaceAuctionBetPriceField } from './PlaceAuctionBetPriceField';
import type { PlaceAuctionBetFormValues } from '../model/place-auction-bet';

const formFields = placeAuctionBetSchema.keyof().options;

interface PlaceAuctionBetFormProps {
  inputRef: RefObject<HTMLInputElement | null>;
  initialPrice?: number | null;
  isPending: boolean;
  price: AuctionDetail['trading']['price'];
  onCancel: () => void;
  onSubmit: (price: number) => Promise<void>;
}

export const PlaceAuctionBetForm = ({
  inputRef,
  initialPrice,
  isPending,
  price,
  onCancel,
  onSubmit,
}: PlaceAuctionBetFormProps) => {
  const formSchema = useMemo(() => createPlaceAuctionBetSchema(price), [price]);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<PlaceAuctionBetFormValues>({
    defaultValues: initialPrice == null ? undefined : { price: initialPrice },
    resolver: zodResolver(formSchema),
  });

  const errorMessage = errors.price?.message;
  const rootErrorMessage = errors.root?.server?.message;
  const submitting = isPending || isSubmitting;

  const handleFormSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    void handleSubmit(async ({ price: parsedPrice }) => {
      try {
        await onSubmit(parsedPrice);
      } catch (error) {
        applyApiFormErrors({
          error,
          fallbackMessage: 'Не удалось сделать ставку. Повторите попытку.',
          fields: formFields,
          setError,
        });
      }
    })(event);
  };

  return (
    <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleFormSubmit}>
      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        <p className="text-sm text-muted-foreground">
          Укажите новую цену. Сервер проверит направление торгов, допустимый
          диапазон и шаг ставки.
        </p>

        {rootErrorMessage ? (
          <Alert className="mt-5" variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Не удалось сделать ставку</AlertTitle>
            <AlertDescription>{rootErrorMessage}</AlertDescription>
          </Alert>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-muted/45 p-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Текущая цена</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {formatPrice(price?.current) ?? 'Не указана'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Доступная цена</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {formatPrice(price?.available) ?? 'Не указана'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Минимум</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {formatPrice(price?.min) ?? 'Не указан'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Максимум</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {formatPrice(price?.max) ?? 'Не указан'}
            </dd>
          </div>
        </dl>

        <PlaceAuctionBetPriceField
          control={control}
          disabled={submitting}
          errorMessage={errorMessage}
          inputRef={inputRef}
          step={price?.step}
        />
      </div>

      <footer className="grid shrink-0 grid-cols-2 gap-3 border-t bg-background p-4 sm:px-6">
        <Button
          type="button"
          variant="outline"
          disabled={submitting}
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <LoaderCircle
              className="animate-spin"
              data-icon="inline-start"
              aria-hidden="true"
            />
          ) : (
            <Gavel data-icon="inline-start" aria-hidden="true" />
          )}
          {submitting ? 'Отправляем…' : 'Сделать ставку'}
        </Button>
      </footer>
    </form>
  );
};
