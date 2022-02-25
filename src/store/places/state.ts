export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
}

function state(): PlacesState {
  return {
    isLoading: false,
    userLocation: undefined,
  }
}

export default state
