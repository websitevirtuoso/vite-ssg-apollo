import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layouts/Index.vue'),
      children: [
        {
          name: 'home',
          path: '/home',
          // Relative to /src/views
          component: () => import('@/pages/Home.vue'),
          meta: {
            breadcrumb: 'Home',
          },
        },
      ],
    },
    {
      name: 'error',
      path: '/error',
      component: () => import('@/components/layouts/ErrorPage.vue'),
      children: [
        {
          name: 'denied',
          path: '/access-denied',
          component: () => import('@/pages/AccessDenied.vue'),
        },
      ],
    },
    {
      path: '',
      component: () => import('@/components/layouts/ErrorPage.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/pages/PageNotFound.vue'),
        },
      ],
    },
  ],
})
