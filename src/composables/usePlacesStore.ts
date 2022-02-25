import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { StateInterface } from '../store'

export const usePlacesStore = () => {
  const store = useStore<StateInterface>()

  onMounted(() => {
    if (!store.getters['places/isUserLocationReady']) {
      store.dispatch('places/getInitialLocation')
    }
  })

  return {
    // state
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),
    searchResults: computed(() => store.state.places.searchResults),
    waitingSearchResults: computed(
      () => store.state.places.waitingSearchResults
    ),

    //getters
    isUserLocationReady: computed<Boolean>(
      () => store.getters['places/isUserLocationReady']
    ),

    // actions
    searchPlacesByKeyword: (query = '') => {
      store.dispatch('places/searchPlacesByKeyword', query)
    },
  }
}
