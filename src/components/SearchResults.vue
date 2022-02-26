<script setup lang="ts">
  import { ref } from 'vue'

  import { Feature } from '../interfaces/places'
  import { usePlacesStore, useMapStore } from '../composables'

  const { searchResults } = usePlacesStore()
  const { map } = useMapStore()

  const placeActive = ref('')
  const onPlaceClick = (place: Feature) => {
    placeActive.value = place.id

    const [lng, lat] = place.center

    map.value?.flyTo({
      center: [lng, lat],
      zoom: 10,
      essential: true,
    })
  }
</script>

<template>
  <ul
    v-if="searchResults.length > 0"
    class="p-2 bg-slate-50 rounded flex flex-col gap-2"
  >
    <li
      v-for="place in searchResults"
      :key="place.id"
      class="bg-white w-full p-2 rounded cursor-pointer transition duration-300 hover:shadow-xl hover:relative active:shadow-inner"
      :class="{ 'item-active': place.id === placeActive }"
      @click="onPlaceClick(place)"
    >
      <h3 class="text-sm font-bold text-indigo-700">{{ place.text }}</h3>
      <p
        class="max-w-full text-xs text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {{ place.place_name }}
        <button class="btn-primary">adad</button>
      </p>
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
