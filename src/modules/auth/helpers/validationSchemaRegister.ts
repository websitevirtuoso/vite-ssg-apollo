import i18n from '@/plugins/i18n'
import { array, boolean, number, object, string } from 'yup'

export default () => {
  return object({
    first_name: string().required().label(i18n.global.t('messages.first_name')),
    last_name: string().required().label(i18n.global.t('messages.last_name')),
    phone: array()
      .of(
        number()
          .label(i18n.global.t('messages.phone'))
          .typeError(`${i18n.global.t('messages.phone')} must be a \`number\` type`)
      )
      .required()
      .min(1)
      .label(i18n.global.t('messages.phone', 2)),
    email: string().required().email().label(i18n.global.t('messages.email')),
    password: string().required().label(i18n.global.t('messages.password')),
    notify: boolean().required().label(i18n.global.t('messages.notify')),
    country_id: string().required().label(i18n.global.t('messages.country')),
    state_id: string().required().label(i18n.global.t('messages.state')),
    city_id: string().required().label(i18n.global.t('messages.city')),
    policy: boolean().required().oneOf([true]).label(i18n.global.t('error.privacy_terms')),

    address: string().optional().nullable().label(i18n.global.t('messages.address')),
    postal_code: string().optional().nullable().label(i18n.global.t('messages.postal_code')),
  })
}
