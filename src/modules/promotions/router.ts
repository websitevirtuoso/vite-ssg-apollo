import { Router, RouteRecordName, RouteRecordRaw } from 'vue-router'

const modulePromotionRoutes: Array<RouteRecordRaw> = [
  {
    name: 'promos',
    path: '/promotions',
    component: () => import('./pages/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Promotions',
        parent: 'home',
      },
      permission: 'promo.view',
    },
  },
  {
    name: 'promo-create',
    path: '/promotions/create',
    component: () => import('./pages/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
      },
      permission: 'promo.upsert',
    },
  },
  {
    name: 'promo-update',
    path: '/promotions/:id(\\d+)/update',
    component: () => import('./pages/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'promotions',
      },
      permission: 'promo.upsert',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  modulePromotionRoutes.forEach((route) => router.addRoute(parentName, route))
}
