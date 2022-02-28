<script setup lang="ts">
  import { storeToRefs } from 'pinia'

  import { useMapStore } from '../store'
  import { formatTime } from '../utils/formatTime'
  import { formatDistance } from '../utils/formatDistance'

  const mapStore = useMapStore()
  const { duration, distance } = storeToRefs(mapStore)
</script>

<template>
  <section
    v-if="duration && distance"
    class="w-full absolute bottom-2 flex justify-center"
  >
    <div class="flex gap-6 bg-indigo-700 p-3 rounded">
      <div class="flex flex-col justify-end items-center">
        <header class="font-bold text-sm text-white">Route Duration</header>
        <p class="text-sm text-white">
          {{ formatTime(duration) }}
        </p>
      </div>
      <div class="flex flex-col justify-end items-center">
        <header class="font-bold text-sm text-white">Route Distance</header>
        <p class="text-sm text-white">
          {{ formatDistance(distance) }}
        </p>
      </div>
    </div>
  </section>
</template>

<style></style>
