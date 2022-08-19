import { array, number, object, string, boolean } from 'yup'
import i18n from '@/plugins/i18n'

const baseSchema = () => {
  return {
    first_name: string().required().label(i18n.global.t('messages.first_name')),
    last_name: string().required().label(i18n.global.t('messages.last_name')),
    email: string().required().email().label(i18n.global.t('messages.email')),
    // password: string().required().label(i18n.global.t('messages.password')),
    status: string().required().label(i18n.global.t('messages.status')),
    phone: array()
      .of(
        number()
          .label(i18n.global.t('messages.phone'))
          .typeError(`${i18n.global.t('messages.phone')} must be a \`number\` type`)
      )
      .required()
      .min(1)
      .label(i18n.global.t('messages.phone', 2)),
    notify: boolean().required().label(i18n.global.t('messages.notify')),
    role_id: array(number()).required().min(1).label(i18n.global.t('messages.role')),

    country_id: string().required().label(i18n.global.t('messages.country')),
    state_id: string().required().label(i18n.global.t('messages.state')),
    city_id: string().required().label(i18n.global.t('messages.city')),

    address: string().optional().label(i18n.global.t('messages.address')),
    postal_code: string().optional().label(i18n.global.t('messages.postal_code')),
  }
}

export const createSchema = () => {
  return object({
    password: string().required().label(i18n.global.t('messages.password')),
    ...baseSchema(),
  })
}

export const updateSchema = () => {
  return object(baseSchema())
}
