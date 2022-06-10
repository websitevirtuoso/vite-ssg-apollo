import { Router } from 'vue-router'

const moduleRoute = {
  name: 'error',
  path: '/error',
  component: () => import('./layouts/ErrorPage.vue'),
  children: [
    {
      name: 'access-denied',
      path: '/access-denied',
      component: () => import('./pages/AccessDenied.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('./pages/PageNotFound.vue'),
    },
  ],
}

export default (router: Router) => {
  router.addRoute(moduleRoute)
}
