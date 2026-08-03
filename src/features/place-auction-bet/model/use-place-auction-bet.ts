import { useCallback } from 'react';
import { toast } from 'sonner';

import { useSetBetMutation } from './use-set-bet-mutation';

interface UsePlaceAuctionBetParams {
  auctionUuid: string;
  onOpenChange: (open: boolean) => void;
}

export const usePlaceAuctionBet = ({
  auctionUuid,
  onOpenChange,
}: UsePlaceAuctionBetParams) => {
  const { isPending, mutateAsync, reset } = useSetBetMutation(auctionUuid);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isPending) {
        return;
      }

      onOpenChange(isOpen);

      if (isOpen) {
        reset();
      }
    },
    [isPending, onOpenChange, reset],
  );

  const submit = useCallback(
    async (price: number) => {
      await mutateAsync({
        auctionUuid,
        body: { price },
      });

      onOpenChange(false);

      toast.success('Ставка принята', {
        description: 'Данные аукциона и список ставок обновлены.',
      });
    },
    [auctionUuid, mutateAsync, onOpenChange],
  );

  return {
    handleOpenChange,
    isPending,
    submit,
  };
};
