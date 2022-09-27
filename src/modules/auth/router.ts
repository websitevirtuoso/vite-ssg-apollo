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
    name: 'register',
    path: '/register',
    component: () => import('./pages/Registration.vue'),
  },
  {
    name: 'verification',
    path: '/verification',
    component: () => import('./pages/Verification.vue'),
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
  {
    name: 'contact-us',
    path: '/contact-us',
    component: () => import('./pages/ContactUs.vue'),
  },
]

export default (router: Router) => {
  router.addRoute(layoutRoute)
  childrenRoutes.forEach((route) => router.addRoute('auth', route))
}
