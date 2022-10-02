import { Listing_Media_Status, Listing_Pets, Listing_Status, Users } from '@/plugins/apollo/schemaTypesGenerated'

export interface MediaItem {
  id: number
  originalID?: string
  file: File | Blob
  status: Listing_Media_Status
}

export type MutationListingFormArgs = {
  id?: string
  price: string
  deposit: string | null
  status: Listing_Status
  description: string
  term_id?: string
  type_id: string
  square_feet: string
  bedrooms: number
  bathrooms: number
  expire_at: string
  available_at: string | null
  address: string
  postal_code: string
  lat: number
  lng: number
  pets: Array<Listing_Pets>
  user: Users
  city_id: string
  state_id: string
  country_id: string
  user_id: string
  amenities: string[]
  utilities: string[]
  accessibility: string[]
  media: []
}
