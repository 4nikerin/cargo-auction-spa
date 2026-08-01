import createClient from 'openapi-fetch';

import type { paths } from '@/shared/api/generated/schema';

export const apiBaseUrl = import.meta.env.VITE_API_URL;

/**
 * Типизированный OpenAPI-клиент. Использует актуальный globalThis.fetch,
 * чтобы MSW мог перехватывать запросы в браузере и тестах.
 */
export const apiClient = createClient<paths>({
  baseUrl: apiBaseUrl,
  fetch: (...args) => globalThis.fetch(...args),
});
