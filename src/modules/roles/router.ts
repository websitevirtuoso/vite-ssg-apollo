import { Router, RouteRecordName, RouteRecordRaw } from 'vue-router'

const moduleRoutes: Array<RouteRecordRaw> = [
  {
    name: 'roles',
    path: '/roles',
    component: () => import('./pages/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Roles',
        parent: 'home',
      },
      permission: 'role.view',
    },
  },
  {
    name: 'role-create',
    path: '/roles/create',
    component: () => import('./pages/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
        parent: 'role',
      },
      permission: 'role.upsert',
    },
  },
  {
    name: 'role-update',
    path: '/roles/:id(\\d+)/update',
    component: () => import('./pages/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'role',
      },
      permission: 'role.upsert',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  moduleRoutes.forEach((route) => router.addRoute(parentName, route))
}
