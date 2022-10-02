import { Router, RouteRecordName, RouteRecordRaw } from 'vue-router'

const moduleListingTypesRoutes: Array<RouteRecordRaw> = [
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

const moduleListingRoutes = [
  {
    name: 'listings',
    path: '/listings',
    component: () => import('./pages/listings/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Listing',
        parent: 'home',
      },
      permission: 'listing.view',
    },
  },
  {
    name: 'listing-create',
    path: '/listing/create',
    component: () => import('./pages/listings/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
        parent: 'listing',
      },
      permission: 'listing.upsert',
    },
  },
  {
    name: 'listing-update',
    path: '/listing/:id/update',
    component: () => import('./pages/listings/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'listing',
      },
      permission: 'listing.upsert',
    },
  },
  {
    name: 'listing-view',
    path: '/listings/:id/view',
    component: () => import('./pages/listings/View.vue'),
    meta: {
      breadcrumb: {
        label: 'View',
        parent: 'listing',
      },
      permission: 'listing.view',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  ;[...moduleListingTermRoutes, ...moduleListingTypesRoutes, ...moduleListingRoutes].forEach((route) => router.addRoute(parentName, route))
}
