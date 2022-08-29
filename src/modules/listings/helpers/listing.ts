import { Listing_Status } from '@/plugins/apollo/schemaTypesGenerated'

export const statusesWithColors = [
  { status: Listing_Status.Active, bgClass: 'bg-green' },
  { status: Listing_Status.Rented, bgClass: 'bg-blue-lighten-2' },
  { status: Listing_Status.Expired, bgClass: 'bg-red' },
  { status: Listing_Status.Disabled, bgClass: 'bg-red-lighten-2' },
  { status: Listing_Status.Moderating, bgClass: 'bg-orange-darken-1' },
  { status: Listing_Status.PaymentPending, bgClass: 'bg-deep-purple' },
]
