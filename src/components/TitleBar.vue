<template>
  <!-- 重新添加 data-tauri-drag-region 属性，同时保持 z-index -->
  <div class="flex h-10 select-none relative titlebar-container" data-tauri-drag-region>
    <!-- 左侧区域 -->
    <div
      class="w-64 flex items-center justify-start px-4 relative drag-region"
      :class="isDark ? 'bg-[#1e1e1e]' : 'bg-[rgb(245,245,245)]'"
      data-tauri-drag-region
    >
      <!-- Mac 风格控制按钮 -->
      <div v-if="isMac" class="flex items-center gap-2 no-drag">
        <button @click="closeWindow" class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group">
          <XIcon class="h-2 w-2 text-red-800 opacity-0 group-hover:opacity-100" />
        </button>
        <button @click="minimizeWindow" class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group">
          <MinusIcon class="h-2 w-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
        </button>
        <button @click="toggleMaximize" class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group">
          <component
            :is="isMaximized ? MinimizeIcon : MaximizeIcon"
            class="h-2 w-2 text-green-800 opacity-0 group-hover:opacity-100"
          />
        </button>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div
      class="flex-1 flex items-center justify-end px-4 backdrop-blur-lg relative drag-region"
      :class="isDark ? 'bg-background/90' : 'bg-background/90'"
      data-tauri-drag-region
    >
      <!-- Windows 风格控制按钮 -->
      <div v-if="!isMac" class="flex items-center no-drag">
        <button @click="minimizeWindow" class="h-8 w-12 flex items-center justify-center" :class="isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'">
          <MinusIcon class="h-4 w-4" />
        </button>
        <button @click="toggleMaximize" class="h-8 w-12 flex items-center justify-center" :class="isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'">
          <component :is="isMaximized ? MinimizeIcon : MaximizeIcon" class="h-4 w-4" />
        </button>
        <button @click="closeWindow" class="h-8 w-12 flex items-center justify-center hover:bg-red-500 hover:text-white">
          <XIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { useTheme } from '../lib/useTheme';
import { 
  X as XIcon, 
  Minus as MinusIcon, 
  Square as MaximizeIcon, 
  CopyIcon as MinimizeIcon
} from 'lucide-vue-next';

const isMaximized = ref(false);
const isMac = ref(false);
const osInfo = ref({});
const { isDark } = useTheme();

onMounted(async () => {
  try {
    osInfo.value = await invoke('get_os_info');
    isMac.value = osInfo.value.family === 'mac';
    isMaximized.value = await invoke('is_window_maximized');
  } catch (error) {
    console.error('Error initializing title bar:', error);
  }
});

async function minimizeWindow() {
  try {
    await invoke('minimize_window');
  } catch (error) {
    console.error('Error minimizing window:', error);
  }
}

async function toggleMaximize() {
  try {
    await invoke('maximize_window');
    isMaximized.value = await invoke('is_window_maximized');
  } catch (error) {
    console.error('Error toggling maximize:', error);
  }
}

async function closeWindow() {
  try {
    await invoke('close_window');
  } catch (error) {
    console.error('Error closing window:', error);
  }
}
</script>

<style scoped>
/* 明确设置拖动区域样式 */
.titlebar-container,
.drag-region,
[data-tauri-drag-region] {
  -webkit-app-region: drag;
  app-region: drag;
  user-select: none;
}

/* 确保按钮不可拖动但可点击 */
.no-drag,
button {
  -webkit-app-region: no-drag;
  app-region: no-drag;
}

@media (pointer: fine) {
  [data-tauri-drag-region] {
    cursor: default !important;
  }
}
</style>
