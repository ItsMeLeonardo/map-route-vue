import Mapbox from 'mapbox-gl'

export interface MapState {
  map?: Mapbox.Map
  markers: Mapbox.Marker[]
  distance?: number
  duration?: number
}

function state(): MapState {
  return {
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
  }
}

export default state
