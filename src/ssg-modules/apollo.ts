import type { UserModule } from '@/types/vite-ssg-types'
import { ApolloClients } from '@vue/apollo-composable'
import { apolloDefaultClient, apolloPublicClient } from '@/plugins/apollo/vue-apollo'

export const install: UserModule = ({ app }) => {
  app.provide(ApolloClients, {
    default: apolloDefaultClient,
    public: apolloPublicClient,
  })
}
