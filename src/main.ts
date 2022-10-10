import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
// import { createApp } from 'vue'
// import vuetify from './plugins/vuetify'
import router from './plugins/router'
// import i18n from './plugins/i18n'
// import { createHead } from '@vueuse/head'
// // import { loadFonts } from './plugins/webfontloader'
// import { apolloPublicClient, apolloDefaultClient } from '@/plugins/apollo/vue-apollo'
// import { ApolloClients } from '@vue/apollo-composable'
// import Notifications from '@/modules/notifications/main'
// import { abilitiesPlugin } from '@casl/vue'
// import ability from '@/modules/auth/utils/ability'
// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// // import VueGoogleMaps from '@fawmi/vue-google-maps'
// // @ts-expect-error for declaration this module
// import breadcrumbs from 'vue-3-breadcrumbs'
import '@/styles/styles.scss'

// load modules
import './loaded-modules'

// loadFonts().then()

// vite approach
// createApp(App)
//   .provide(ApolloClients, {
//     default: apolloDefaultClient,
//     public: apolloPublicClient,
//   })
//   .use(i18n)
//   .use(createPinia().use(piniaPluginPersistedstate))
//   .use(router)
//   .use(vuetify)
//   .use(Notifications, vuetify, { defaultTimeout: 5000 })
//   .use(breadcrumbs)
//   .use(abilitiesPlugin, ability, { useGlobalProperties: true })
//   .use(createHead())
//   .use(VueGoogleMaps, { load: { key: import.meta.env.VITE_GOOGLE_API_KEY, libraries: 'places' } })
//   .mount('#app')

// export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
//   // install all modules under `modules/`
//   Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })).forEach((i) => i.install?.(ctx))
// })

// todo this approach doesn't work
// const createApp = ViteSSG(
//   // the root component
//   App,
//   // vue-router options
//   { routes: router.getRoutes(), base: import.meta.env.BASE_URL },
//   // function to have custom setups
//   ({ app, router, routes, isClient, initialState }) => {
//     // install plugins etc.
//     app
//       .provide(ApolloClients, {
//         default: apolloDefaultClient,
//         public: apolloPublicClient,
//       })
//       .use(i18n)
//       .use(createPinia().use(piniaPluginPersistedstate))
//       .use(router)
//       .use(vuetify)
//       .use(Notifications, vuetify, { defaultTimeout: 5000 })
//       .use(breadcrumbs)
//       .use(abilitiesPlugin, ability, { useGlobalProperties: true })
//       .use(createHead())
//     // .use(VueGoogleMaps, { load: { key: import.meta.env.VITE_GOOGLE_API_KEY, libraries: 'places' } })
//
//     // if (import.meta.env.SSR) {
//     //   // Set initial state during server side
//     //   initialState.data = { cats: 2, dogs: 3 }
//     // } else {
//     //   // Restore or read the initial state on the client side in the browser
//     //   console.log(initialState.data) // => { cats: 2, dogs: 3 }
//     // }
//   }
// )
// createApp().then()

const routes = router.getRoutes()

// todo checking this variant
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  // install all modules under `**/modules/`
  Object.values(import.meta.globEager('./**/ssg-modules/*.ts')).forEach((i) => i.install?.(ctx))
})

// createApp(App)
// .provide(ApolloClients, {
//   default: apolloDefaultClient,
//   public: apolloPublicClient,
// })
// .use(i18n)
// .use(createPinia().use(piniaPluginPersistedstate))
// .use(router)
// .use(vuetify)
// .use(Notifications, vuetify, { defaultTimeout: 5000 })
// .use(breadcrumbs)
// .use(abilitiesPlugin, ability, { useGlobalProperties: true })
// .use(createHead())
// .use(VueGoogleMaps, { load: { key: import.meta.env.VITE_GOOGLE_API_KEY, libraries: 'places' } })
// .mount('#app')
