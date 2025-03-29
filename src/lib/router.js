import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import StatisticsPage from '../pages/StatisticsPage.vue'
import DocumentsPage from '../pages/DocumentsPage.vue'
import UsersPage from '../pages/UsersPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'

/**
 * 应用路由配置
 * 每个路由项可以包含:
 * - path: 路由路径
 * - name: 路由名称
 * - component: 对应的组件
 * - meta: 元数据，用于菜单显示等
 *   - title: 显示的标题 (i18n键)
 *   - icon: 图标名称 (Lucide图标)
 */
const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomePage,
    meta: { title: 'menu.dashboard', icon: 'HomeIcon' }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsPage,
    meta: { title: 'menu.statistics', icon: 'BarChart3Icon' }
  },
  {
    path: '/documents',
    name: 'documents',
    component: DocumentsPage,
    meta: { title: 'menu.documents', icon: 'FileTextIcon' }
  },
  {
    path: '/users',
    name: 'users',
    component: UsersPage,
    meta: { title: 'menu.users', icon: 'UsersIcon' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
    meta: { title: 'menu.settings', icon: 'SettingsIcon' }
  }
]

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
