import { object, string } from 'yup'
import { tDefinition } from '@/types/i18n'

export default (t: tDefinition) => {
  return object({
    name: string().required().label(t('messages.name')),
    description: string().required().label(t('messages.description')),
  })
}
