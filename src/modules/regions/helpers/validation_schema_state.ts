import { object, string } from 'yup'
import { tDefinition } from '@/types/i18n'

export default (t: tDefinition) => {
  return object({
    name: string().required().label(t('messages.name')),
    code: string().required().max(10).label(t('messages.code')),
    country_id: string().required().label(t('messages.country')),
  })
}
