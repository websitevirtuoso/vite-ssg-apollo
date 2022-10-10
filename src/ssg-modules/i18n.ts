import { createI18n } from 'vue-i18n'
import type { UserModule } from '@/types/vite-ssg-types'
import en from '../locales/en.json'

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en,
    },
  })

  app.use(i18n)
}
