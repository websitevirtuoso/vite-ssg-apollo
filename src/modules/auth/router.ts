import { Router } from 'vue-router'

const moduleRoute = {
  name: 'login',
  path: '/login',
  component: () => import('./pages/Login.vue'),
}

export default (router: Router) => {
  router.addRoute(moduleRoute)
}
