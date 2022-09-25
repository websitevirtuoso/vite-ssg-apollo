<script>
import GetStates from '@/modules/regions/graphql/queries/getStates.gql'
import { excludeEmptyValues } from '@/composables/useFilter'

export default defineComponent({
  props: {
    // use this props to filter states by this fields
    id: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    country_ids: {
      type: Array,
      required: false,
    },
  },
  setup(props, { slots, expose }) {
    const queryVariables = computed(() => {
      return { pagination: { take: 999, page: 1 }, filter: excludeEmptyValues(props) }
    })

    const { result, loading, onResult } = useQuery(GetStates, queryVariables, { clientId: 'public' })
    const states = computed(() => result.value?.states.data ?? [])

    expose({ states, onResult })

    return () =>
      slots.default({
        items: states.value,
        loading: loading.value,
      })
  },
})
</script>
