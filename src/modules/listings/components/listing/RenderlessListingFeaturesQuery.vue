<script>
import GetListingFeatures from '@/modules/listings/graphql/queries/getListingFeatures.gql'

export default defineComponent({
  setup(_, { slots, expose }) {
    const { result, loading } = useQuery(GetListingFeatures, {}, { clientId: 'public' })
    const listing_features = computed(() => result.value?.listing_features ?? { accessibility: [], amenities: [], utilities: [] })

    expose({ listing_features, loading })

    return () =>
      slots.default({
        items: listing_features.value,
        loading: loading.value,
      })
  },
})
</script>
