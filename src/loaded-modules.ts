import errorsModule from './modules/errors/index'
import categoriesModule from './modules/categories/index'
import postsModule from './modules/posts/index'
import regionsModule from './modules/regions/index'
import permissionModule from './modules/permissions/index'
import roleModule from './modules/roles/index'
import listingModule from './modules/listings/index'
import loginModule from './modules/auth/index'
import { registerModules } from '@/register-modules'

// register all modules with extra params
registerModules({
  errorsModule,
  loginModule,
  categoriesModule,
  postsModule,
  regionsModule,
  permissionModule,
  roleModule,
  listingModule,
})
