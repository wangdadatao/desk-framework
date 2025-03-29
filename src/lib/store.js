import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import { invoke } from '@tauri-apps/api/core'

// 创建 Pinia 实例
export const pinia = createPinia()

/**
 * 应用设置存储
 * 管理应用的全局设置，包括：
 * - 语言偏好
 * - 主题模式
 * - 开机自启动
 */
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: 'zh-CN',
    themeMode: 'system', // 'light', 'dark', 'system'
    startAtLogin: false,
    loading: false,
    isSystemDarkTheme: false
  }),
  
  getters: {
    // 根据当前主题模式和系统主题判断是否使用深色主题
    isDarkTheme(state) {
      if (state.themeMode === 'system') {
        return state.isSystemDarkTheme
      }
      return state.themeMode === 'dark'
    }
  },
  
  actions: {
    async loadSettings() {
      this.loading = true
      try {
        // 尝试从后端获取设置
        try {
          const settings = await invoke('get_settings')
          this.language = settings.language
          this.themeMode = settings.theme_mode.toLowerCase()
          this.startAtLogin = settings.start_at_login
        } catch (error) {
          console.warn('无法从后端加载设置，使用默认值:', error)
          // 使用默认值
          this.language = localStorage.getItem('app-locale') || 'zh-CN'
          this.themeMode = localStorage.getItem('app-theme') || 'system'
          this.startAtLogin = false
        }
        
        // 获取系统主题
        try {
          this.isSystemDarkTheme = await invoke('get_system_theme')
        } catch (error) {
          console.warn('无法检测系统主题:', error)
          // 使用媒体查询作为后备
          this.isSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        
        // 检查自动启动状态并同步 (可选，如果失败不终止)
        try {
          await this.checkAutoLaunchStatus()
        } catch (error) {
          console.warn('无法检查自动启动状态:', error)
        }
        
        // 应用主题
        this.applyTheme()
      } catch (error) {
        console.error('Failed to load settings:', error)
      } finally {
        this.loading = false
      }
    },
    
    async saveSettings() {
      const themeMode = this.themeMode.charAt(0).toUpperCase() + this.themeMode.slice(1)
      
      const settings = {
        language: this.language,
        theme_mode: themeMode,
        start_at_login: this.startAtLogin
      }
      
      try {
        await invoke('save_settings', { settings })
        this.applyTheme()
      } catch (error) {
        console.error('Failed to save settings:', error)
      }
    },
    
    async setThemeMode(mode) {
      this.themeMode = mode
      await this.saveSettings()
    },
    
    async checkSystemTheme() {
      try {
        this.isSystemDarkTheme = await invoke('get_system_theme')
        if (this.themeMode === 'system') {
          this.applyTheme()
        }
      } catch (error) {
        console.error('Failed to check system theme:', error)
      }
    },
    
    applyTheme() {
      // 保存主题设置到本地存储
      localStorage.setItem('app-theme', this.themeMode)
      
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    
    // 检查自动启动状态
    async checkAutoLaunchStatus() {
      try {
        const isEnabled = await invoke('check_autolaunch')
        // 如果实际状态与设置中的状态不一致，则更新设置
        if (this.startAtLogin !== isEnabled) {
          this.startAtLogin = isEnabled
          await this.saveSettings()
        }
      } catch (error) {
        console.warn('无法检查自动启动状态:', error)
      }
    },
    
    // 设置自动启动
    async setAutoLaunch(enable) {
      try {
        await invoke('set_autolaunch', { enable })
        this.startAtLogin = enable
      } catch (error) {
        console.error('Failed to set autolaunch:', error)
      }
    }
  }
})

// 可以在这里添加更多的 store，例如用户状态、应用数据等
