import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  defaults: {
    VInput: {
      variant: 'underlined',
    },
    VTextField: {
      variant: 'underlined',
    },
    VCardActions: { VBtn: { variant: 'contained-flat' } },
  },
  defaultTheme: 'light',
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867c0',
          secondary: '#5CBBF6',
          tertiary: '#E57373',
          accent: '#005CAF',
        },
      },
    },
  },
})
