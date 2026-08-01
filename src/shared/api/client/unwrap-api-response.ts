import { ApiError } from './api-error';
import type { ApiProblem } from './api-error';

interface ApiSuccessResponse<Data> {
  data: Data;
  error?: never;
  response: Response;
}

interface ApiErrorResponse {
  data?: never;
  error: ApiProblem;
  response: Response;
}

type ApiResponse<Data> = ApiSuccessResponse<Data> | ApiErrorResponse;

/**
 * Адаптирует результат openapi-fetch для TanStack Query:
 * возвращает данные успешного ответа или выбрасывает ApiError.
 */
export function unwrapApiResponse<Data>(result: ApiResponse<Data>): Data {
  if (result.error !== undefined) {
    throw new ApiError(result.response.status, result.error);
  }

  return result.data;
}
