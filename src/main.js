import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { pinia } from './lib/store'
import router from './lib/router'
import i18n from './i18n'

// 安装全局错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// 创建并挂载应用
const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(pinia)
app.mount('#app')
