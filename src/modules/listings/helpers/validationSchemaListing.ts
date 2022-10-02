import i18n from '@/plugins/i18n'
import { number, object, string, date, mixed, array } from 'yup'
import { bathroomItems } from '@/modules/listings/helpers/listing'
import { Listing_Media_Status, Listing_Status } from '@/plugins/apollo/schemaTypesGenerated'

export default () => {
  return object({
    description: string().required().label(i18n.global.t('messages.description')),
    price: number()
      .required()
      .positive()
      .integer()
      .label(i18n.global.t('messages.price'))
      .typeError(`${i18n.global.t('messages.price')} must be a 'number' type`),
    deposit: number()
      .optional()
      .integer()
      .nullable()
      .label(i18n.global.t('messages.deposit'))
      .typeError(`${i18n.global.t('messages.price')} must be a 'number' type`),
    square_feet: number()
      .required()
      .positive()
      .integer()
      .label(i18n.global.t('messages.square_feet'))
      .typeError(`${i18n.global.t('messages.square_feet')} must be a 'number' type`),
    bathrooms: mixed().required().oneOf(bathroomItems).label(i18n.global.t('messages.bathroom', 2)),
    bedrooms: number()
      .required()
      .label(i18n.global.t('messages.bedroom', 2))
      .typeError(`${i18n.global.t('messages.bedroom', 2)} must be a 'number' type`),
    status: string().oneOf(Object.values(Listing_Status)).label(i18n.global.t('messages.status')),
    pets: array().of(string()).required().label(i18n.global.t('messages.pets')),
    type_id: string().required().label(i18n.global.t('messages.property_type')),
    term_id: string().optional().nullable().label(i18n.global.t('messages.listing_term')),

    address: string().required().label(i18n.global.t('messages.address')),
    postal_code: string().required().label(i18n.global.t('messages.postal_code')),
    country_id: string().required().label(i18n.global.t('messages.country')),
    state_id: string().required().label(i18n.global.t('messages.state')),
    city_id: string().required().label(i18n.global.t('messages.city')),
    user: object({
      id: string().required().label(i18n.global.t('messages.user')),
    }).required(),
    lat: number()
      .required()
      .min(-90)
      .max(90)
      .label(i18n.global.t('messages.lat'))
      .typeError(`${i18n.global.t('messages.lat')} must be a 'number' type`),
    lng: number()
      .required()
      .min(-180)
      .max(180)
      .label(i18n.global.t('messages.lng'))
      .typeError(`${i18n.global.t('messages.lng')} must be a 'number' type`),
    expire_at: date()
      .required()
      .label(i18n.global.t('messages.expire_at'))
      .typeError(`${i18n.global.t('messages.expire_at')} is a required field`),
    available_at: date()
      .optional()
      .nullable()
      .notRequired()
      .label(i18n.global.t('messages.expire_at'))
      .typeError(`${i18n.global.t('messages.expire_at')} must be a 'date' type`),
    amenities: array().default([]).of(string()).label(i18n.global.t('messages.amenities')),
    utilities: array().default([]).of(string()).label(i18n.global.t('messages.utilities')),
    accessibility: array().default([]).of(string()).label(i18n.global.t('messages.accessibility')),
    media: array()
      .of(
        object({
          id: number().required(),
          file: mixed().required(),
          status: string().oneOf(Object.values(Listing_Media_Status)).required(),
        })
      )
      .label(i18n.global.t('messages.media')),
  })
}
