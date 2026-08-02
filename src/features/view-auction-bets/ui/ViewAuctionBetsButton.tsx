import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Eye, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  auctionDetailQueryOptions,
  getAuctionDetailVisibility,
} from '@/entities/auction';
import { ApiError } from '@/shared/api';
import { Button } from '@/shared/ui/button';

interface ViewAuctionBetsButtonProps {
  auctionUuid: string;
}

export const ViewAuctionBetsButton = ({
  auctionUuid,
}: ViewAuctionBetsButtonProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryHidden, setIsHistoryHidden] = useState(false);

  const openBets = async () => {
    setIsLoading(true);

    try {
      const detail = await queryClient.fetchQuery(
        auctionDetailQueryOptions({ auctionUuid }),
      );

      if (getAuctionDetailVisibility(detail).isBetsHistoryHidden) {
        setIsHistoryHidden(true);
        return;
      }

      await navigate({
        to: '/auctions/$auctionUuid/bets',
        params: { auctionUuid },
      });
    } catch (error) {
      toast.error('Не удалось проверить доступность ставок', {
        description:
          error instanceof ApiError
            ? error.message
            : 'Повторите попытку позднее.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={isLoading || isHistoryHidden}
      onClick={() => void openBets()}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" aria-hidden="true" />
      ) : (
        <Eye aria-hidden="true" />
      )}
      {isLoading
        ? 'Проверяем…'
        : isHistoryHidden
          ? 'История ставок скрыта'
          : 'Смотреть ставки'}
    </Button>
  );
};
