import { useState, useMemo } from 'react'

type UsePaginationOptions = {
  totalItems: number
  itemsPerPage?: number
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
}: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const { startIndex, endIndex } = useMemo(
    () => ({
      startIndex: (currentPage - 1) * itemsPerPage,
      endIndex: Math.min(currentPage * itemsPerPage, totalItems),
    }),
    [currentPage, itemsPerPage, totalItems],
  )

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const reset = () => setCurrentPage(1)

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    reset,
  }
}
