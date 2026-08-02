import { z } from 'zod';

/** Сохраняем показ отменённых ставок в URL, не передавая false явно. */
export const auctionBetsSearchSchema = z.object({
  all: z.boolean().optional().catch(undefined),
});
