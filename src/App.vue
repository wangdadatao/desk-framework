<template>
  <div class="h-screen w-full flex flex-col overflow-hidden bg-background text-foreground">
    <!-- 自定义标题栏 -->
    <TitleBar />
    
    <div class="flex flex-1 overflow-hidden">
      <!-- 侧边菜单 -->
      <SidebarMenu />
      
      <!-- 主内容区域 -->
      <div class="flex-1 flex flex-col overflow-hidden">        
        <!-- 页面内容区域 -->
        <div class="flex-1 overflow-auto p-6">
          <div class="mx-auto max-w-5xl">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from './store'
import SidebarMenu from './components/SidebarMenu.vue'
import TitleBar from './components/TitleBar.vue'

const settingsStore = useSettingsStore()

onMounted(async () => {
  // 加载设置并应用主题
  await settingsStore.loadSettings()
})
</script>
