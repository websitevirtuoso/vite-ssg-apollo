import { App, createApp } from 'vue'
import Notification from './Notification.vue'
import { DefaultOptions, notificationInjectionKey } from './types'
import { Vuetify } from 'vue'

export default {
  install: (app: App, vuetify: Vuetify, options: DefaultOptions): void => {
    // @ts-expect-error for props
    const notification = createApp(Notification, options).use(vuetify)
    // inserting to dom
    const wrapper = document.createElement('div')
    const component = notification.mount(wrapper)

    if (document.body) {
      document.body.appendChild(wrapper)
    }
    // @ts-expect-error for props
    app.provide(notificationInjectionKey, component)
  },
}
