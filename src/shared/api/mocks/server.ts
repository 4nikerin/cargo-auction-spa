import { setupServer } from 'msw/node';

import { handlers } from './handlers';

/** Перехватывает запросы внутри Node.js во время тестов. */
export const mockServer = setupServer(...handlers);
