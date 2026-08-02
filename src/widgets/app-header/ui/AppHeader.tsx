import { Link } from '@tanstack/react-router';
import { Truck } from 'lucide-react';

export const AppHeader = () => {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          to="/auctions"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Truck className="size-4" aria-hidden="true" />
          </span>
          <span>Cargo Auction</span>
        </Link>
      </div>
    </header>
  );
};
