import { MutationTree } from 'vuex'
import Mapbox from 'mapbox-gl'

import { MapState } from './state'
import { Feature } from '../../interfaces/places'

const mutations: MutationTree<MapState> = {
  setMap(state, map: Mapbox.Map) {
    state.map = map
  },

  setMarkers(state, places: Feature[]) {
    state.markers.forEach((marker) => marker.remove())
    state.markers = []

    if (!state.map) return

    for (const place of places) {
      const [lng, lat] = place.center

      const marker = new Mapbox.Marker().setLngLat([lng, lat]).addTo(state.map)
      state.markers.push(marker)
    }
  },
}

export default mutations
