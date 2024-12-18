// src/components/ui/Pagination.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState, useEffect } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function Pagination({ currentPage, totalPages, hasNextPage, hasPrevPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()

    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const visiblePages = useMemo(() => {
    const delta = isMobile ? 1 : 2
    const range: (number | string)[] = []

    range.push(1)

    const rangeStart = Math.max(2, currentPage - delta)
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta)

    if (rangeStart > 2) {
      range.push('...')
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i)
    }

    if (rangeEnd < totalPages - 1) {
      range.push('...')
    }

    if (totalPages !== 1) {
      range.push(totalPages)
    }

    return range
  }, [currentPage, totalPages, isMobile])

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `?${params.toString()}`
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(createPageURL(page))
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 py-8'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className='px-4 py-2 text-sm bg-[#1a1b26] text-[#63a8f3] rounded-lg disabled:opacity-50'
      >
        {isMobile ? 'Prev' : 'Previous'}
      </button>

      <div className='flex gap-1 sm:gap-2'>
        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === '...'}
            className={`px-3 sm:px-4 py-2 text-sm rounded-lg ${
              page === currentPage ? 'bg-[#63a8f3] text-white' : 'bg-[#1a1b26] text-[#63a8f3]'
            } ${page === '...' ? 'cursor-default' : 'hover:bg-[#232534]'}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className='px-4 py-2 text-sm bg-[#1a1b26] text-[#63a8f3] rounded-lg disabled:opacity-50'
      >
        {isMobile ? 'Next' : 'Next'}
      </button>
    </div>
  )
}
