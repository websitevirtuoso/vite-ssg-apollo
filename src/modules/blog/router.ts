import { Router, RouteRecordName } from 'vue-router'

const moduleCategoriesRoutes = [
  {
    name: 'categories',
    path: '/categories',
    component: () => import('./pages/categories/Index.vue'),
    meta: {
      breadcrumb: {
        label: 'Categories',
      },
      permission: 'category.view',
    },
  },
  {
    name: 'category-create',
    path: '/categories/create',
    component: () => import('./pages/categories/Create.vue'),
    meta: {
      breadcrumb: {
        label: 'Create',
      },
      permission: 'category.upsert',
    },
  },
  {
    name: 'category-update',
    path: '/categories/:id(\\d+)/update',
    component: () => import('./pages/categories/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
        parent: 'categories',
      },
      permission: 'category.upsert',
    },
  },
]

const modulePostsRoutes = [
  {
    name: 'posts',
    path: '/posts',
    component: () => import('./pages/posts/Index.vue'),
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
    component: () => import('./pages/posts/Create.vue'),
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
    component: () => import('./pages/posts/Update.vue'),
    meta: {
      breadcrumb: {
        label: 'Update',
      },
      permission: 'post.upsert',
    },
  },
]

export default (router: Router, parentName: RouteRecordName) => {
  ;[...moduleCategoriesRoutes, ...modulePostsRoutes].forEach((route) => router.addRoute(parentName, route))
}
