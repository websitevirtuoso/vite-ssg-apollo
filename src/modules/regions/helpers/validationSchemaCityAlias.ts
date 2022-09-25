import i18n from '@/plugins/i18n'
import { object, string } from 'yup'

export default () => {
  return object({
    name: string().required().label(i18n.global.t('messages.name')),
    country_id: string().required().label(i18n.global.t('messages.country')),
    state_id: string().required().label(i18n.global.t('messages.state')),
    city_id: string().required().label(i18n.global.t('messages.city')),
  })
}
