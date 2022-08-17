<script>
import { computed, defineComponent } from "vue"
import { useQuery } from "@vue/apollo-composable"
import GetRoles from '../graphql/queries/getRoles.gql'

export default defineComponent({
  setup(_, { slots, expose }) {
    const { result, loading } = useQuery(GetRoles, { pagination: { take: 999, page: 1 } })
    const roles = computed(() => result.value?.roles.data ?? [])

    expose({ roles, loading })

    return () => slots.default({
      items: roles.value,
      loading: loading.value
    })
  }
})
</script>
