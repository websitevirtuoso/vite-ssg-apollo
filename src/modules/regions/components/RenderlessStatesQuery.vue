<script>
import { computed } from 'vue'
import { useQuery } from "@vue/apollo-composable"
import GetStates from '../graphql/queries/getStates.gql'
import { excludeEmptyValues } from "@/composables/useFilter"

export default {
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
    country_id: {
      type: String,
      required: false,
    }
  },
  setup(props, { slots }) {
    const queryVariables = computed(() => {
      return { pagination: { take: 999, page: 1 }, filter: excludeEmptyValues(props) }
    })

    const { result, loading } = useQuery(GetStates, queryVariables, { clientId: 'public' })
    const states = computed(() => result.value?.states.data ?? [])

    return () => slots.default({
      items: states.value,
      loading: loading.value
    })
  }
}
</script>
