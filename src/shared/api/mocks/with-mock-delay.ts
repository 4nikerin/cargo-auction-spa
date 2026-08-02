import { delay } from 'msw';
import type { DefaultBodyType, HttpResponseResolver, PathParams } from 'msw';

const configuredDelayMs = Number(import.meta.env.VITE_MSW_DELAY_MS ?? 0);

const mockDelayMs =
  Number.isFinite(configuredDelayMs) && configuredDelayMs > 0
    ? configuredDelayMs
    : 0;

/** Добавляет настраиваемую задержку перед выполнением любого MSW resolver. */
export const withMockDelay = <
  Params extends PathParams<keyof Params> = PathParams,
  RequestBody extends DefaultBodyType = DefaultBodyType,
  ResponseBody extends DefaultBodyType = DefaultBodyType,
>(
  resolver: HttpResponseResolver<Params, RequestBody, ResponseBody>,
): HttpResponseResolver<Params, RequestBody, ResponseBody> => {
  return async (resolverInfo) => {
    if (mockDelayMs > 0) {
      await delay(mockDelayMs);
    }

    return resolver(resolverInfo);
  };
};
