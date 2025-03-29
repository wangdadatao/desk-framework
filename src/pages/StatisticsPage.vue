<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">统计数据</h2>
    <div class="p-6 border rounded-lg bg-card">
      <p class="text-lg">这里将显示应用的统计数据。</p>
      <div class="h-64 mt-4 bg-secondary/40 rounded-lg flex items-center justify-center">
        <BarChart3Icon class="h-12 w-12 text-muted-foreground/50" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { BarChart3Icon } from 'lucide-vue-next'
</script>
