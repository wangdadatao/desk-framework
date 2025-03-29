<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-muted-foreground">{{ $t('settings.version') }}</p>
        <p class="text-sm font-medium">{{ version }}</p>
      </div>
      <div>
        <p class="text-sm text-muted-foreground">{{ $t('tauriInfo.os') }}</p>
        <p class="text-sm font-medium">{{ osType }}</p>
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
import { ref, onMounted } from 'vue'
import { open } from '@tauri-apps/plugin-dialog'
import { type } from '@tauri-apps/plugin-os'
import { getVersion } from '@tauri-apps/api/app'

const version = ref('加载中...')
const osType = ref('加载中...')

onMounted(async () => {
  try {
    version.value = await getVersion()
    osType.value = await type()
  } catch (error) {
    console.error('无法获取 Tauri 信息:', error)
  }
})

async function showDialog() {
  await open({
    title: '信息',
    message: '这是一个来自 Tauri 的消息!',
    type: 'info'
  })
}
</script>
