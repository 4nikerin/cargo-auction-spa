import { Outlet, createFileRoute } from '@tanstack/react-router';

const AuctionsLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/auctions')({
  staticData: {
    breadcrumb: 'Аукционы',
  },
  component: AuctionsLayout,
});
