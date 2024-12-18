'use client'

import FilterDrawer from '@/components/ui/FilterDrawer'
import { useState } from 'react'

interface MobileOptimizedLayoutProps {
  filter: React.ReactNode
  content: React.ReactNode
  totalResults: number
}

export default function MobileOptimizedLayout({ filter, content, totalResults }: MobileOptimizedLayoutProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <main className='min-h-screen bg-[#0a0b14]'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-xl text-white font-bold'>Rick and Morty Characters</h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className='lg:hidden inline-flex items-center gap-2 bg-[#1a1b26] text-[#63a8f3] px-4 py-2 rounded-lg'
          >
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 4H3' />
              <path d='M17 12H3' />
              <path d='M13 20H3' />
            </svg>
            Filters
          </button>
        </div>

        <div className='lg:hidden mb-4'>
          <span className='text-sm text-gray-400'>{totalResults} results</span>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <aside className='hidden lg:block w-64 flex-shrink-0 bg-[#1a1b26] p-4 rounded-lg h-fit'>{filter}</aside>

          <div className='flex-1'>
            <div className='hidden lg:block mb-4'>
              <span className='text-sm text-gray-400'>{totalResults} results</span>
            </div>

            <div className='space-y-3'>{content}</div>
          </div>
        </div>

        <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
          <div className='bg-[#1a1b26] p-4 rounded-lg'>{filter}</div>
        </FilterDrawer>
      </div>
    </main>
  )
}
