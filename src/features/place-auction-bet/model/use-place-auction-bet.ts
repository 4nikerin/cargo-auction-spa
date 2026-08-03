import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { useSetBetMutation } from './use-set-bet-mutation';

interface UsePlaceAuctionBetParams {
  auctionUuid: string;
  openFromUrl: boolean;
  onUrlClose: () => void;
}

export const usePlaceAuctionBet = ({
  auctionUuid,
  openFromUrl,
  onUrlClose,
}: UsePlaceAuctionBetParams) => {
  const [locallyOpen, setLocallyOpen] = useState(false);
  const { isPending, mutateAsync, reset } = useSetBetMutation(auctionUuid);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isPending) {
        return;
      }

      setLocallyOpen(isOpen);

      if (!isOpen && openFromUrl) {
        onUrlClose();
      }

      if (isOpen) {
        reset();
      }
    },
    [isPending, onUrlClose, openFromUrl, reset],
  );

  const submit = useCallback(
    async (price: number) => {
      await mutateAsync({
        auctionUuid,
        body: { price },
      });

      setLocallyOpen(false);

      if (openFromUrl) {
        onUrlClose();
      }

      toast.success('Ставка принята', {
        description: 'Данные аукциона и список ставок обновлены.',
      });
    },
    [auctionUuid, mutateAsync, onUrlClose, openFromUrl],
  );

  return {
    handleOpenChange,
    isPending,
    open: locallyOpen || openFromUrl,
    submit,
  };
};
