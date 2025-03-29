<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-muted-foreground">{{ $t('settings.version') }}</p>
        <p class="text-sm font-medium">{{ version }}</p>
      </div>
      <div>
        <p class="text-sm text-muted-foreground">{{ $t('tauriInfo.os') }}</p>
        <p class="text-sm font-medium">{{ osInfo }}</p>
      </div>
    </div>
    
    <button 
      class="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      @click="showDialog"
    >
      {{ $t('common.showDialog') }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';

// 简化组件，不再依赖 Tauri 特定 API
const version = ref('1.0.0');
const osInfo = ref('');

onMounted(async () => {
  try {
    // 获取操作系统信息
    const info = await invoke('get_os_info');
    osInfo.value = info.name || 'Unknown';
  } catch (error) {
    console.error('无法获取系统信息:', error);
    osInfo.value = 'Unknown';
  }
});

async function showDialog() {
  try {
    await open({
      title: '信息',
      message: '这是一个来自 Tauri 的消息!',
      type: 'info'
    });
  } catch (error) {
    console.error('无法显示对话框:', error);
    alert('这是一个消息 (使用浏览器原生对话框)');
  }
}
</script>
