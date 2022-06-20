import { Router, RouteRecordName } from 'vue-router'

const moduleStatesRoutes = [
  {
    name: 'states',
    path: '/states',
    component: () => import('./pages/states/Index.vue'),
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
    component: () => import('./pages/states/Create.vue'),
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
    component: () => import('./pages/states/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'states',
      },
      permission: 'state.upsert',
    },
  },
]

const moduleCountryRoute = [
  {
    name: 'countries',
    path: '/countries',
    component: () => import('./pages/countries/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Countries',
        parent: 'home',
      },
      permission: 'country.view',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  ;[...moduleCountryRoute, ...moduleStatesRoutes].forEach((route) => router.addRoute(parentName, route))
}
