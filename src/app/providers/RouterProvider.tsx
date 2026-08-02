import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router';

import { router } from '../router';

export const RouterProvider = () => {
  return <TanStackRouterProvider router={router} />;
};
