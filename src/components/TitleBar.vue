<template>
  <!-- 简单标题栏 -->
  <div class="h-10 flex items-center justify-between px-4" data-tauri-drag-region>
    <!-- 左侧 -->
    <div class="flex items-center">
      <span class="text-sm font-medium">Desk Framework</span>
    </div>
    
    <!-- 右侧 -->
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
</template>

<script setup>
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'

const isMaximized = ref(false)

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
  -webkit-app-region: drag;
  app-region: drag;
  user-select: none;
}

button {
  -webkit-app-region: no-drag;
  app-region: no-drag;
}
</style>
