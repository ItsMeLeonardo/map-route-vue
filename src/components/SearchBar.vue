<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  import { usePlaceStore } from '../store'

  //@ts-ignore-next-line
  import SearchResults from './SearchResults.vue'
  //@ts-ignore-next-line
  import SearchResultsLoader from './loaders/SearchResultsLoader.vue'

  import { debounce } from '../utils/debounce'

  const placeStore = usePlaceStore()
  //state
  const { waitingSearchResults } = storeToRefs(placeStore)
  //actions
  const { searchPlacesByKeyword } = placeStore

  const keywordToSearch = ref('')
  const onSearch = debounce((event: Event) => {
    const input = event.target as HTMLInputElement
    const value = input.value
    keywordToSearch.value = value
  }, 500)

  watch(keywordToSearch, () => {
    searchPlacesByKeyword(keywordToSearch.value)
  })
</script>

<template>
  <section
    class="max-w-[270px] w-full absolute top-4 left-4 flex flex-col gap-2"
  >
    <label>
      <input
        type="search"
        class="w-full py-2 px-4 bg-slate-50 border-2 border-transparent outline-none rounded focus:border-indigo-500"
        placeholder="Search for a place"
        @input="onSearch"
        :value="keywordToSearch"
      />
    </label>

    <aside v-if="waitingSearchResults" class="bg-zinc-400">
      <SearchResultsLoader />
    </aside>
    <aside v-else>
      <SearchResults />
    </aside>
  </section>
</template>
