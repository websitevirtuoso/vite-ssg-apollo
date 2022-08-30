<script>
import { computed, defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import GetListingTerms from '../graphql/queries/getListingTerms.gql'

export default defineComponent({
  setup(_, { slots, expose }) {
    const { result, loading } = useQuery(GetListingTerms, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
    const listing_terms = computed(() => result.value?.listing_terms.data ?? [])

    expose({ listing_terms, loading })

    return () =>
      slots.default({
        items: listing_terms.value,
        loading: loading.value,
      })
  },
})
</script>
