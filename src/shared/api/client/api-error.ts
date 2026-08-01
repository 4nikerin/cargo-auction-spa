import type { components } from '@/shared/api/generated/schema';

/** Форматы ошибок, предусмотренные OpenAPI-контрактом. */
export type ApiProblem =
  | components['schemas']['ProblemDetail']
  | components['schemas']['ValidationProblem'];

/** Единая ошибка API с HTTP-статусом и типизированным телом ответа. */
export class ApiError extends Error {
  readonly status: number;
  readonly problem: ApiProblem | undefined;

  constructor(status: number, problem?: ApiProblem) {
    super(problem?.message ?? `API request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.problem = problem;
  }
}
