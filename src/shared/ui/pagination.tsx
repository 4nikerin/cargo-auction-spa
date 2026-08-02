import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactElement } from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // Ссылка создаётся снаружи, чтобы UI-компонент не зависел от конкретного роутера.
  renderPageLink: (page: number) => ReactElement;
  className?: string;
}

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

/** Оставляет края и страницы рядом с текущей, не раздувая навигацию на длинных списках. */
const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationItem[] => {
  if (totalPages <= 8) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 5) {
    return [1, 2, 3, 4, 5, 6, 'ellipsis-end', totalPages];
  }

  if (currentPage >= totalPages - 4) {
    return [
      1,
      'ellipsis-start',
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'ellipsis-start',
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    'ellipsis-end',
    totalPages,
  ];
};

const Pagination = ({
  currentPage,
  totalPages,
  renderPageLink,
  className,
}: PaginationProps) => {
  const items = getPaginationItems(currentPage, totalPages);

  return (
    <ScrollArea
      className={cn(
        'mx-auto w-fit max-w-full rounded-full border bg-background',
        className,
      )}
      orientation="horizontal"
    >
      <nav
        className="flex w-max items-center gap-1 p-1.5 pb-3 sm:gap-2 sm:p-2 sm:pb-3"
        aria-label="Пагинация"
      >
        {currentPage > 1 ? (
          <Button
            nativeButton={false}
            render={renderPageLink(currentPage - 1)}
            className="size-9 rounded-full text-muted-foreground sm:size-11"
            variant="ghost"
            size="icon-lg"
            aria-label="Предыдущая страница"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
        ) : null}

        <div className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => {
            if (typeof item !== 'number') {
              return (
                <span
                  key={item}
                  className="flex size-9 shrink-0 items-center justify-center text-lg text-muted-foreground sm:size-11"
                  aria-hidden="true"
                >
                  …
                </span>
              );
            }

            if (item === currentPage) {
              return (
                <span
                  key={item}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-base font-medium text-foreground sm:size-11 sm:text-lg"
                  aria-current="page"
                  aria-label={`Страница ${item}`}
                >
                  {item}
                </span>
              );
            }

            return (
              <Button
                key={item}
                nativeButton={false}
                render={renderPageLink(item)}
                className="size-9 rounded-full text-base font-normal text-muted-foreground hover:text-foreground sm:size-11 sm:text-lg"
                variant="ghost"
                size="icon-lg"
                aria-label={`Перейти на страницу ${item}`}
              >
                {item}
              </Button>
            );
          })}
        </div>

        {currentPage < totalPages ? (
          <Button
            nativeButton={false}
            render={renderPageLink(currentPage + 1)}
            className="size-9 rounded-full text-muted-foreground sm:size-11"
            variant="ghost"
            size="icon-lg"
            aria-label="Следующая страница"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        ) : null}
      </nav>
    </ScrollArea>
  );
};

export { Pagination };
