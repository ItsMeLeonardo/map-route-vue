import { MutationTree } from 'vuex'
import Mapbox from 'mapbox-gl'

import { MapState } from './state'

const mutations: MutationTree<MapState> = {
  setMap(state, map: Mapbox.Map) {
    state.map = map
  },
}

export default mutations
