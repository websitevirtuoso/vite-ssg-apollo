import { apolloDefaultClient, apolloPublicClient } from '@/plugins/apollo/vue-apollo'

export const AUTH_TOKEN = 'apollo-bearer-auth-token'
export const AUTH_TOKEN_EXPIRE = 'apollo-token-expires_in'

// Manually call this when user log in
export const onLoginApollo = (apolloClient: typeof apolloPublicClient, token: string, tokenTTL: number) => {
  // if (typeof localStorage !== 'undefined' && token && tokenTTL) {
  //   localStorage.clear()
  //   localStorage.setItem(AUTH_TOKEN, token)
  //
  //   // get current time + add second and set this datetime into storage
  //   const t = new Date()
  //   t.setSeconds(t.getSeconds() + tokenTTL)
  //   localStorage.setItem(AUTH_TOKEN_EXPIRE, t.toISOString())
  // }
  try {
    apolloClient.resetStore()
  } catch (error) {
    throw new Error(`Error on cache reset (login): ${error}`)
  }
}

// Manually call this when user log out
export const onLogoutApollo = (apolloClient: typeof apolloDefaultClient) => {
  // if (typeof localStorage !== 'undefined') {
  //   localStorage.removeItem(AUTH_TOKEN)
  //   localStorage.removeItem(AUTH_TOKEN_EXPIRE)
  // }
  try {
    apolloClient.resetStore()
  } catch (error) {
    throw new Error(`Error on cache reset (logout): ${error}`)
  }
}

export function getTokenTtl(): number {
  // const expireDateTime = localStorage.getItem(AUTH_TOKEN_EXPIRE)
  // if (!expireDateTime) {
  //   return 0
  // }
  // return Math.abs((new Date(expireDateTime).getTime() - new Date().getTime()) / 1000)
  return 0
}
