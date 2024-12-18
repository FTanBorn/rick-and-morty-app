// src/context/FilterContext.tsx
'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

type FilterState = {
  statuses: string[]
  gender: string
}

type FilterAction =
  | { type: 'ADD_STATUS'; payload: string }
  | { type: 'REMOVE_STATUS'; payload: string }
  | { type: 'SET_GENDER'; payload: string }
  | { type: 'RESET_FILTERS' }

const initialState: FilterState = {
  statuses: [],
  gender: ''
}

const FilterContext = createContext<
  | {
      state: FilterState
      dispatch: React.Dispatch<FilterAction>
    }
  | undefined
>(undefined)

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'ADD_STATUS':
      if (state.statuses.includes(action.payload)) {
        return state
      }
      return {
        ...state,
        statuses: [...state.statuses, action.payload]
      }

    case 'REMOVE_STATUS':
      return {
        ...state,
        statuses: state.statuses.filter(status => status !== action.payload)
      }

    case 'SET_GENDER':
      return {
        ...state,
        gender: action.payload
      }

    case 'RESET_FILTERS':
      return initialState

    default:
      return state
  }
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  return <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}

// Yardımcı hook'lar
export function useStatusFilter() {
  const { state, dispatch } = useFilter()

  const toggleStatus = (status: string) => {
    if (state.statuses.includes(status)) {
      dispatch({ type: 'REMOVE_STATUS', payload: status })
    } else {
      dispatch({ type: 'ADD_STATUS', payload: status })
    }
  }

  return {
    statuses: state.statuses,
    toggleStatus
  }
}

export function useGenderFilter() {
  const { state, dispatch } = useFilter()

  const setGender = (gender: string) => {
    dispatch({ type: 'SET_GENDER', payload: gender })
  }

  return {
    gender: state.gender,
    setGender
  }
}
