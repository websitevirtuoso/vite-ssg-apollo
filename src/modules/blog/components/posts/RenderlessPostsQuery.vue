<script>
import GetPosts from '@/modules/blog/graphql/queries/getPosts.gql'
import { excludeEmptyValues } from '@/composables/useFilter'

export default defineComponent({
  props: {
    // use this props to filter states by this fields
    slug: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  setup(props, { slots, expose }) {
    const { result, loading } = useQuery(GetPosts, { filter: excludeEmptyValues(props) }, { clientId: 'public' })
    const posts = computed(() => result.value?.posts.data ?? [])

    expose({ posts, loading })

    return () =>
      slots.default({
        items: posts.value,
        loading: loading.value,
      })
  },
})
</script>
