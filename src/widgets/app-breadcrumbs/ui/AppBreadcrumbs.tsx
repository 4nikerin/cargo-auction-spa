import { Link, useMatches } from '@tanstack/react-router';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

/** Строит крошки из route metadata, чтобы страницы не дублировали навигационную разметку. */
export const AppBreadcrumbs = () => {
  const items = useMatches({
    select: (matches) =>
      matches.flatMap((match) => {
        const breadcrumb = match.staticData.breadcrumb;

        const label =
          typeof breadcrumb === 'function'
            ? breadcrumb(match.params)
            : breadcrumb;

        return label ? [{ id: match.id, label, pathname: match.pathname }] : [];
      }),
  });

  const isAuctionList =
    items.length === 1 &&
    items[0]?.pathname.replace(/\/+$/, '') === '/auctions';

  if (items.length === 0 || isAuctionList) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <Breadcrumb aria-label="Хлебные крошки">
        <BreadcrumbList>
          {items.map((item, index) => {
            const isCurrentPage = index === items.length - 1;

            return (
              <Fragment key={item.id}>
                {index > 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {isCurrentPage ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link to={item.pathname} />}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
