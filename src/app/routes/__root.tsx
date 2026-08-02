import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import { NotFoundPage } from '@/pages/not-found';
import { ScrollToTopButton } from '@/shared/ui/scroll-to-top-button';
import { AppBreadcrumbs } from '@/widgets/app-breadcrumbs';
import { AppHeader } from '@/widgets/app-header';

interface RouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => {
  return (
    <div className="min-h-svh bg-muted/35">
      <AppHeader />
      <AppBreadcrumbs />
      <Outlet />
      <ScrollToTopButton />
    </div>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
