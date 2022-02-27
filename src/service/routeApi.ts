import axios from 'axios'

export const routeApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: true,
    geometries: 'geojson',
    language: 'en',
    overview: 'simplified',
    steps: true,
    access_token: import.meta.env.VITE_API_KEY,
  },
})
// https://api.mapbox.com/directions/v5/mapbox/driving/-73.9865721564793%2C40.73412391140428%3B-73.98819572302962%2C40.73189631944473
