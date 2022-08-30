import i18n from '@/plugins/i18n'
import { Listing_Status, Listing_Pets } from '@/plugins/apollo/schemaTypesGenerated'

export const statusesWithColors = [
  { status: Listing_Status.Active, bgClass: 'bg-green' },
  { status: Listing_Status.Rented, bgClass: 'bg-blue-lighten-2' },
  { status: Listing_Status.Expired, bgClass: 'bg-red' },
  { status: Listing_Status.Disabled, bgClass: 'bg-red-lighten-2' },
  { status: Listing_Status.Moderating, bgClass: 'bg-orange-darken-1' },
  { status: Listing_Status.PaymentPending, bgClass: 'bg-deep-purple' },
]

export const getStatusColor = (status: string) => {
  const matched = statusesWithColors.find((item) => item.status === status)
  if (!matched) {
    throw new Error('Color for listing not found')
  }
  return matched.bgClass
}

export const bedroomItems = [
  { value: 0, title: 'studio' },
  { value: 1, title: 1 },
  { value: 2, title: 2 },
  { value: 3, title: 3 },
  { value: 4, title: 4 },
  { value: 5, title: 5 },
  { value: 6, title: 6 },
  { value: 7, title: 7 },
  { value: 8, title: 8 },
]
export const bathroomItems = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.6, 6, 6.5, 7, 7.5, 8, 8.5]

export const petItems = [
  { value: Listing_Pets.NoAllowed, title: i18n.global.t('messages.not_pets_allowed') },
  { value: Listing_Pets.Cats, title: i18n.global.t('messages.cats_allowed') },
  { value: Listing_Pets.SmallDogs, title: i18n.global.t('messages.small_dogs_allowed') },
  { value: Listing_Pets.LargeDogs, title: i18n.global.t('messages.large_dogs_allowed') },
]
