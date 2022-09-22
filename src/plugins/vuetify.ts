import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    VInput: {
      variant: 'underlined',
    },
    VTextField: {
      variant: 'underlined',
    },
    VCombobox: {
      VChip: {
        density: 'comfortable',
      },
    },
    VTextarea: {
      variant: 'underlined',
    },
    VCard: { elevation: '3' },
    VCardActions: { VBtn: { variant: 'flat' } },
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
