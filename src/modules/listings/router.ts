import { Router, RouteRecordName } from 'vue-router'

const moduleRoutes = [
  {
    name: 'listing-types',
    path: '/listings/types',
    component: () => import('./pages/types/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Listing types',
        parent: 'home',
      },
      permission: 'listing_type.view',
    },
  },
  {
    name: 'listing-type-update',
    path: '/listings/types/:id/update',
    component: () => import('./pages/types/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'role',
      },
      permission: 'listing_type.update',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  moduleRoutes.forEach((route) => router.addRoute(parentName, route))
}
