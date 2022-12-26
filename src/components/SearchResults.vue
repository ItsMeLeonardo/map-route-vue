<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  import { Feature } from '../interfaces/places'

  import { useMapStore, usePlaceStore } from '../store'

  const placeStore = usePlaceStore()
  const mapStore = useMapStore()

  // states
  const { userLocation, searchResults } = storeToRefs(placeStore)
  const { map } = storeToRefs(mapStore)
  //actions
  const { setMarkers, getRouteBetweenPoints } = mapStore

  const placeActive = ref('')
  const onPlaceClick = (place: Feature) => {
    placeActive.value = place.id

    const [lng, lat] = place.center

    map?.value?.flyTo({
      center: [lng, lat],
      zoom: 10,
      essential: true,
    })
  }

  const onGetRoute = (place: Feature) => {
    const [lng, lat] = place.center
    //get route
    if (!userLocation?.value) return
    const [startLng, startLat] = userLocation?.value

    getRouteBetweenPoints({ start: [startLng, startLat], end: [lng, lat] })
  }

  watch(
    searchResults,
    (newPlaces) => {
      setMarkers(newPlaces)
    },
    { immediate: true }
  )
</script>

<template>
  <ul
    v-if="searchResults.length > 0"
    class="flex flex-col gap-2 p-2 rounded bg-slate-50"
  >
    <li
      v-for="place in searchResults"
      :key="place.id"
      class="flex justify-between w-full p-2 transition duration-300 bg-white rounded cursor-pointer hover:shadow-xl hover:relative active:shadow-inner"
      :class="{ 'item-active': place.id === placeActive }"
      @click="onPlaceClick(place)"
    >
      <div class="">
        <h3 class="text-sm font-bold text-indigo-700">{{ place.text }}</h3>
        <p
          class="max-w-[30ch] text-xs text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {{ place.place_name }}
        </p>
      </div>
      <button
        @click.self="onGetRoute(place)"
        class="p-2 text-sm text-indigo-700 transition duration-300 bg-white rounded-lg shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 hover:text-white"
      >
        GO
      </button>
    </li>
  </ul>
</template>

<style scoped>
  .item-active {
    background: rgb(79, 70, 229);
    box-shadow: 0 0.5rem 1.5rem rgba(129, 140, 248, 0.5);
  }
  .item-active h3,
  .item-active p {
    color: #fff;
  }
</style>
