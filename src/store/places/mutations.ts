import { MutationTree } from 'vuex'
import { PlacesState } from './state'

const mutations: MutationTree<PlacesState> = {
  setUserCords(state: PlacesState, coords: { lng: number; lat: number }) {
    state.userLocation = [coords.lng, coords.lat]
    state.isLoading = false
  },
}

export default mutations
