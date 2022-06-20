import { Router, RouteRecordName } from 'vue-router'

const moduleRoute = {
  name: 'countries',
  path: '/countries',
  component: () => import('./pages/Index.vue'),
  meta: {
    breadcrumb: {
      label: 'Countries',
      parent: 'home',
    },
    permission: 'country.view',
  },
}

export default (router: Router, parentName: RouteRecordName) => {
  router.addRoute(parentName, moduleRoute)
}
