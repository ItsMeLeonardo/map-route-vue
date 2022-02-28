import { Feature } from '../../interfaces/places'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
  searchResults: Feature[]
  waitingSearchResults: boolean
}

function state(): PlacesState {
  return {
    isLoading: false,
    userLocation: undefined,
    searchResults: [],
    waitingSearchResults: false,
  }
}

export default state
