import axios from 'axios'

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 6,
    types: 'place,address,country',
    language: 'en',
    access_token: import.meta.env.VITE_API_KEY,
  },
})
