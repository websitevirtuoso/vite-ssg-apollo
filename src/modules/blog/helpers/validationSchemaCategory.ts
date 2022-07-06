import { object, string } from 'yup'
import { tDefinition } from '@/types/i18n'

export default (t: tDefinition) => {
  return object({
    title: string().required().label(t('messages.title')),
  })
}
