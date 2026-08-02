import { useRouter } from '@tanstack/react-router';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { ErrorRouteComponent } from '@tanstack/react-router';

import { ApiError } from '@/shared/api';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';

export const AuctionDetailRouteError: ErrorRouteComponent = ({
  error,
  reset,
}) => {
  const router = useRouter();
  const description =
    error instanceof ApiError
      ? error.message
      : 'Не удалось получить данные аукциона. Повторите попытку.';

  const retry = () => {
    reset();
    void router.invalidate();
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 sm:px-6 lg:px-8">
      <Alert variant="destructive">
        <AlertCircle aria-hidden="true" />
        <AlertTitle>Ошибка загрузки аукциона</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <AlertAction>
          <Button type="button" variant="outline" size="sm" onClick={retry}>
            <RefreshCw data-icon="inline-start" aria-hidden="true" />
            Повторить
          </Button>
        </AlertAction>
      </Alert>
    </main>
  );
};
