import { z } from 'zod';

export const placeAuctionBetSchema = z.object({
  price: z
    .number({ error: 'Введите положительное число.' })
    .positive('Введите положительное число.'),
});

export type PlaceAuctionBetFormValues = z.infer<typeof placeAuctionBetSchema>;

interface BetPriceLimits {
  current?: number | null;
  max?: number | null;
  min?: number | null;
  step?: number | null;
}

export const createPlaceAuctionBetSchema = (limits?: BetPriceLimits | null) =>
  placeAuctionBetSchema.superRefine(({ price }, context) => {
    if (limits?.min != null && price < limits.min) {
      context.addIssue({
        code: 'custom',
        path: ['price'],
        message: `Цена должна быть не меньше ${limits.min}.`,
      });
    }

    if (limits?.max != null && price > limits.max) {
      context.addIssue({
        code: 'custom',
        path: ['price'],
        message: `Цена должна быть не больше ${limits.max}.`,
      });
    }

    if (limits?.step && limits.current != null) {
      const stepCount = Math.abs(price - limits.current) / limits.step;
      const followsStep = Math.abs(stepCount - Math.round(stepCount)) < 1e-9;

      if (!followsStep) {
        context.addIssue({
          code: 'custom',
          path: ['price'],
          message: `Цена должна учитывать шаг ${limits.step}.`,
        });
      }
    }
  });
