import { ActionTree } from 'vuex'
import { MapState } from './state'
import { StateInterface } from '../index'

import { RouteMapResponse } from '../../interfaces/routeMap'
import { routeApi } from '../../service'

export type LngLat = [number, number]

export interface RouteBetweenPoints {
  start: LngLat
  end: LngLat
}

const actions: ActionTree<MapState, StateInterface> = {
  async getRouteBetweenPoints({ commit }, { start, end }: RouteBetweenPoints) {
    const response = await routeApi.get<RouteMapResponse>(
      `${start.join(',')};${end.join(',')}`
    )
    console.log({ response })
  },
}

export default actions
