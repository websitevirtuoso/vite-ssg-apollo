import { Router, RouteRecordRaw } from 'vue-router'

const layoutRoute: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  component: () => import('./layouts/Auth.vue'),
}

const childrenRoutes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('./pages/Login.vue'),
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    component: () => import('./pages/ForgotPassword.vue'),
  },
  {
    name: 'update-password',
    path: '/update-password/:token/email/:email/',
    component: () => import('./pages/UpdatePassword.vue'),
  },
]

export default (router: Router) => {
  router.addRoute(layoutRoute)
  childrenRoutes.forEach((route) => router.addRoute('auth', route))
}
