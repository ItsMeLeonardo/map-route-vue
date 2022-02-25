<script setup lang="ts">
  import { usePlacesStore } from './composables'

  import MapView from './components/MapView.vue'

  usePlacesStore()
</script>

<template>
  <div id="app">
    <MapView />
  </div>
</template>
