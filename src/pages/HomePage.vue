<template>
  <div class="space-y-6">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
        <div class="flex items-center gap-2">
          <UsersIcon class="h-4 w-4 text-muted-foreground" />
          <span class="text-sm font-medium">{{ $t('dashboard.totalUsers') }}</span>
        </div>
        <div class="text-2xl font-bold mt-2">1,294</div>
        <div class="text-xs text-muted-foreground mt-1">+12.5% {{ $t('common.from') }} {{ $t('common.lastMonth') }}</div>
      </div>
      
      <div class="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
        <div class="flex items-center gap-2">
          <ActivityIcon class="h-4 w-4 text-muted-foreground" />
          <span class="text-sm font-medium">{{ $t('dashboard.activity') }}</span>
        </div>
        <div class="text-2xl font-bold mt-2">82.4%</div>
        <div class="text-xs text-muted-foreground mt-1">+2.1% {{ $t('common.from') }} {{ $t('common.lastWeek') }}</div>
      </div>
      
      <div class="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
        <div class="flex items-center gap-2">
          <DownloadIcon class="h-4 w-4 text-muted-foreground" />
          <span class="text-sm font-medium">{{ $t('dashboard.downloads') }}</span>
        </div>
        <div class="text-2xl font-bold mt-2">4,856</div>
        <div class="text-xs text-muted-foreground mt-1">+32.4% {{ $t('common.from') }} {{ $t('common.lastMonth') }}</div>
      </div>
      
      <div class="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
        <div class="flex items-center gap-2">
          <DollarSignIcon class="h-4 w-4 text-muted-foreground" />
          <span class="text-sm font-medium">{{ $t('dashboard.revenue') }}</span>
        </div>
        <div class="text-2xl font-bold mt-2">$12,543</div>
        <div class="text-xs text-muted-foreground mt-1">+8.2% {{ $t('common.from') }} {{ $t('common.lastMonth') }}</div>
      </div>
    </div>
    
    <div class="grid gap-4 md:grid-cols-2">
      <div class="p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h3 class="font-medium mb-4">{{ $t('dashboard.recentActivity') }}</h3>
        <div class="space-y-4">
          <div v-for="(activity, i) in activities" :key="i" class="flex items-start gap-4 pb-3 border-b border-border/40 last:border-0 last:pb-0">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <component :is="activity.icon" class="h-4 w-4" />
            </div>
            <div>
              <p class="text-sm font-medium">{{ activity.title }}</p>
              <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h3 class="font-medium mb-4">{{ $t('dashboard.tauriInfo') }}</h3>
        <TauriInfo />
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  UsersIcon, 
  ActivityIcon, 
  DownloadIcon, 
  DollarSignIcon, 
  FileTextIcon, 
  SettingsIcon, 
  FileIcon 
} from 'lucide-vue-next'
import TauriInfo from '../components/TauriInfo.vue'

// 活动数据
const activities = [
  { title: '更新了用户设置', time: '10分钟前', icon: SettingsIcon },
  { title: '下载了报告文件', time: '1小时前', icon: FileIcon },
  { title: '创建了新文档', time: '昨天 15:30', icon: FileTextIcon },
  { title: '修改了系统设置', time: '2天前', icon: SettingsIcon },
];
</script>
