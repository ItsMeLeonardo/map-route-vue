<script setup lang="ts">
  import { usePlacesStore } from '../composables'
  const { searchResults } = usePlacesStore()
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
    >
      <h3 class="text-sm font-bold text-indigo-700">{{ place.text }}</h3>
      <p
        class="max-w-full text-xs text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {{ place.place_name }}
      </p>
    </li>
  </ul>
</template>

<style></style>
