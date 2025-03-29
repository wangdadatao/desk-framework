import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import StatisticsPage from '../pages/StatisticsPage.vue'
import DocumentsPage from '../pages/DocumentsPage.vue'
import UsersPage from '../pages/UsersPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'

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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
