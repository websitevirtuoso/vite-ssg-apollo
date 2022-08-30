<script>
import { computed, defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import GetListingTypes from '../graphql/queries/getListingTypes.gql'

export default defineComponent({
  setup(_, { slots, expose }) {
    const { result, loading } = useQuery(GetListingTypes, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
    const listing_types = computed(() => result.value?.listing_types.data ?? [])

    expose({ listing_types, loading })

    return () =>
      slots.default({
        items: listing_types.value,
        loading: loading.value,
      })
  },
})
</script>
