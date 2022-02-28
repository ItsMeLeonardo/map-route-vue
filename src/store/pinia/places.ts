import { defineStore } from 'pinia'

import { Feature, PlacesResponse } from '../../interfaces/places'

import { searchApi } from '../../service/searchApi'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
  searchResults: Feature[]
  waitingSearchResults: boolean
}

export const usePlaceStore = defineStore('places', {
  state: (): PlacesState => {
    return {
      isLoading: false,
      userLocation: undefined,
      searchResults: [],
      waitingSearchResults: false,
    }
  },

  actions: {
    getInitialLocation() {
      const success: PositionCallback = ({ coords }) => {
        this.userLocation = [coords.longitude, coords.latitude]
      }

      const error: PositionErrorCallback = (error) => {
        throw new Error('Error getting user location')
      }
      navigator.geolocation.getCurrentPosition(success, error)
    },

    async searchPlacesByKeyword(query: string) {
      if (query.trim().length === 0) {
        this.searchResults = []
        return
      }

      if (!this.userLocation) throw new Error('User location is not ready')

      this.waitingSearchResults = true

      const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(','),
        },
      })

      this.searchResults = response.data.features
      this.waitingSearchResults = false
    },
  },

  getters: {
    isUserLocationReady: (state) => !!state.userLocation,
  },
})
