import { defineStore } from 'pinia'
import Mapbox from 'mapbox-gl'

import { RouteMapResponse } from '../../interfaces/routeMap'
import { Feature } from '../../interfaces/places'

import { routeApi } from '../../service'

export interface MapState {
  map?: Mapbox.Map
  markers: Mapbox.Marker[]
  distance?: number
  duration?: number
}

export type LngLat = [number, number]

export interface RouteBetweenPoints {
  start: LngLat
  end: LngLat
}

export const useMapStore = defineStore('map', {
  state: (): MapState => ({
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
  }),

  actions: {
    setMap(map: Mapbox.Map) {
      this.map = map
    },
    setMarkers(places: Feature[]) {
      this.markers.forEach((marker) => marker.remove())
      this.markers = []

      if (!this.map) return

      for (const place of places) {
        const [lng, lat] = place.center

        const marker = new Mapbox.Marker().setLngLat([lng, lat]).addTo(this.map)
        this.markers.push(marker)
      }
    },

    setRoutePolyline(coords: number[][]) {
      const start = coords[0]
      const bounds = new Mapbox.LngLatBounds(
        [start[0], start[1]],
        [start[0], start[1]]
      )

      for (const [lng, lat] of coords) {
        bounds.extend([lng, lat])
      }

      this.map?.fitBounds(bounds, { padding: 100, essential: true })

      //draw polyline
      const sourceData: Mapbox.AnySourceData = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coords,
              },
            },
          ],
        },
        lineMetrics: true,
      }

      if (this.map?.getLayer('route')) {
        this.map?.removeLayer('route')
        this.map?.removeSource('route')
      }

      this.map?.addSource('route', sourceData)

      this.map?.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-width': 3,
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'blue',
            1,
            'red',
          ],
        },
      })
    },

    async getRouteBetweenPoints({ start, end }: RouteBetweenPoints) {
      const response = await routeApi.get<RouteMapResponse>(
        `${start.join(',')};${end.join(',')}`
      )
      const coordinates = response.data.routes[0].geometry.coordinates
      const { duration, distance } = response.data.routes[0]
      // commit('setRoutePolyline', coordinates)
      this.setRoutePolyline(coordinates)

      this.duration = duration
      this.distance = distance
    },
  },

  getters: {
    isMapReady(state) {
      return !!state.map
    },
  },
})
