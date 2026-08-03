import { z } from 'zod';

export const auctionDetailSearchSchema = z.object({
  action: z.enum(['place-bet']).optional().catch(undefined),
});
