import { Router, RouteRecordName } from 'vue-router'

const moduleRoutes = [
  {
    name: 'posts',
    path: '/posts',
    component: () => import('./pages/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Posts',
      },
      permission: 'post.view',
    },
  },
  {
    name: 'post-create',
    path: '/posts/create',
    component: () => import('./pages/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
      },
      permission: 'post.upsert',
    },
  },
  {
    name: 'post-update',
    path: '/posts/:id(\\d+)/update',
    component: () => import('./pages/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
      },
      permission: 'post.upsert',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  moduleRoutes.forEach((route) => router.addRoute(parentName, route))
}
