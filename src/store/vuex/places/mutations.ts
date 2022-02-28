import { MutationTree } from 'vuex'
import { Feature } from '../../interfaces/places'
import { PlacesState } from './state'

const mutations: MutationTree<PlacesState> = {
  // with🍍
  setUserCords(state: PlacesState, coords: { lng: number; lat: number }) {
    state.userLocation = [coords.lng, coords.lat]
    state.isLoading = false
  },
  // with🍍
  setWaitingSearchResults(state: PlacesState) {
    state.waitingSearchResults = true
  },
  // with🍍
  setSearchPlaceResults(state: PlacesState, results: Feature[]) {
    state.searchResults = results
    state.waitingSearchResults = false
  },
}

export default mutations
