<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="createPost">
          <v-card :title="t('messages.create_', { title: 'post' })">
            <v-tabs v-model="tab" color="primary" end>
              <v-tab data-test="tab-page">Page</v-tab>
              <v-tab data-test="tab-meta">Meta</v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <v-window-item>
                <v-card-text>
                  <post-field-title />
                  <post-field-slug />
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
                {{ t('action.create') }}
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
import useVSchema from '../../helpers/validationSchemaPost'
import PostUpsert from '../../graphql/mutations/postUpsert.gql'
import { useNotification } from '@/modules/notifications/useNotification'
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

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const tab = ref(null)

const { mutate, loading, onDone, onError } = useMutation(PostUpsert)

onDone(() => {
  notification.success(t('action.create_success'))
  router.push({ name: 'posts' })
})

const createPost = (
  { title, slug, content, meta_title, meta_keyword, meta_description, status, category_id }: PostInput,
  form: SubmissionContext
) => {
  mutate({ title, slug, content, meta_title, meta_keyword, meta_description, status, category_id })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
