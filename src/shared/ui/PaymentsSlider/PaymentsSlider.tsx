// "use client"

import { useState } from "react"
import s from "./PaymentsSlider.module.scss"

export type PaymentsSliderProps = {
  totalItems: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
}

export const PaymentsSlider = ({
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
}: PaymentsSliderProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(itemsPerPage)

  const totalPages = Math.ceil(totalItems / perPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      onPageChange?.(page)
    }
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setCurrentPage(1)
    onItemsPerPageChange?.(value)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5
    const halfVisible = Math.floor(maxVisible / 2)

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let startPage = currentPage - halfVisible
      let endPage = currentPage + halfVisible

      if (startPage <= 2) {
        endPage = maxVisible
        startPage = 1
      } else if (endPage >= totalPages - 1) {
        startPage = totalPages - maxVisible + 1
        endPage = totalPages
      }

      if (startPage > 2) {
        pages.push("...")
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i)
        }
      }

      if (endPage < totalPages - 1) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={s.sliderContainer}>
      <div className={s.controls}>
        <button className={s.navButton} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ‹
        </button>

        <div className={s.pageNumbers}>
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`${s.pageButton} ${currentPage === page ? s.active : ""} ${page === "..." ? s.ellipsis : ""}`}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={s.navButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>

      <div className={s.perPage}>
        <span>Show</span>
        <select value={perPage} onChange={(e) => handlePerPageChange(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>on page</span>
      </div>
    </div>
  )
}
