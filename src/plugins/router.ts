import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/Login.vue'),
      meta: {
        layout: 'Auth',
      },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
      meta: {
        layout: 'Authorized',
      },
    },
    {
      name: 'access-denied',
      path: '/access-denied',
      component: () => import('@/pages/AccessDenied.vue'),
      meta: {
        layout: 'ErrorPage',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('@/pages/PageNotFound.vue'),
      meta: {
        layout: 'ErrorPage',
      },
    },
  ],
})
