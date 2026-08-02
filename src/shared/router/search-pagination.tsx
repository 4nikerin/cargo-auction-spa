import { Link } from '@tanstack/react-router';

import { Pagination } from '@/shared/ui/pagination';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

/**
 * Связывает независимый UI пагинации с URL через Link: сохраняет остальные
 * search params и не записывает страницу 1, поскольку она является значением по умолчанию.
 */
export const SearchPagination = ({
  currentPage,
  totalPages,
  className,
}: SearchPaginationProps) => {
  return (
    <Pagination
      className={className}
      currentPage={currentPage}
      totalPages={totalPages}
      renderPageLink={(page) => (
        <Link
          to="."
          search={(previous) => ({
            ...previous,
            page: page > 1 ? page : undefined,
          })}
        />
      )}
    />
  );
};
