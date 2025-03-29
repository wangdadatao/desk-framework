import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用组合式API
  locale: localStorage.getItem('app-locale') || 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 备用语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
