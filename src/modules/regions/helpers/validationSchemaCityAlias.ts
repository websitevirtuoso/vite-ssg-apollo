import { object, string } from 'yup'
import { tDefinition } from '@/types/i18n'

export default (t: tDefinition) => {
  return object({
    name: string().required().label(t('messages.name')),
    country_id: string().required().label(t('messages.country')),
    state_id: string().required().label(t('messages.state')),
    city_id: string().required().label(t('messages.city')),
  })
}