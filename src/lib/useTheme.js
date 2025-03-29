import { computed } from 'vue'
import { useSettingsStore } from './store'

/**
 * 主题相关组合式函数
 * 提供主题切换和状态管理功能
 */
export function useTheme() {
  const settingsStore = useSettingsStore()
  
  // 当前主题模式
  const themeMode = computed(() => settingsStore.themeMode)
  
  // 是否使用暗色主题 (默认为false，避免未初始化时出错)
  const isDark = computed(() => settingsStore.isDarkTheme || false)
  
  // 设置主题模式
  async function setThemeMode(mode) {
    await settingsStore.setThemeMode(mode)
  }
  
  // 监听系统主题变化
  async function setupThemeListener() {
    // 每小时检查一次系统主题
    setInterval(async () => {
      await settingsStore.checkSystemTheme()
    }, 3600000)
    
    // 初始检查
    await settingsStore.checkSystemTheme()
  }
  
  // 自动切换主题
  function applyTheme() {
    settingsStore.applyTheme()
  }
  
  return {
    themeMode,
    isDark,
    setThemeMode,
    setupThemeListener,
    applyTheme
  }
}
