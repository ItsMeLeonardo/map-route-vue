<script setup lang="ts">
  import { usePlacesStore } from './composables'

  import MapView from './components/MapView.vue'
  import MyLocationButton from './components/MyLocationButton.vue'
  import SearchBar from './components/SearchBar.vue'
  import RouteInfo from './components/RouteInfo.vue'

  usePlacesStore()
</script>

<template>
  <div id="app">
    <MapView />
    <MyLocationButton />
    <SearchBar />
    <RouteInfo />
  </div>
</template>
