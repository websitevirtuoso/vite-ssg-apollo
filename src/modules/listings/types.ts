import { Listing_Media_Status } from '@/plugins/apollo/schemaTypesGenerated'

export interface MediaItem {
  id: number
  file: File | Blob
  status: Listing_Media_Status
}
