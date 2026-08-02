import type { AuctionDetail } from '../api/auction-api';

type TradingVisibility = Pick<
  AuctionDetail['trading'],
  | 'hide_bets_history'
  | 'hide_places'
  | 'hide_points_address_and_contacts'
  | 'no_view_cargo_price'
>;

type AuctionDetailVisibilitySource = Pick<
  AuctionDetail,
  'hide_bets_history'
> & {
  trading: TradingVisibility;
};

export interface AuctionDetailVisibility {
  isBetsHistoryHidden: boolean;
  isCargoPriceHidden: boolean;
  isRouteHidden: boolean;
  arePointDetailsHidden: boolean;
}

/** Собирает ограничения отображения detail DTO в одном месте. */
export const getAuctionDetailVisibility = (
  detail: AuctionDetailVisibilitySource,
): AuctionDetailVisibility => {
  return {
    isBetsHistoryHidden:
      detail.hide_bets_history === true ||
      detail.trading.hide_bets_history === true,
    isCargoPriceHidden: detail.trading.no_view_cargo_price === true,
    isRouteHidden: detail.trading.hide_places === true,
    arePointDetailsHidden:
      detail.trading.hide_points_address_and_contacts === true,
  };
};
