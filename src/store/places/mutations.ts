import { MutationTree } from 'vuex'
import { Feature } from '../../interfaces/places'
import { PlacesState } from './state'

const mutations: MutationTree<PlacesState> = {
  setUserCords(state: PlacesState, coords: { lng: number; lat: number }) {
    state.userLocation = [coords.lng, coords.lat]
    state.isLoading = false
  },
  setWaitingSearchResults(state: PlacesState) {
    state.waitingSearchResults = true
  },
  setSearchPlaceResults(state: PlacesState, results: Feature[]) {
    state.searchResults = results
    state.waitingSearchResults = false
  },
}

export default mutations
