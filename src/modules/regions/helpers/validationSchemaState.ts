import i18n from '@/plugins/i18n'
import { object, string } from 'yup'

export default () => {
  return object({
    name: string().required().label(i18n.global.t('messages.name')),
    code: string().required().max(10).label(i18n.global.t('messages.code')),
    country_id: string().required().label(i18n.global.t('messages.country')),
  })
}
