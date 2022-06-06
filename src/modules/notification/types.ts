import { InjectionKey } from 'vue'

export enum TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export interface DefaultOptions {
  defaultColor?: string
  defaultMultiLine?: boolean
  defaultTimeout?: number
}

export interface Options {
  multiLine?: boolean
  timeout?: number
}

/**
 * Display a notification
 */
interface NotificationMethod<T extends TYPE = TYPE> {
  /**
   * @param content Notification content.
   * @param options Notification configuration
   */
  (content: string, options?: Options): void
}

export interface Notification extends NotificationMethod {
  /**
   * Display a success notification
   */
  success: NotificationMethod<TYPE.SUCCESS>
  /**
   * Display an info notification
   */
  info: NotificationMethod<TYPE.INFO>
  /**
   * Display an error notification
   */
  error: NotificationMethod<TYPE.ERROR>
}

export const notificationInjectionKey: InjectionKey<Notification> = Symbol('VNotification')
