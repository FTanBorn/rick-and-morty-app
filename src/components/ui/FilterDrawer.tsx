'use client'

import { useEffect, useState } from 'react'

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function FilterDrawer({ isOpen, onClose, children }: FilterDrawerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = ''
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible && !isOpen) return null

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 bg-[#0a0b14] rounded-t-xl max-h-[90vh] overflow-y-auto ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='sticky top-0 flex items-center justify-between p-4 border-b border-gray-700'>
          <h3 className='text-lg font-semibold text-white'>Filters</h3>
          <button onClick={onClose} className='p-2 text-gray-400 hover:text-white rounded-lg transition-colors'>
            <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <path d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        <div className='p-4'>{children}</div>
      </div>
    </>
  )
}
