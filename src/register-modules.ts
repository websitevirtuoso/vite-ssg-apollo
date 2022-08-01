import router from './plugins/router'
import { Router, RouteRecordName } from 'vue-router'

export interface Module {
  module: {
    router: (router: Router, parentName?: RouteRecordName) => void
  }
  routerOptions?: {
    parentName: string
  }
}

const registerModule = (module: Module) => {
  if (module.module.router) {
    if (module?.routerOptions?.parentName === undefined) {
      module.module.router(router)
    } else {
      module.module.router(router, module.routerOptions.parentName)
    }
  }
}

export const registerModules = (modules: Module[]) => {
  modules.forEach((module) => {
    registerModule(module)
  })
}
