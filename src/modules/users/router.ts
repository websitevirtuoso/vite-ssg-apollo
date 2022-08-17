import { Router, RouteRecordName, RouteRecordRaw } from 'vue-router'

const moduleRoutes: Array<RouteRecordRaw> = [
  {
    name: 'users',
    path: '/users',
    component: () => import('./pages/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Users',
        parent: 'home',
      },
      permission: 'user.view',
    },
  },
  {
    name: 'user-create',
    path: '/users/create',
    component: () => import('./pages/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
        parent: 'user',
      },
      permission: 'user.upsert',
    },
  },
  {
    name: 'user-update',
    path: '/users/:id(\\d+)/update',
    component: () => import('./pages/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'user',
      },
      permission: 'user.upsert',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  moduleRoutes.forEach((route) => router.addRoute(parentName, route))
}
