import { Router, RouteRecordName } from 'vue-router'

const moduleRoutes = [
  {
    name: 'states',
    path: '/states',
    component: () => import('./pages/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'States',
        parent: 'home',
      },
      permission: 'state.view',
    },
  },
  {
    name: 'state-create',
    path: '/states/create',
    component: () => import('./pages/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
      },
      permission: 'state.upsert',
    },
  },
  {
    name: 'state-update',
    path: '/states/:id(\\d+)/update',
    component: () => import('./pages/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'states',
      },
      permission: 'state.upsert',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  moduleRoutes.forEach((route) => router.addRoute(parentName, route))
}
