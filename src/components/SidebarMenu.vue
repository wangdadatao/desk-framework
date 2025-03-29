<template>
  <div class="h-full border-r border-border/40 w-64 p-3 flex flex-col select-none" 
       :class="isDark ? 'bg-[#1e1e1e]' : 'bg-[rgb(245,245,245)]'">
    <!-- App Logo/Title -->
    <div class="flex items-center justify-center py-4">
      <h2 class="font-semibold text-lg">Desk Framework</h2>
    </div>

    <!-- Menu Items -->
    <nav class="mt-6 flex-1">
      <ul class="space-y-1">
        <li v-for="route in routes" :key="route.name">
          <router-link 
            :to="route.path" 
            v-slot="{ isActive }"
            custom
          >
            <button 
              class="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 select-none"
              :class="[
                isActive ? 'bg-primary/10 text-primary' : '', 
                isDark ? 'hover:bg-[rgba(255,255,255,0.1)]' : 'hover:bg-white/80'
              ]"
              @click="$router.push(route.path)"
            >
              <component :is="getIcon(route.meta.icon)" class="w-5 h-5" />
              <span>{{ $t(route.meta.title) }}</span>
            </button>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Bottom Section with Status -->
    <div class="border-t border-border/40 pt-3">
      <div class="px-3 text-sm text-muted-foreground flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-green-500"></div>
        <span>{{ $t('common.online') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as LucideIcons from 'lucide-vue-next'
import { useTheme } from '../lib/useTheme'

const router = useRouter()
const { isDark } = useTheme()

const routes = computed(() => 
  router.options.routes.filter(route => route.meta && route.meta.title)
)

function getIcon(iconName) {
  return LucideIcons[iconName] || LucideIcons.FileIcon
}
</script>

<style scoped>
/* 防止文本选中 */
.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
