import router from './plugins/router'

const registerModule = (module) => {
  if (module.router) {
    module.router(router, 'root')
  }
}

export const registerModules = (modules) => {
  Object.keys(modules).forEach((moduleKey) => {
    registerModule(modules[moduleKey])
  })
}
