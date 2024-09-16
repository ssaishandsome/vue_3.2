import { createRouter, createWebHashHistory } from 'vue-router'


// 导入路由实例，注册路由实例

const routes = [
    {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
    redirect:'/users',//重定向
    children:[
      {
        path:'users',
        name:'users',
        component:()=> import('@/views/users/index.vue')
      },
      {
        path:'roles',
        name:'roles',
        component:()=> import('@/views/roles/index.vue')
      },
      {
        path:'projects',
        name:'projects',
        component:()=> import('@/views/projects/index.vue')
      },
      {
        path:'computed',
        name:'computed',
        component:()=> import('@/views/computed/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
