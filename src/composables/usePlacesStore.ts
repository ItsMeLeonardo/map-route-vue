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

    //getters
    isUserLocationReady: computed<Boolean>(
      () => store.getters['places/isUserLocationReady']
    ),
  }
}
