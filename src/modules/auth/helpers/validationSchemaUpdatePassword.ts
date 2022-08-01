import { object, string, ref } from 'yup'
import i18n from '@/plugins/i18n'

export default () => {
  return object().shape({
    password: string().min(8).required(),
    passwordConfirmation: string()
      .required()
      .oneOf([ref('password')], i18n.global.t('auth.password_dont_match')),
  })
}
