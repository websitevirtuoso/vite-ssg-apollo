import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import i18n from './plugins/i18n'
import { createHead } from '@vueuse/head'
import { loadFonts } from './plugins/webfontloader'
import { apolloPublicClient, apolloDefaultClient } from '@/plugins/apollo/vue-apollo'
import { ApolloClients } from '@vue/apollo-composable'
import Notifications from '@/modules/notifications/main'
import { abilitiesPlugin } from '@casl/vue'
import ability from '@/modules/auth/utils/ability'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueGoogleMaps from '@fawmi/vue-google-maps'
// @ts-expect-error for declaration this module
import breadcrumbs from 'vue-3-breadcrumbs'
import '@/styles/styles.sass'

// load modules
import './loaded-modules'

loadFonts().then()

createApp(App)
  .provide(ApolloClients, {
    default: apolloDefaultClient,
    public: apolloPublicClient,
  })
  .use(i18n)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .use(vuetify)
  .use(Notifications, vuetify, { defaultTimeout: 5000 })
  .use(breadcrumbs)
  .use(abilitiesPlugin, ability, { useGlobalProperties: true })
  .use(createHead())
  .use(VueGoogleMaps, { load: { key: import.meta.env.VITE_GOOGLE_API_KEY, libraries: 'places' } })
  .mount('#app')
