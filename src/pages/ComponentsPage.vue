<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold">组件库</h1>
    <p class="text-muted-foreground">这个页面展示了框架中所有可用的组件。</p>
    
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">卡片组件</h2>
      <div class="grid grid-cols-2 gap-4">
        <Card>
          <template #header>
            <h3 class="font-medium">基础卡片</h3>
          </template>
          <p>这是一个基础卡片组件，可用于展示信息。</p>
        </Card>
        
        <Card>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="font-medium">带操作的卡片</h3>
              <button class="text-muted-foreground hover:text-foreground">
                <DotsHorizontalIcon class="h-4 w-4" />
              </button>
            </div>
          </template>
          <p>这个卡片在标题栏有一个操作按钮。</p>
          <template #footer>
            <div class="flex justify-end">
              <button class="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">
                操作
              </button>
            </div>
          </template>
        </Card>
      </div>
    </section>
    
    <!-- 更多组件示例... -->
  </div>
</template>

<script setup>
import Card from '../components/ui/Card.vue'
import { DotsHorizontalIcon } from 'lucide-vue-next'
</script>
