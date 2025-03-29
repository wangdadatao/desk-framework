<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">用户管理</h2>
    <div class="p-6 border rounded-lg bg-card">
      <p class="text-lg">这里将显示用户列表。</p>
      <div class="mt-4 overflow-hidden border rounded-lg">
        <table class="min-w-full divide-y divide-border">
          <thead class="bg-muted">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                姓名
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                职位
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-card divide-y divide-border">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {{ user.initials }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium">{{ user.name }}</div>
                    <div class="text-sm text-muted-foreground">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">{{ user.role }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                      :class="user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ user.active ? '活跃' : '离线' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                <button class="text-primary hover:text-primary/80">编辑</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UsersIcon } from 'lucide-vue-next'

const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', active: true, initials: '张' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '开发者', active: true, initials: '李' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '设计师', active: false, initials: '王' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '测试员', active: true, initials: '赵' },
]
</script>
