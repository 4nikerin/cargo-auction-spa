import type { ReactNode } from 'react';

interface AuctionCardInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export const AuctionCardInfoItem = ({
  icon,
  label,
  value,
}: AuctionCardInfoItemProps) => {
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 text-muted-foreground [&_svg]:size-4">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 truncate font-medium">{value}</p>
      </div>
    </div>
  );
};
