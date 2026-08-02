import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

import { ApiError } from '@/shared/api';

interface ApplyApiFormErrorsOptions<TFieldValues extends FieldValues> {
  error: unknown;
  fallbackMessage: string;
  fields: readonly FieldPath<TFieldValues>[];
  fieldMap?: Readonly<Record<string, FieldPath<TFieldValues>>>;
  setError: UseFormSetError<TFieldValues>;
}

export const applyApiFormErrors = <TFieldValues extends FieldValues>({
  error,
  fallbackMessage,
  fields,
  fieldMap = {},
  setError,
}: ApplyApiFormErrorsOptions<TFieldValues>) => {
  if (!(error instanceof ApiError)) {
    setError('root.server', { type: 'server', message: fallbackMessage });
    return;
  }

  const problem = error.problem;

  if (error.status !== 422 || !problem || !('errors' in problem)) {
    setError('root.server', { type: 'server', message: error.message });
    return;
  }

  const knownFields = new Set<string>(fields);
  let fieldErrorIndex = 0;
  let hasUnknownField = false;

  for (const validationError of problem.errors) {
    const field =
      fieldMap[validationError.field] ??
      (knownFields.has(validationError.field)
        ? (validationError.field as FieldPath<TFieldValues>)
        : undefined);

    if (!field) {
      hasUnknownField = true;
      continue;
    }

    setError(
      field,
      { type: 'server', message: validationError.message },
      { shouldFocus: fieldErrorIndex === 0 },
    );
    fieldErrorIndex += 1;
  }

  if (fieldErrorIndex === 0 || hasUnknownField) {
    setError('root.server', { type: 'server', message: problem.message });
  }
};
