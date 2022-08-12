import { object, string, number, date } from 'yup'
import { tDefinition } from '@/types/i18n'

export default (t: tDefinition) => {
  return object({
    code: string().required().label(t('messages.code')),
    discount: number()
      .required()
      .positive()
      .max(100)
      .integer()
      .label(t('messages.discount'))
      .typeError(`${t('messages.discount')} is a required field`),
    use: number()
      .required()
      .positive()
      .integer()
      .label(t('messages.use'))
      .typeError(`${t('messages.use')} is a required field`),
    short_description: string().required().label(t('messages.short_description')),
    description: string().required().min(20).label(t('messages.description')),
    expire_at: date()
      .required()
      .label(t('messages.expire_at'))
      .typeError(`${t('messages.expire_at')} is a required field`),
    rules: object({
      user_use_once: number().required().label(t('messages.user_use_once')),
    }),
  })
}
