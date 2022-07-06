import { Router, RouteRecordRaw } from 'vue-router'

const moduleRoute: RouteRecordRaw = {
  name: 'login',
  path: '/login',
  component: () => import('./pages/Login.vue'),
}

export default (router: Router) => {
  router.addRoute(moduleRoute)
}
