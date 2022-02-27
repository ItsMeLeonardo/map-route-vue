import { computed } from 'vue'
import { useStore } from 'vuex'
import Mapbox from 'mapbox-gl'

import { StateInterface } from '../store'

import { Feature } from '../interfaces/places'
import { RouteBetweenPoints } from '../store/map/actions'

export const useMapStore = () => {
  const store = useStore<StateInterface>()

  return {
    map: computed(() => store.state.map.map),
    duration: computed(() => store.state.map.duration),
    distance: computed(() => store.state.map.distance),

    //actions
    getRouteBetweenPoints: ({ start, end }: RouteBetweenPoints) => {
      store.dispatch('map/getRouteBetweenPoints', { start, end })
    },

    //mutations
    setMap: (map: Mapbox.Map) => {
      store.commit('map/setMap', map)
    },

    setMarkers: (places: Feature[]) => {
      store.commit('map/setMarkers', places)
    },
  }
}
