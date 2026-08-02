import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { auctionKeys, setBetMutationOptions } from '@/entities/auction';
import { ApiError } from '@/shared/api';

export const useSetBetMutation = (auctionUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...setBetMutationOptions(),
    onError: (error) => {
      if (error instanceof ApiError && error.status === 422) {
        return;
      }

      toast.error('Не удалось сделать ставку', {
        description:
          error instanceof ApiError
            ? error.message
            : 'Повторите попытку позднее.',
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: auctionKeys.detail({ auctionUuid }),
        }),
        queryClient.invalidateQueries({ queryKey: auctionKeys.lists() }),
      ]);
    },
  });
};
