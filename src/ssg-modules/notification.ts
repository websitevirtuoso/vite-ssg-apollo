import type { UserModule } from '@/types/vite-ssg-types'
import Notifications from '@/modules/notifications/main'
import { vuetify } from '@/ssg-modules/vuetify'

export const install: UserModule = ({ app }) => {
  app.use(Notifications, vuetify, { defaultTimeout: 5000 })
}
