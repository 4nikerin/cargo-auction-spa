import { cva } from 'class-variance-authority';

export const filterChipStyles = cva(
  'inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
  {
    variants: {
      active: {
        true: 'bg-primary text-primary-foreground hover:bg-primary/85',
        false: 'bg-muted text-foreground hover:bg-muted/70',
      },
    },
  },
);
