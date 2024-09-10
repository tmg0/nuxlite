import { createApp } from 'vue'
import App from './app.vue'
import { router } from './router'

import './assets/css/tailwind.css'

const app = createApp(App)

app.use(router)
app.mount('#root')
