import { Router, RouteRecordName } from 'vue-router'

const moduleRoute = {
  name: 'permissions',
  path: '/permissions',
  component: () => import('./pages/Index.vue'),
  meta: {
    breadcrumb: {
      label: 'Permissions',
      parent: 'home',
    },
    permission: 'permission.view',
  },
}

export default (router: Router, parentName: RouteRecordName) => {
  router.addRoute(parentName, moduleRoute)
}
