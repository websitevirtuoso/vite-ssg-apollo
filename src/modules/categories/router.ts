import { Router, RouteRecordName } from 'vue-router'

const moduleRoutes = [
  {
    name: 'categories',
    path: '/categories',
    component: () => import('./pages/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Categories',
      },
      permission: 'category.view',
    },
  },
  {
    name: 'category-create',
    path: '/categories/create',
    component: () => import('./pages/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
      },
      permission: 'category.upsert',
    },
  },
  {
    name: 'category-update',
    path: '/categories/:id(\\d+)/update',
    component: () => import('./pages/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'categories',
      },
      permission: 'category.upsert',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  moduleRoutes.forEach((route) => router.addRoute(parentName, route))
}
