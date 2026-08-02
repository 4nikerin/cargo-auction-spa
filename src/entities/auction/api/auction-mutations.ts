import { mutationOptions } from '@tanstack/react-query';

import { setBet } from './auction-api';
import type { SetBetParams } from './auction-api';

/** Настройки mutation для размещения ставки в аукционе. */
export const setBetMutationOptions = () => {
  return mutationOptions({
    mutationFn: (params: SetBetParams) => setBet(params),
  });
};
