import { Router, RouteRecordName } from 'vue-router'

const moduleRoutes = {
  name: 'category',
  path: '/category',
  component: () => import('./pages/Index.vue'),
  meta: {
    breadcrumb: {
      label: 'Category',
      parent: 'home',
    },
    permission: 'category.view',
  },
  children: [
    {
      name: 'category-create',
      path: '/category/create',
      component: () => import('./pages/Create.vue'),
      meta: {
        permission: 'category.create',
      },
    },
    {
      name: 'category-update',
      path: '/category/:id(\\d+)/update',
      component: () => import('./pages/Update.vue'),
      meta: {
        breadcrumb: {
          label: 'Update',
          parent: 'category',
        },
        permission: 'category.update',
      },
    },
  ],
}

export default (router: Router, parentName: RouteRecordName) => {
  router.addRoute(parentName, moduleRoutes)
}
