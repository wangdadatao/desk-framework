import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '../store'

export function useTheme() {
  const settingsStore = useSettingsStore()
  
  // 计算属性，跟踪当前是否为深色主题
  const isDark = computed(() => settingsStore.isDarkTheme)
  
  // 当前主题模式
  const themeMode = computed(() => settingsStore.themeMode)
  
  // 改变主题模式
  function setThemeMode(mode) {
    settingsStore.setThemeMode(mode)
  }
  
  // 系统主题检查计时器
  let systemThemeTimer = null
  
  onMounted(() => {
    // 如果使用系统主题，设置定期检查
    if (settingsStore.themeMode === 'system') {
      systemThemeTimer = setInterval(() => {
        settingsStore.checkSystemTheme()
      }, 60000) // 每分钟检查一次
    }
  })
  
  onUnmounted(() => {
    if (systemThemeTimer) {
      clearInterval(systemThemeTimer)
    }
  })
  
  watch(() => settingsStore.themeMode, (newMode) => {
    // 当主题模式更改时，清除之前的计时器
    if (systemThemeTimer) {
      clearInterval(systemThemeTimer)
      systemThemeTimer = null
    }
    
    // 如果是系统模式，设置新的计时器
    if (newMode === 'system') {
      settingsStore.checkSystemTheme()
      systemThemeTimer = setInterval(() => {
        settingsStore.checkSystemTheme()
      }, 60000)
    }
  })
  
  return {
    isDark,
    themeMode,
    setThemeMode
  }
}
