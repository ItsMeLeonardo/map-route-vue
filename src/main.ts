import { createApp } from 'vue'
import { createPinia } from 'pinia'

import mapboxgl from 'mapbox-gl'
const token = import.meta.env.VITE_API_KEY

mapboxgl.accessToken = token
import App from './App.vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import './index.css'

if (!navigator.geolocation) {
  throw new Error('Geolocation is not supported by your browser')
}

createApp(App).use(createPinia()).mount('#app')
