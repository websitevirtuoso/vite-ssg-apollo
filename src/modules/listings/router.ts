import { Router, RouteRecordName } from 'vue-router'

const moduleListingTypesRoutes = [
  {
    name: 'listing-types',
    path: '/listings/types',
    component: () => import('./pages/types/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Listing Types',
        parent: 'home',
      },
      permission: 'listing_type.view',
    },
  },
  {
    name: 'listing-type-update',
    path: '/listings/types/:id(\\d+)/update',
    component: () => import('./pages/types/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
      },
      permission: 'listing_type.update',
    },
  },
]

const moduleListingTermRoutes = [
  {
    name: 'listing-terms',
    path: '/listings/terms',
    component: () => import('./pages/terms/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Listing Terms',
        parent: 'home',
      },
      permission: 'listing_term.view',
    },
  },
  {
    name: 'listing-term-update',
    path: '/listings/terms/:id(\\d+)/update',
    component: () => import('./pages/terms/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
      },
      permission: 'listing_term.update',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  ;[...moduleListingTermRoutes, ...moduleListingTypesRoutes].forEach((route) => router.addRoute(parentName, route))
}
