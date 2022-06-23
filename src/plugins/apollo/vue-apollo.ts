import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from '@/modules/auth/utils/auth'
import router from '@/plugins/router'

// Http endpoint
const httpEndpoint = import.meta.env.VITE_GRAPHQL_HTTP
const httpPublicEndpoint = httpEndpoint + '/public'

// for cypress need to extend gql request to identify each request
// https://github.com/cypress-io/cypress-documentation/issues/122#issuecomment-634693934
const gqlCypressAddOperationNames = (input: RequestInfo | URL, options: RequestInit) => {
  // @ts-expect-error we know that options.body defined
  return fetch(`${input}?operation=${JSON.parse(options.body).operationName}`, options)
}

const prepareHttpLinkOptions = (uri: string) => {
  return import.meta.env.MODE !== 'production' ? { uri, fetch: gqlCypressAddOperationNames } : { uri }
}

const httpLink = createHttpLink(prepareHttpLinkOptions(httpEndpoint))

const httpPublicLink = createHttpLink(prepareHttpLinkOptions(httpPublicEndpoint))

// Handle errors globally
// https://v4.apollo.vuejs.org/guide-composable/error-handling.html#network-errors
const errorLink = onError((error) => {
  const { networkError } = error
  if (import.meta.env.MODE !== 'production') {
    logErrorMessages(error)
  }
  // @ts-expect-error invalid definition in TS for this use case
  if (networkError && networkError.statusCode === 401) {
    // todo call notification plugin and add message - 'Please authenticate'
    router.push({ name: 'login' })
  }
})

const authMiddleware = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const defaultOptions = {
  cache: new InMemoryCache(), // Cache method implementation
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
}

// Create the apollo client for "API schema"
// @ts-expect-error options correct
export const apolloDefaultClient = new ApolloClient({
  ...{ link: errorLink.concat(authMiddleware.concat(httpLink)) }, // merge options with link
  ...defaultOptions,
})

// Create the apollo client for "PUBLIC schema"
// @ts-expect-error options correct
export const apolloPublicClient = new ApolloClient({
  ...{ link: errorLink.concat(httpPublicLink) },
  ...defaultOptions,
})
