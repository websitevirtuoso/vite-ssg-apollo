import type { UserModule } from '@/types/vite-ssg-types'
import { createHead } from '@vueuse/head'

export const install: UserModule = ({ app }) => {
  app.use(createHead())
}
