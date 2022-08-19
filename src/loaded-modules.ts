import errorsModule from './modules/errors/index'
import blogModule from './modules/blog/index'
import regionsModule from './modules/regions/index'
import permissionModule from './modules/permissions/index'
import roleModule from './modules/roles/index'
import listingModule from './modules/listings/index'
import userModule from './modules/users/index'
import authModule from './modules/auth/index'
import promoModule from './modules/promotions/index'
import { Module, registerModules } from '@/register-modules'

// register all modules with extra params
registerModules([
  { module: authModule },
  { module: errorsModule },
  { module: roleModule, routerOptions: { parentName: 'root' } },
  { module: blogModule, routerOptions: { parentName: 'root' } },
  { module: regionsModule, routerOptions: { parentName: 'root' } },
  { module: permissionModule, routerOptions: { parentName: 'root' } },
  { module: listingModule, routerOptions: { parentName: 'root' } },
  { module: userModule, routerOptions: { parentName: 'root' } },
  { module: promoModule, routerOptions: { parentName: 'root' } },
] as Module[])
