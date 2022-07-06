import { Router, RouteRecordName, RouteRecordRaw } from 'vue-router'

const moduleRoute: RouteRecordRaw = {
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
