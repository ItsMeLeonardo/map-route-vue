<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import Mapbox from 'mapbox-gl'

  import { usePlacesStore, useMapStore } from '../composables'

  const { userLocation, isLoading, isUserLocationReady } = usePlacesStore()
  const { setMap } = useMapStore()

  const mapContainerRef = ref<HTMLDivElement>()

  const createMap = () => {
    if (!mapContainerRef.value) throw new Error('No map container')
    if (!userLocation.value) throw new Error('No useLocation container')

    const map = new Mapbox.Map({
      container: mapContainerRef.value,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: userLocation.value,
      zoom: 9,
    })

    const popup = new Mapbox.Popup()
      .setLngLat(userLocation.value)
      .setHTML('<p>You are here</p>')

    const myLocationMarker = new Mapbox.Marker()
      .setLngLat(userLocation.value)
      .setPopup(popup)
      .addTo(map)

    // add map to global state
    setMap(map)
  }

  onMounted(() => {
    if (isUserLocationReady.value) return createMap()
    console.log('waiting for places to load')
  })

  watch(isUserLocationReady, () => {
    if (isUserLocationReady.value) createMap()
  })
</script>

<template>
  <section class="w-screen h-screen relative">
    <aside
      v-if="isLoading"
      class="w-full h-full absolute top-0 left-0 bg-slate-800/80 flex justify-center items-center"
    >
      <h3 class="text-2xl text-white font-bold">please wait ...</h3>
    </aside>

    <div
      v-else
      ref="mapContainerRef"
      class="w-full h-full top-0 left-0 map-container"
    />
  </section>
</template>
