import { SlidersHorizontal, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import { auctionFiltersUiStore } from '../../model/auction-filters-ui-store';
import { useAllFilters } from '../../model/use-all-filters';
import { filterChipStyles } from '../chips/filter-chip-styles';
import { BasicFiltersSection } from './BasicFiltersSection';
import { CargoPriceFiltersSection } from './CargoPriceFiltersSection';
import { DateFiltersSection } from './DateFiltersSection';
import { RouteFiltersSection } from './RouteFiltersSection';
import type { AuctionFiltersValue } from '../../model/auction-filters';

interface AuctionFiltersSheetProps {
  value: AuctionFiltersValue;
  onApply: (value: AuctionFiltersValue) => void;
}

export const AuctionFiltersSheet = observer(function AuctionFiltersSheet({
  value,
  onApply,
}: AuctionFiltersSheetProps) {
  const {
    activeFiltersCount,
    applyFilters,
    draft,
    handleOpenChange,
    open,
    resetFilters,
    setField,
  } = useAllFilters({
    value,
    onApply,
    open: auctionFiltersUiStore.allFiltersOpen,
    onOpenChange: (open) => auctionFiltersUiStore.setAllFiltersOpen(open),
  });

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        className={filterChipStyles({
          active: false,
          className:
            'order-first w-10 justify-center px-0! lg:order-last lg:ml-auto lg:h-auto lg:w-auto lg:justify-start lg:rounded-lg! lg:px-3! lg:py-2',
        })}
        aria-label="Все фильтры"
      >
        <SlidersHorizontal
          className="lg:hidden"
          style={{ width: 20, height: 20 }}
          aria-hidden="true"
        />
        <SlidersHorizontal
          className="hidden lg:block"
          style={{ width: 16, height: 16 }}
          aria-hidden="true"
        />
        <span className="hidden lg:inline">Все фильтры</span>
        {activeFiltersCount > 0 ? (
          <span className="hidden rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground lg:inline-flex">
            {activeFiltersCount}
          </span>
        ) : null}
      </SheetTrigger>

      <SheetContent>
        <header className="flex shrink-0 items-center justify-between border-b px-5 py-4 sm:px-6">
          <SheetTitle className="text-2xl font-semibold">
            Все фильтры
          </SheetTitle>
          <SheetClose
            className="rounded-full p-2 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Закрыть фильтры"
          >
            <X className="size-5" aria-hidden="true" />
          </SheetClose>
        </header>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            applyFilters();
          }}
        >
          <ScrollArea
            className="min-h-0 flex-1"
            contentClassName="grid gap-7 px-5 py-6 pr-7 sm:px-6 sm:pr-8"
          >
            <BasicFiltersSection draft={draft} setField={setField} />
            <RouteFiltersSection draft={draft} setField={setField} />
            <CargoPriceFiltersSection draft={draft} setField={setField} />
            <DateFiltersSection draft={draft} setField={setField} />
          </ScrollArea>

          <footer className="grid shrink-0 grid-cols-2 gap-3 border-t bg-background p-4 sm:px-6">
            <Button type="button" variant="outline" onClick={resetFilters}>
              Сбросить всё
            </Button>
            <Button type="submit">Применить фильтры</Button>
          </footer>
        </form>
      </SheetContent>
    </Sheet>
  );
});
