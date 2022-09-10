<script>
import GetCountries from '../graphql/queries/getCountries.gql'

export default defineComponent({
  setup(_, { slots, expose }) {
    const { result, loading } = useQuery(GetCountries, { pagination: { take: 999, page: 1 } }, { clientId: 'public' })
    const countries = computed(() => result.value?.countries.data ?? [])

    expose({ countries, loading })

    return () =>
      slots.default({
        items: countries.value,
        loading: loading.value,
      })
  },
})
</script>
