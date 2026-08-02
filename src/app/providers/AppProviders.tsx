import { QueryProvider } from './QueryProvider';
import { RouterProvider } from './RouterProvider';

export const AppProviders = () => {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
};
