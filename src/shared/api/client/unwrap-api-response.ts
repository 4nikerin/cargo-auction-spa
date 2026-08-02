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

// Берём data только из успешной ветки: необязательное data ошибки не добавляет undefined.
type ApiResponseData<Result> =
  Result extends ApiSuccessResponse<infer Data> ? Data : never;

/**
 * Адаптирует результат openapi-fetch для TanStack Query:
 * возвращает данные успешного ответа или выбрасывает ApiError.
 */
export const unwrapApiResponse = <Result extends ApiResponse<unknown>>(
  result: Result,
): ApiResponseData<Result> => {
  if (result.error !== undefined) {
    throw new ApiError(result.response.status, result.error);
  }

  return result.data as ApiResponseData<Result>;
};
