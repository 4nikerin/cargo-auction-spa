import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { useSetBetMutation } from './use-set-bet-mutation';

interface UsePlaceAuctionBetParams {
  auctionUuid: string;
}

export const usePlaceAuctionBet = ({
  auctionUuid,
}: UsePlaceAuctionBetParams) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync, reset } = useSetBetMutation(auctionUuid);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isPending) {
        return;
      }

      setOpen(isOpen);

      if (isOpen) {
        reset();
      }
    },
    [isPending, reset],
  );

  const submit = useCallback(
    async (price: number) => {
      await mutateAsync({
        auctionUuid,
        body: { price },
      });

      setOpen(false);

      toast.success('Ставка принята', {
        description: 'Данные аукциона и список ставок обновлены.',
      });
    },
    [auctionUuid, mutateAsync],
  );

  return {
    handleOpenChange,
    isPending,
    open,
    submit,
  };
};
