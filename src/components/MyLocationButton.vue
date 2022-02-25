<script setup lang="ts">
  import { computed } from 'vue'

  import { useMapStore, usePlacesStore } from '../composables/'

  const { userLocation, isUserLocationReady } = usePlacesStore()
  const { map } = useMapStore()

  const isButtonReady = computed(() => isUserLocationReady.value && map.value)

  const goToUserLocation = () => {
    if (!isButtonReady.value) return
    map.value?.flyTo({
      center: userLocation.value,
      zoom: 9,
      essential: true,
    })
  }
</script>

<template>
  <button
    v-if="isButtonReady"
    @click="goToUserLocation"
    class="px-4 py-2 bg-indigo-500 rounded text-white font-bold absolute top-4 right-4 cursor-pointer"
  >
    Return to my location
  </button>
</template>
