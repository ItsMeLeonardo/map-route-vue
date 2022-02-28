<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import Mapbox from 'mapbox-gl'

  import customMarker from './mapComponents/avatarMarker'
  import createCustomPopup from './mapComponents/customPopup'

  import { useMapStore, usePlaceStore } from '../store'

  const placeStore = usePlaceStore()
  const mapStore = useMapStore()

  //state
  const { userLocation, isLoading, isUserLocationReady } =
    storeToRefs(placeStore)
  // actions
  const { getInitialLocation } = placeStore
  const { setMap } = mapStore

  const mapContainerRef = ref<HTMLDivElement>()

  const createMap = () => {
    if (!mapContainerRef.value) throw new Error('No map container')
    if (!userLocation) throw new Error('No user location')
    if (!userLocation.value) throw new Error('No user location')

    const map = new Mapbox.Map({
      container: mapContainerRef.value,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: userLocation.value,
      zoom: 9,
    })

    const popup = new Mapbox.Popup({
      offset: [0, -20],
      className: 'custom-popup',
    })
      .setLngLat(userLocation.value)
      .setHTML(createCustomPopup('you are here'))

    const myLocationMarker = new Mapbox.Marker(customMarker)
      .setLngLat(userLocation.value)
      .setPopup(popup)
      .addTo(map)

    // add map to global state
    setMap(map)
  }

  onMounted(() => {
    if (isUserLocationReady.value) return createMap()
    getInitialLocation()
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

<style>
  .custom-popup .mapboxgl-popup-content {
    padding: 0;
    border-radius: 30%;
  }
</style>
