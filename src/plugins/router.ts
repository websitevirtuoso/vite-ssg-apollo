import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getTokenTtl, AUTH_TOKEN } from '@/modules/auth/utils/auth'
import ability from '@/modules/auth/utils/ability'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'root',
    component: () => import('@/components/layouts/Authorized.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/Home.vue'),
        meta: {
          breadcrumb: 'Home',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: 'smooth' }), 500)
      })
    )
  },
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['login', 'forgot-password', 'update-password', 'error', 'access-denied', 'page-not-found']

  let authRequired = true
  if (typeof to.name === 'string') {
    authRequired = !publicPages.includes(to.name)
  }

  const user = localStorage.getItem('user')
  const token = localStorage.getItem(AUTH_TOKEN)
  const ttl = getTokenTtl()
  if (authRequired && (!user || !token || ttl <= 0)) {
    next({ name: 'login' })
  }

  // check that user has permission to see page
  if (typeof to.meta.permission === 'string') {
    const [subject, permission] = to.meta.permission.split('.')
    if (!ability.can(permission, subject)) {
      next({ name: 'access-denied' })
    }
  }
  // todo need implement later,  ability to refresh token via gql mutation
  // when ttl < 10 min refresh token
  // if (token && ttl < 600 && ttl > 0) {
  //   refreshToken(apolloClient)
  // }

  next()
})

export default router
