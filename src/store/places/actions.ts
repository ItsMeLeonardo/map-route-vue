import { ActionTree } from 'vuex'
import { PlacesState } from './state'
import { StateInterface } from '../index'

const actions: ActionTree<PlacesState, StateInterface> = {
  getInitialLocation({ commit }) {
    //TODO: add loading

    const success: PositionCallback = ({ coords }) => {
      commit('setUserCords', { lng: coords.longitude, lat: coords.latitude })
    }

    const error: PositionErrorCallback = (error) => {
      console.log(error)
      throw new Error('Error getting user location')
    }
    navigator.geolocation.getCurrentPosition(success, error)
  },
}

export default actions
