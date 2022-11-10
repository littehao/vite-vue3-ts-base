import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue') // 建议进行路由懒加载，优化访问性能
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ "../views/about/index.vue"),
  }
]
const router = createRouter({
  // history: createWebHistory(),    // 使用history模式
  history: createWebHashHistory(),	 // 使用hash模式
  routes
})
export default router
