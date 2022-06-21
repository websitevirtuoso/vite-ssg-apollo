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

const moduleCitiesRoutes = [
  {
    name: 'cities',
    path: '/cities',
    component: () => import('./pages/cities/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Cities',
      },
      permission: 'city.view',
    },
  },
  {
    name: 'city-create',
    path: '/cities/create',
    component: () => import('./pages/cities/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
      },
      permission: 'city.upsert',
    },
  },
  {
    name: 'city-update',
    path: '/cities/:id(\\d+)/update',
    component: () => import('./pages/cities/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
      },
      permission: 'city.upsert',
    },
  },
]

const moduleCityAliasesRoutes = [
  {
    name: 'city-aliases',
    path: '/city-aliases',
    component: () => import('./pages/city_aliases/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'City Aliases',
        parent: 'home',
      },
      permission: 'city_alias.view',
    },
  },
  {
    name: 'city-alias-create',
    path: '/city-aliases/create',
    component: () => import('./pages/city_aliases/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
      },
      permission: 'city_alias.upsert',
    },
  },
  {
    name: 'city-alias-update',
    path: '/city-aliases/:id(\\d+)/update',
    component: () => import('./pages/city_aliases/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update alias',
      },
      permission: 'city_alias.upsert',
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
  ;[...moduleCountryRoute, ...moduleStatesRoutes, ...moduleCitiesRoutes, ...moduleCityAliasesRoutes].forEach((route) =>
    router.addRoute(parentName, route)
  )
}
