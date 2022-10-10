import 'vuetify/styles'
import type { UserModule } from '@/types/vite-ssg-types'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export const vuetify = createVuetify({
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

export const install: UserModule = ({ app }) => {
  app.use(vuetify)
}
