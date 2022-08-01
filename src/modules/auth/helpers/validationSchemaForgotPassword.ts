import { object, string } from 'yup'
import { tDefinition } from '@/types/i18n'

export default (t: tDefinition) => {
  return object({
    email: string().required().email().label(t('auth.email')),
  })
}
