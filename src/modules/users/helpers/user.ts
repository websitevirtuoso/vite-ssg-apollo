import { User_Status, Listing_Pets } from '@/plugins/apollo/schemaTypesGenerated'

export const statusesWithColors = [
  { status: User_Status.Active, color: 'green' },
  { status: User_Status.Blocked, color: 'red' },
]

export const getStatusColor = (status: string) => {
  const matched = statusesWithColors.find((item) => item.status === status)
  if (!matched) {
    throw new Error('Color for user not found')
  }
  return matched.color
}
