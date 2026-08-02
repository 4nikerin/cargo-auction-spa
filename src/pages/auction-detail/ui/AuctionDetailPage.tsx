interface AuctionDetailPageProps {
  auctionNumber: string;
}

export const AuctionDetailPage = ({
  auctionNumber,
}: AuctionDetailPageProps) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pt-4 lg:pb-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Аукцион №{auctionNumber}
      </h1>
    </main>
  );
};
