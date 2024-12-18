'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface CharacterFilterProps {
  initialStatus?: string
  initialGender?: string
}

export default function CharacterFilter({ initialStatus = '', initialGender = '' }: CharacterFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (type: 'status' | 'gender', value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(type, value)
    } else {
      params.delete(type)
    }

    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  const resetFilters = () => {
    router.push('/')
  }

  return (
    <div className='space-y-6'>
      <div className='filter-section'>
        <h3 className='text-foreground font-medium mb-3'>Status</h3>
        <div className='space-y-2'>
          {[
            { value: '', label: 'All Status' },
            { value: 'alive', label: 'Alive' },
            { value: 'dead', label: 'Dead' },
            { value: 'unknown', label: 'Unknown' }
          ].map(status => (
            <label key={status.value} className='flex items-center gap-2'>
              <input
                type='radio'
                name='status'
                value={status.value}
                checked={status.value === initialStatus}
                onChange={e => updateFilter('status', e.target.value)}
                className='text-primary focus:ring-primary'
              />
              <span className='text-foreground capitalize'>{status.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='filter-section'>
        <h3 className='text-foreground font-medium mb-3'>Gender</h3>
        <div className='space-y-2'>
          {[
            { value: '', label: 'All Genders' },
            { value: 'female', label: 'Female' },
            { value: 'male', label: 'Male' },
            { value: 'genderless', label: 'Genderless' },
            { value: 'unknown', label: 'Unknown' }
          ].map(gender => (
            <label key={gender.value} className='flex items-center gap-2'>
              <input
                type='radio'
                name='gender'
                value={gender.value}
                checked={gender.value === initialGender}
                onChange={e => updateFilter('gender', e.target.value)}
                className='text-primary focus:ring-primary'
              />
              <span className='text-foreground capitalize'>{gender.label}</span>
            </label>
          ))}
        </div>
      </div>

      {(initialStatus || initialGender) && (
        <div className='filter-section'>
          <h3 className='text-foreground font-medium mb-3'>Active Filters</h3>
          <div className='space-y-2'>
            {initialStatus && (
              <div>
                <span className='text-sm text-muted'>Status:</span>
                <span className='ml-2 text-sm bg-primary/10 text-foreground px-2 py-1 rounded-full capitalize'>
                  {initialStatus}
                </span>
              </div>
            )}
            {initialGender && (
              <div>
                <span className='text-sm text-muted'>Gender:</span>
                <span className='ml-2 text-sm bg-primary/10 text-foreground px-2 py-1 rounded-full capitalize'>
                  {initialGender}
                </span>
              </div>
            )}
            <button
              onClick={resetFilters}
              className='w-full mt-2 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 transition-colors'
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
