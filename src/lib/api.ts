import { api } from './axios'
import { CharacterResponse, Character, FilterParams } from '../types'

export async function getCharacters(params?: FilterParams): Promise<CharacterResponse> {
  console.log(params)

  try {
    const queryParams = { ...params }
    if (Array.isArray(queryParams.status)) {
      queryParams.status = queryParams.status.join(',')
    }

    const { data } = await api.get<CharacterResponse>('/character', {
      params: queryParams
    })
    return data
  } catch (error) {
    console.error('Error fetching characters:', error)
    throw error
  }
}

export async function getCharacterById(id: number): Promise<Character> {
  try {
    const { data } = await api.get<Character>(`/character/${id}`)
    return data
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error)
    throw error
  }
}
