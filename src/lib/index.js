/**
 * 项目功能库入口文件
 * 集中导出所有公共功能，方便引用
 */

// 导出工具函数
export * from './utils'

// 导出主题相关功能
export { useTheme } from './useTheme'

// 导出状态管理
export { pinia, useSettingsStore } from './store'

// 导出路由 (但通常不直接使用，而是在 main.js 中导入)
export { default as router } from './router'

// 导出国际化 (但通常不直接使用，而是在 main.js 中导入)
export { default as i18n } from '../i18n'
