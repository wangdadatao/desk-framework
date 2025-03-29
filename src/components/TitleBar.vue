<template>
    <div class="flex h-10 select-none relative">
      <!-- 拖动区域 (跨平台通用) -->
      <div 
        class="absolute inset-0"
        data-tauri-drag-region
      ></div>
  
      <!-- 左侧区域 -->
      <div 
        class="w-64 flex items-center justify-start px-4 relative z-10"
        :class="isDark ? 'bg-[#1e1e1e]' : 'bg-[rgb(245,245,245)]'"
      >
        <!-- Mac 风格控制按钮 -->
        <div v-if="isMac" class="flex items-center gap-2 no-drag">
          <button 
            @click="closeWindow" 
            class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
          >
            <XIcon class="h-2 w-2 text-red-800 opacity-0 group-hover:opacity-100" />
          </button>
          
          <button 
            @click="minimizeWindow" 
            class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
          >
            <MinusIcon class="h-2 w-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
          </button>
          
          <button 
            @click="toggleMaximize" 
            class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
          >
            <component 
              :is="isMaximized ? MinimizeIcon : MaximizeIcon" 
              class="h-2 w-2 text-green-800 opacity-0 group-hover:opacity-100" 
            />
          </button>
        </div>
      </div>
      
      <!-- 右侧区域 -->
      <div 
        class="flex-1 flex items-center justify-end px-4 backdrop-blur-lg relative z-10"
        :class="isDark ? 'bg-background/90' : 'bg-background/90'"
      >
        <!-- Windows 风格控制按钮 -->
        <div v-if="!isMac" class="flex items-center no-drag">
          <button 
            @click="minimizeWindow" 
            class="h-8 w-12 flex items-center justify-center"
            :class="isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'"
          >
            <MinusIcon class="h-4 w-4" />
          </button>
          
          <button 
            @click="toggleMaximize" 
            class="h-8 w-12 flex items-center justify-center"
            :class="isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'"
          >
            <component :is="isMaximized ? MinimizeIcon : MaximizeIcon" class="h-4 w-4" />
          </button>
          
          <button 
            @click="closeWindow" 
            class="h-8 w-12 flex items-center justify-center hover:bg-red-500 hover:text-white"
          >
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
      // 获取操作系统信息
      osInfo.value = await invoke('get_os_info');
      isMac.value = osInfo.value.family === 'mac';
      
      // 获取窗口状态
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
  [data-tauri-drag-region] {
    -webkit-app-region: drag;
    user-select: none;
  }
  
  .no-drag, .no-drag * {
    -webkit-app-region: no-drag;
  }
  
  @media (pointer: fine) {
    [data-tauri-drag-region] {
      cursor: default !important;
    }
  }
  
  button, button * {
    -webkit-app-region: no-drag;
  }
  </style>
  