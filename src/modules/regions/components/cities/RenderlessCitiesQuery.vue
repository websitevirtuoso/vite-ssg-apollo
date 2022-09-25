<script>
import GetCities from '@/modules/regions/graphql/queries/getCities.gql'
import { excludeEmptyValues } from '@/composables/useFilter'

export default defineComponent({
  props: {
    // use this props to filter states by this fields
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    name_exact: {
      type: String,
      required: false,
    },
    state_ids: {
      type: Array,
      required: false,
    },
    country_ids: {
      type: Array,
      required: false,
    },
    limit: {
      type: Number,
      required: false,
      default: 50,
    },
  },
  setup(props, { slots, expose }) {
    const queryVariables = computed(() => {
      const { limit, ...filterProps } = props // get "filterProps" for filtering
      return { pagination: { take: limit, page: 1 }, filter: excludeEmptyValues(filterProps) }
    })

    // debounce in ms
    const { result, loading, onResult } = useQuery(GetCities, queryVariables, { clientId: 'public', debounce: 500 })
    const cities = computed(() => result.value?.cities.data ?? [])

    expose({ cities, onResult })

    return () =>
      slots.default({
        items: cities.value,
        loading: loading.value,
      })
  },
})
</script>
