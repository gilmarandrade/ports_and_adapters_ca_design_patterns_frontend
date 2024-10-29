import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AxiosAdapter from './infra/AxiosAdapter'

const app = createApp(App)
const httpClient = new AxiosAdapter()
app.provide('httpClient', httpClient)

app.mount('#app')
