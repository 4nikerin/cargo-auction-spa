import type { ReactNode } from 'react';

interface AuctionDetailFieldProps {
  label: string;
  value: ReactNode;
}

export const AuctionDetailField = ({
  label,
  value,
}: AuctionDetailFieldProps) => {
  return (
    <div className="min-w-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium break-words">{value}</dd>
    </div>
  );
};
