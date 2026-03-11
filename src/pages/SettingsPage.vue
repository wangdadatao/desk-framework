<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">{{ $t('settings.title') }}</h2>
    <div class="p-6 border rounded-lg bg-card">
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-2">{{ $t('settings.basicSettings') }}</h3>
          <div class="space-y-5">
            <!-- 主题设置 - 改为下拉列表 -->
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm font-medium">{{ $t('settings.theme') }}</p>
                <p class="text-xs text-muted-foreground">{{ $t('settings.themeDesc') }}</p>
              </div>
              <select 
                v-model="selectedTheme" 
                @change="changeTheme"
                class="py-1 px-3 rounded border border-border bg-card text-foreground"
              >
                <option value="light">{{ $t('settings.themeLight') }}</option>
                <option value="dark">{{ $t('settings.themeDark') }}</option>
                <option value="system">{{ $t('settings.themeSystem') }}</option>
              </select>
            </div>
            
            <!-- 开机启动开关 -->
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm font-medium">{{ $t('settings.startAtLogin') }}</p>
                <p class="text-xs text-muted-foreground">{{ $t('settings.startAtLoginDesc') }}</p>
              </div>
              <button 
                @click="toggleStartAtLogin" 
                class="w-12 h-6 rounded-full relative" 
                :class="settingsStore.startAtLogin ? 'bg-primary' : 'bg-secondary'"
              >
                <span class="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all" 
                      :class="settingsStore.startAtLogin ? 'left-7' : 'left-0.5'"></span>
              </button>
            </div>
            
            <!-- 语言选择 -->
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm font-medium">{{ $t('settings.language') }}</p>
                <p class="text-xs text-muted-foreground">{{ $t('settings.languageDesc') }}</p>
              </div>
              <select 
                v-model="selectedLanguage" 
                @change="changeLanguage"
                class="py-1 px-3 rounded border border-border bg-card text-foreground"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="pt-4 border-t border-border">
          <h3 class="text-lg font-medium mb-2">{{ $t('settings.about') }}</h3>
          <div class="text-sm space-y-1">
            <p>{{ $t('settings.version') }}: <span class="font-medium">1.0.0</span></p>
            <p>{{ $t('settings.buildTime') }}: <span class="font-medium">2023-10-01</span></p>
            <p>{{ $t('settings.developer') }}: <span class="font-medium">Desk Framework Team</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../lib'

const { locale } = useI18n()
const settingsStore = useSettingsStore()

const selectedLanguage = ref(settingsStore.language)
const selectedTheme = ref(settingsStore.themeMode)

watch(
  () => settingsStore.language,
  (language) => {
    selectedLanguage.value = language
    locale.value = language
  },
  { immediate: true }
)

watch(
  () => settingsStore.themeMode,
  (themeMode) => {
    selectedTheme.value = themeMode
  },
  { immediate: true }
)

async function toggleStartAtLogin() {
  await settingsStore.setAutoLaunch(!settingsStore.startAtLogin)
}

async function changeLanguage() {
  await settingsStore.setLanguage(selectedLanguage.value)
}

async function changeTheme() {
  await settingsStore.setThemeMode(selectedTheme.value)
}
</script>

<style scoped>
/* 针对深色模式下的下拉框样式 */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;
  padding-right: 2rem;
}

/* 修复下拉框选项在深色模式下的样式 */
:deep(select option) {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
}
</style>
