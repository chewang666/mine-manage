import TableLayout from 'element-plus/es/components/table/src/table-layout'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children:[ //放到主体区域(除了Header和Aside之外的)展示的路由
      {
        path: '/home',
        component: () => import('../components/Home.vue')
      },
      {
        path: '/staff',
        component: () => import('../components/manage/staff.vue')
      },
      {
        path: '/shovel',
        component: () => import('../components/manage/shovel.vue')
      },
      {
        path: '/truck',
        component: () => import('../components/manage/truck.vue')
      },
      {
        path: '/plan',
        component: () => import('../components/manage/plan.vue')
      },
      {
        path: '/device',
        component: () => import('../components/manage/device.vue')
      },
    ]
  },
  { 
    path: '/login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
