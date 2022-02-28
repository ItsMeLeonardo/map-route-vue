import { ActionTree } from 'vuex'
import { PlacesState } from './state'
import { StateInterface } from '../index'

import { searchApi } from '../../service'
import { PlacesResponse } from '../../interfaces/places'

const actions: ActionTree<PlacesState, StateInterface> = {
  // with🍍
  getInitialLocation({ commit }) {
    const success: PositionCallback = ({ coords }) => {
      commit('setUserCords', { lng: coords.longitude, lat: coords.latitude })
    }

    const error: PositionErrorCallback = (error) => {
      console.log(error)
      throw new Error('Error getting user location')
    }
    navigator.geolocation.getCurrentPosition(success, error)
  },
  // with🍍
  async searchPlacesByKeyword({ commit, state }, query: string) {
    if (query.trim().length === 0) {
      commit('setSearchPlaceResults', [])
      return
    }
    if (!state.userLocation) throw new Error('User location is not ready')

    commit('setWaitingSearchResults')

    const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(','),
      },
    })

    commit('setSearchPlaceResults', response.data.features)
  },
}

export default actions
