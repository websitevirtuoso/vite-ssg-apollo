import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../components/layouts/Index.vue'),
      children: [],
    },
    {
      name: 'error',
      path: '/error',
      component: () => import('../components/layouts/ErrorPage.vue'),
      children: [
        {
          name: 'denied',
          path: '/access-denied',
          component: () => import('../page/AccessDenied.vue'),
        },
      ],
    },
    {
      path: '',
      component: () => import('../components/layouts/ErrorPage.vue'),
      children: [
        {
          path: '/:catchAll(.*)',
          name: '404',
          component: () => import('../page/PageNotFound.vue'),
        },
      ],
    },
  ],
})
