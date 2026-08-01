import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

/** Перехватывает запросы приложения через Service Worker в браузере. */
export const worker = setupWorker(...handlers);
