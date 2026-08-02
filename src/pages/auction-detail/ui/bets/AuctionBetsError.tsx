import { AlertCircle, RefreshCw } from 'lucide-react';

import { ApiError } from '@/shared/api';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';

interface AuctionBetsErrorProps {
  error: Error;
  onRetry: () => void;
}

export const AuctionBetsError = ({ error, onRetry }: AuctionBetsErrorProps) => {
  const description =
    error instanceof ApiError
      ? error.message
      : 'Не удалось получить список ставок. Повторите попытку.';

  return (
    <Alert variant="destructive">
      <AlertCircle aria-hidden="true" />
      <AlertTitle>Ошибка загрузки ставок</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <AlertAction>
        <Button type="button" variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw data-icon="inline-start" aria-hidden="true" />
          Повторить
        </Button>
      </AlertAction>
    </Alert>
  );
};
