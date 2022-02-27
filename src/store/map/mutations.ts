import { MutationTree } from 'vuex'
import Mapbox from 'mapbox-gl'

import { MapState } from './state'
import { Feature } from '../../interfaces/places'

const mutations: MutationTree<MapState> = {
  setMap(state, map: Mapbox.Map) {
    state.map = map
  },

  setMarkers(state, places: Feature[]) {
    state.markers.forEach((marker) => marker.remove())
    state.markers = []

    if (!state.map) return

    for (const place of places) {
      const [lng, lat] = place.center

      const marker = new Mapbox.Marker().setLngLat([lng, lat]).addTo(state.map)
      state.markers.push(marker)
    }
  },

  setRoutePolyline(state, coords: number[][]) {
    const start = coords[0]
    const bounds = new Mapbox.LngLatBounds(
      [start[0], start[1]],
      [start[0], start[1]]
    )

    for (const [lng, lat] of coords) {
      bounds.extend([lng, lat])
    }

    state.map?.fitBounds(bounds, { padding: 100, essential: true })

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

    if (state.map?.getSource('route')) {
      state.map?.removeSource('route')
      state.map?.removeLayer('route')
    }

    state.map?.addSource('route', sourceData)

    state.map?.addLayer({
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
}

export default mutations
