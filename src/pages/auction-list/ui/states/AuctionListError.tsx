import { AlertCircle, RefreshCw } from 'lucide-react';

import { ApiError } from '@/shared/api';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';

interface AuctionListErrorProps {
  error: Error | null;
  onRetry: () => void;
}

export const AuctionListError = ({ error, onRetry }: AuctionListErrorProps) => {
  const description =
    error instanceof ApiError
      ? error.message
      : 'Не удалось получить список. Проверьте соединение и повторите попытку.';

  return (
    <Alert variant="destructive">
      <AlertCircle aria-hidden="true" />
      <AlertTitle>Ошибка загрузки</AlertTitle>
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
