import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import i18n from './plugins/i18n'
// import apollo from './plugins/vue-apollo'
import { loadFonts } from './plugins/webfontloader'

loadFonts().then()

import categoriesModule from './modules/category/index'
import { registerModules } from './register-modules'

registerModules({
  categoriesModule,
})

createApp(App).use(i18n).use(router).use(vuetify).mount('#app')