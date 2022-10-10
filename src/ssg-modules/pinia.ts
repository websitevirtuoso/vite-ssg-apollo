import { createPinia } from 'pinia'
import type { UserModule } from '@/types/vite-ssg-types'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia().use(piniaPluginPersistedstate)
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient) {
    pinia.state.value = initialState.pinia || {}
  } else {
    initialState.pinia = pinia.state.value
  }
}
