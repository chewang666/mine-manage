import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-plus/dist/index.css'

import '@/assets/css/globle.css'
import '@/assets/font/font.css'

const app=createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$http = axios;//挂载
app.use(VueAxios,axios);
app.mount('#app')


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }