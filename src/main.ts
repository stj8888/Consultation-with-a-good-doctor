import { createApp } from 'vue'
import './style.css'
import './styles/main.scss'
import App from './App.vue'
import router from './router/index'
import pinia from './stores'
import './assets/iconfont/iconfont.css'
import 'vant/es/toast/style';
import 'vant/lib/index.css'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
