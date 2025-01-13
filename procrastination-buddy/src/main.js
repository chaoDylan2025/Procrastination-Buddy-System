import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import { fa } from "vuetify/iconsets/fa"
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: { mdi, fa },
    },
  
    components,
    directives,
})

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(vuetify)

app.mount('#app')
