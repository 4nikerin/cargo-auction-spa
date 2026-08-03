import { makeAutoObservable } from 'mobx';

class AuctionFiltersUiStore {
  allFiltersOpen = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setAllFiltersOpen(open: boolean) {
    this.allFiltersOpen = open;
  }
}

export const auctionFiltersUiStore = new AuctionFiltersUiStore();
