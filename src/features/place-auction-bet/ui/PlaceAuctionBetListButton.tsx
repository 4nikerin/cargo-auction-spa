import { useQueryClient } from '@tanstack/react-query';
import { Gavel, LoaderCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { auctionDetailQueryOptions } from '@/entities/auction';
import { ApiError } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import type { AuctionDetail } from '@/entities/auction';

import { usePlaceAuctionBet } from '../model/use-place-auction-bet';
import { PlaceAuctionBetSheet } from './PlaceAuctionBetSheet';

interface PlaceAuctionBetListButtonProps {
  auctionUuid: string;
  label: 'Изменить ставку' | 'Сделать ставку';
}

export const PlaceAuctionBetListButton = ({
  auctionUuid,
  label,
}: PlaceAuctionBetListButtonProps) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [trading, setTrading] = useState<AuctionDetail['trading'] | null>(null);
  const { handleOpenChange, isPending, open, submit } = usePlaceAuctionBet({
    auctionUuid,
  });

  const openForm = async () => {
    setIsLoadingDetail(true);

    try {
      const detail = await queryClient.fetchQuery(
        auctionDetailQueryOptions({ auctionUuid }),
      );

      setTrading(detail.trading);
      handleOpenChange(true);
    } catch (error) {
      toast.error('Не удалось загрузить форму ставки', {
        description:
          error instanceof ApiError
            ? error.message
            : 'Повторите попытку позднее.',
      });
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const trigger = (
    <Button
      size="sm"
      disabled={isLoadingDetail}
      onClick={() => void openForm()}
    >
      {isLoadingDetail ? (
        <LoaderCircle className="animate-spin" aria-hidden="true" />
      ) : (
        <Gavel aria-hidden="true" />
      )}
      {isLoadingDetail ? 'Загрузка…' : label}
    </Button>
  );

  return trading ? (
    <PlaceAuctionBetSheet
      inputRef={inputRef}
      isPending={isPending}
      open={open}
      trading={trading}
      onOpenChange={handleOpenChange}
      onSubmit={submit}
    >
      {trigger}
    </PlaceAuctionBetSheet>
  ) : (
    trigger
  );
};
