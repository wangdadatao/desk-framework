<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">文档</h2>
    <div class="p-6 border rounded-lg bg-card">
      <p class="text-lg">这里将显示应用的文档列表。</p>
      <div class="mt-4 space-y-2">
        <div v-for="doc in documents" :key="doc.id" 
             class="p-4 border rounded-lg flex items-center justify-between hover:bg-secondary/40 cursor-pointer">
          <div class="flex items-center gap-3">
            <FileTextIcon class="h-5 w-5 text-primary" />
            <div>
              <p class="font-medium">{{ doc.name }}</p>
              <p class="text-xs text-muted-foreground">{{ doc.updated }}</p>
            </div>
          </div>
          <FileIcon class="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FileTextIcon, FileIcon } from 'lucide-vue-next'

const documents = [
  { id: 1, name: '项目计划.docx', updated: '昨天更新' },
  { id: 2, name: '财务报表.xlsx', updated: '3天前更新' },
  { id: 3, name: '用户手册.pdf', updated: '上周更新' },
  { id: 4, name: '会议记录.docx', updated: '2周前更新' },
]
</script>
