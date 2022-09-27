import i18n from '@/plugins/i18n'
import { object, string } from 'yup'

export default () => {
  return object({
    first_name: string().required().label(i18n.global.t('messages.first_name')),
    last_name: string().required().label(i18n.global.t('messages.last_name')),
    email: string().required().email().label(i18n.global.t('messages.email')),
    subject: string().required().label(i18n.global.t('messages.subject')),
    message: string().required().label(i18n.global.t('messages.message')),

    phone: string().optional().nullable().label(i18n.global.t('messages.phone')),
    address: string().optional().nullable().label(i18n.global.t('messages.address')),
  })
}
