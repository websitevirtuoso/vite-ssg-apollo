<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :initial-values="initialValues" :validation-schema="vSchema" @submit="updatePost">
          <v-card :title="t('messages.update_', { title: 'post' })">
            <v-tabs v-model="tab" color="primary" end>
              <v-tab data-test="tab-page">Page</v-tab>
              <v-tab data-test="tab-meta">Meta</v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <v-window-item>
                <v-card-text>
                  <post-field-title />
                  <post-field-slug disabled />
                  <post-field-status />
                  <post-field-category />
                  <post-field-content />
                </v-card-text>
              </v-window-item>
              <v-window-item>
                <v-card-text>
                  <post-field-meta-title />
                  <post-field-meta-keyword />
                  <post-field-meta-description />
                </v-card-text>
              </v-window-item>
            </v-window>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="post.submit"
              >
                {{ t('action.update') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </Form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// libs
import { Form, SubmissionContext } from 'vee-validate'
// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '@/modules/blog/helpers/validationSchemaCategory'
import { useNotification } from '@/modules/notifications/useNotification'
import PostUpsert from '../../graphql/mutations/postUpsert.gql'
import GetPosts from '../../graphql/queries/getPosts.gql'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { PostInput } from '@/modules/blog/types'
// components
import PostFieldTitle from '@/modules/blog/components/posts/form/PostFieldTitle.vue'
import PostFieldSlug from '@/modules/blog/components/posts/form/PostFieldSlug.vue'
import PostFieldStatus from '@/modules/blog/components/posts/form/PostFieldStatus.vue'
import PostFieldCategory from '@/modules/blog/components/posts/form/PostFieldCategory.vue'
import PostFieldContent from '@/modules/blog/components/posts/form/PostFieldContent.vue'
import PostFieldMetaTitle from '@/modules/blog/components/posts/form/PostFieldMetaTitle.vue'
import PostFieldMetaKeyword from '@/modules/blog/components/posts/form/PostFieldMetaKeyword.vue'
import PostFieldMetaDescription from '@/modules/blog/components/posts/form/PostFieldMetaDescription.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = reactive({
  id: '',
  title: '',
  slug: '',
  status: '',
  content: '',
  meta_title: '',
  category_id: '',
  meta_keyword: '',
  meta_description: '',
})
const tab = ref(null)

const { onResult } = useQuery(GetPosts, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading, onDone, onError } = useMutation(PostUpsert)

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.posts.data[0])
  ;({
    id: initialValues.id,
    title: initialValues.title,
    slug: initialValues.slug,
    status: initialValues.status,
    content: initialValues.content,
    category: { id: initialValues.category_id },
    meta_title: initialValues.meta_title,
    meta_keyword: initialValues.meta_keyword,
    meta_description: initialValues.meta_description,
  } = queryResult.data.posts.data[0])
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'posts' })
})

const updatePost = (
  { title, slug, content, meta_title, meta_keyword, meta_description, status, category_id }: PostInput,
  form: SubmissionContext
) => {
  mutate({
    id: initialValues.id,
    title,
    slug,
    content,
    meta_title,
    meta_keyword,
    meta_description,
    status,
    category_id,
  })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
