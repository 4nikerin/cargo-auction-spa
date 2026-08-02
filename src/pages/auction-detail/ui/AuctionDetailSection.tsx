import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

interface AuctionDetailSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const AuctionDetailSection = ({
  title,
  icon,
  children,
}: AuctionDetailSectionProps) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-muted-foreground [&_svg]:size-5">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
