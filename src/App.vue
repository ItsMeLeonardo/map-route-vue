<script setup lang="ts">
  import { usePlacesStore } from './composables'

  import MapView from './components/MapView.vue'
  import MyLocationButton from './components/MyLocationButton.vue'

  usePlacesStore()
</script>

<template>
  <div id="app">
    <MapView />
    <MyLocationButton />
  </div>
</template>
