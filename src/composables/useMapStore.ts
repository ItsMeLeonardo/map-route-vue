import { computed } from 'vue'
import { useStore } from 'vuex'
import Mapbox from 'mapbox-gl'

import { StateInterface } from '../store/vuex'

import { Feature } from '../interfaces/places'
import { RouteBetweenPoints } from '../store/vuex/map/actions'

import { formatTime } from '../utils/formatTime'
import { formatDistance } from '../utils/formatDistance'

export const useMapStore = () => {
  const store = useStore<StateInterface>()

  return {
    map: computed(() => store.state.map.map),

    duration: computed(() => {
      if (!store.state.map.duration) return
      return formatTime(store.state.map.duration)
    }),

    distance: computed(() => {
      if (!store.state.map.distance) return
      return formatDistance(store.state.map.distance)
    }),

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
