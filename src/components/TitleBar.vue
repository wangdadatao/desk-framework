<template>
  <!-- 标题栏容器 -->
  <div class="flex h-10 select-none" data-tauri-drag-region>
    <!-- 左侧区域 - 固定宽度，与菜单宽度相同 -->
    <div 
      class="w-64 flex items-center justify-start px-4" 
      data-tauri-drag-region
      :class="isDark ? 'bg-[#1e1e1e]' : 'bg-[rgb(245,245,245)]'"
    >
    </div>
    
    <!-- 右侧区域 - 自适应宽度，与内容区域背景一致 -->
    <div 
      class="flex-1 flex items-center justify-end px-4 bg-background" 
      data-tauri-drag-region
    >
      <div class="flex items-center gap-2">
        <button @click="minimizeWindow" class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="text-lg">-</span>
        </button>
        <button @click="toggleMaximize" class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="text-lg">□</span>
        </button>
        <button @click="closeWindow" class="w-8 h-8 flex items-center justify-center rounded hover:bg-red-500 hover:text-white">
          <span class="text-lg">×</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { useTheme } from '../lib/useTheme'

const isMaximized = ref(false)
const { isDark } = useTheme()

// 窗口控制函数
async function minimizeWindow() {
  try {
    await invoke('minimize_window')
  } catch (error) {
    console.error('Error minimizing window:', error)
  }
}

async function toggleMaximize() {
  try {
    await invoke('maximize_window')
    isMaximized.value = await invoke('is_window_maximized')
  } catch (error) {
    console.error('Error toggling maximize:', error)
  }
}

async function closeWindow() {
  try {
    await invoke('close_window')
  } catch (error) {
    console.error('Error closing window:', error)
  }
}
</script>

<style scoped>
[data-tauri-drag-region] {
  app-region: drag;
  user-select: none;
}

button {
  app-region: no-drag;
}
</style>
