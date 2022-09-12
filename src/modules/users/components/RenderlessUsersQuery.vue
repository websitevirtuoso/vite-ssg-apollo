<script>
import GetUsers from '../graphql/queries/getUsers.gql'
import { excludeEmptyValues } from '@/composables/useFilter'

export default defineComponent({
  props: {
    // use this props to filter users by this fields
    id: {
      type: Array, // list of id
      required: false,
    },
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
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
    const { result, loading } = useQuery(GetUsers, queryVariables, { debounce: 500 })
    const users = computed(() => result.value?.users.data ?? [])

    expose({ users, loading })

    return () =>
      slots.default({
        items: users.value,
        loading: loading.value,
      })
  },
})
</script>
