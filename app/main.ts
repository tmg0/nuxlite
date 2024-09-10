import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './app.vue'

import './assets/css/tailwind.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: routes ?? [],
})

app.use(router)
app.mount('#root')
