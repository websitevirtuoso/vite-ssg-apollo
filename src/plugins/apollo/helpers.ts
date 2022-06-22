import pagination from '@/composables/usePagination'
import { DataProxy } from '@apollo/client/cache/core/types/DataProxy'
import { DocumentNode } from 'graphql'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

export const gqlAddCacheElement = (
  store: DataProxy,
  query: DocumentNode | TypedDocumentNode,
  queryNameElement: string,
  newRecord: object
) => {
  const apolloCachedData = store.readQuery({ query, variables: { pagination } })
  // using clone object because data object is immutable
  const data = JSON.parse(JSON.stringify(apolloCachedData))
  data[queryNameElement].data.unshift(newRecord)
  data[queryNameElement].total += 1

  store.writeQuery({ query, data })
}
