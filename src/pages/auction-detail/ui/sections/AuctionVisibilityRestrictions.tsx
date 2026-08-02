import type { AuctionDetailVisibility } from '../../model/auction-detail-visibility';

interface AuctionVisibilityRestrictionsProps {
  visibility: AuctionDetailVisibility;
}

export const AuctionVisibilityRestrictions = ({
  visibility,
}: AuctionVisibilityRestrictionsProps) => {
  const {
    arePointDetailsHidden,
    isBetsHistoryHidden,
    isCargoPriceHidden,
    isRouteHidden,
  } = visibility;
  const hasRestrictions =
    isBetsHistoryHidden ||
    isRouteHidden ||
    arePointDetailsHidden ||
    isCargoPriceHidden;

  if (!hasRestrictions) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border border-dashed p-4">
      <p className="text-sm font-medium">Ограничения просмотра</p>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {isBetsHistoryHidden ? <li>История ставок скрыта.</li> : null}
        {isRouteHidden ? <li>Маршрут скрыт.</li> : null}
        {arePointDetailsHidden ? (
          <li>Адреса точек и контакты скрыты.</li>
        ) : null}
        {isCargoPriceHidden ? <li>Стоимость груза скрыта.</li> : null}
      </ul>
    </div>
  );
};
