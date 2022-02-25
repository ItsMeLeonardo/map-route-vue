import { computed } from 'vue'
import { useStore } from 'vuex'
import Mapbox from 'mapbox-gl'

import { StateInterface } from '../store'

export const useMapStore = () => {
  const store = useStore<StateInterface>()

  return {
    map: computed(() => store.state.map.map),
    duration: computed(() => store.state.map.duration),
    distance: computed(() => store.state.map.distance),

    //mutations
    setMap: (map: Mapbox.Map) => {
      store.commit('map/setMap', map)
    },
  }
}
