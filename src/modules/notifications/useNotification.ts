import { inject } from 'vue'
import { notificationInjectionKey } from './types'

const useNotification = () => {
  const notification = inject(notificationInjectionKey)
  if (!notification) {
    throw new Error(`Plugin ${notificationInjectionKey.toString()} Not initialized`)
  }

  return notification
}
export { useNotification }
