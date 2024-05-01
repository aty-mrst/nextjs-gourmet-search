import { useCallback, useEffect } from "react";
import { UsePaginationProps } from "./index.type";

export const usePagination = ({
  currentPage,
  totalPages,
}: UsePaginationProps) => {
  const pageNumbers: { key: number }[] = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages!, startPage + 2);

  const renderPageNumbers = useCallback(() => {
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push({ key: i });
    }
  }, [endPage, pageNumbers, startPage]);

  renderPageNumbers();

  return { pageNumbers };
};
