import { createRouter } from '@tanstack/react-router';

import { queryClient } from './providers/query-client';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // Свежесть серверных данных определяет TanStack Query, а не отдельный кэш роутера.
  defaultPreloadStaleTime: 0,
  // Показываем skeleton сразу и не даём ему мигнуть при быстрых ответах.
  defaultPendingMs: 0,
  defaultPendingMinMs: 300,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    breadcrumb?: string | ((params: Record<string, string>) => string);
  }
}
