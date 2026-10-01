import { createApp } from 'vue'
import App from './App.vue'
import 'lenis/dist/lenis.css'
import './style.css'
document.documentElement.dataset.theme = localStorage.getItem('vinci-theme') || 'dark'
createApp(App).mount('#app')
