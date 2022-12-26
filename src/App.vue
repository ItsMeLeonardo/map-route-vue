<script setup lang="ts">
  // import { usePlacesStore } from './composables'
  import MyLocationButton from './components/MyLocationButton.vue'
  import RouteInfo from './components/RouteInfo.vue'
  import SearchBar from './components/SearchBar.vue'
  import MapView from './components/MapView.vue'
</script>

<template>
  <div id="app">
    <MapView />
    <MyLocationButton />
    <SearchBar />
    <RouteInfo />
  </div>
</template>
