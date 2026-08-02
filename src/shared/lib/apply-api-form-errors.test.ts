import { describe, expect, it, vi } from 'vitest';
import type { UseFormSetError } from 'react-hook-form';

import { ApiError } from '@/shared/api';

import { applyApiFormErrors } from './apply-api-form-errors';

interface TestFormValues {
  price: number;
  comment: string;
}

const createSetError = () =>
  vi.fn() as unknown as UseFormSetError<TestFormValues>;

describe('applyApiFormErrors', () => {
  it('раскладывает ошибки 422 по известным полям', () => {
    const setError = createSetError();
    const error = new ApiError(422, {
      code: 'validation_failed',
      title: 'Ошибка валидации',
      message: 'Проверьте поля формы.',
      errors: [
        { field: 'price', message: 'Некорректная цена.' },
        { field: 'comment', message: 'Слишком длинный комментарий.' },
      ],
    });

    applyApiFormErrors({
      error,
      fallbackMessage: 'Не удалось сохранить.',
      fields: ['price', 'comment'],
      setError,
    });

    expect(setError).toHaveBeenNthCalledWith(
      1,
      'price',
      { type: 'server', message: 'Некорректная цена.' },
      { shouldFocus: true },
    );
    expect(setError).toHaveBeenNthCalledWith(
      2,
      'comment',
      { type: 'server', message: 'Слишком длинный комментарий.' },
      { shouldFocus: false },
    );
  });

  it('поддерживает разные имена полей API и формы', () => {
    const setError = createSetError();
    const error = new ApiError(422, {
      code: 'validation_failed',
      title: 'Ошибка валидации',
      message: 'Проверьте поля формы.',
      errors: [{ field: 'bid_price', message: 'Некорректная цена.' }],
    });

    applyApiFormErrors({
      error,
      fallbackMessage: 'Не удалось сохранить.',
      fields: ['price', 'comment'],
      fieldMap: { bid_price: 'price' },
      setError,
    });

    expect(setError).toHaveBeenCalledWith(
      'price',
      { type: 'server', message: 'Некорректная цена.' },
      { shouldFocus: true },
    );
  });

  it('показывает общую серверную ошибку для неизвестного поля', () => {
    const setError = createSetError();
    const error = new ApiError(422, {
      code: 'validation_failed',
      title: 'Ошибка валидации',
      message: 'Проверьте поля формы.',
      errors: [{ field: 'auction', message: 'Аукцион завершён.' }],
    });

    applyApiFormErrors({
      error,
      fallbackMessage: 'Не удалось сохранить.',
      fields: ['price', 'comment'],
      setError,
    });

    expect(setError).toHaveBeenCalledWith('root.server', {
      type: 'server',
      message: 'Проверьте поля формы.',
    });
  });

  it('использует fallback для неизвестной ошибки', () => {
    const setError = createSetError();

    applyApiFormErrors({
      error: new Error('Network error'),
      fallbackMessage: 'Не удалось сохранить.',
      fields: ['price', 'comment'],
      setError,
    });

    expect(setError).toHaveBeenCalledWith('root.server', {
      type: 'server',
      message: 'Не удалось сохранить.',
    });
  });
});
