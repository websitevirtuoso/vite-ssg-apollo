<script>
import { computed } from "vue"
import { useQuery } from "@vue/apollo-composable"
import GetCountries from '../graphql/queries/getCountries.gql'

export default {
  setup(_, { slots }) {
    const { result, loading } = useQuery(GetCountries, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
    const countries = computed(() => result.value?.countries.data ?? [])

    return () => slots.default({
      items: countries.value,
      loading: loading.value
    })
  }
}
</script>
