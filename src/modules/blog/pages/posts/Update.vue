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
                  <Field v-slot="{ field, errors, value }" name="title">
                    <v-text-field
                      v-bind="field"
                      :model-value="value"
                      type="text"
                      :label="t('messages.title')"
                      :error-messages="errors"
                      data-test="post.title"
                    />
                  </Field>
                  <Field v-slot="{ field, errors, value }" name="slug">
                    <v-text-field
                      v-bind="field"
                      :model-value="value"
                      type="text"
                      :label="t('messages.slug')"
                      :hint="t('messages.cant_be_change_later')"
                      disabled
                      :error-messages="errors"
                      data-test="post.slug"
                    />
                  </Field>
                  <Field v-slot="{ field, errors, value }" name="status">
                    <v-select
                      v-bind="field"
                      :model-value="value"
                      :items="postStatuses"
                      :label="t('messages.status')"
                      :error-messages="errors"
                      data-test="post.status"
                    />
                  </Field>
                  <Field v-slot="{ field, errors, value }" name="category_id">
                    <category-select
                      v-bind="field"
                      :model-value="value"
                      :error-messages="errors"
                      data-test="post.category"
                      :return-object="false"
                    />
                  </Field>
                  <Field v-slot="{ field, errors, value }" name="content">
                    <wysiwyg
                      v-bind="field"
                      :model-value="value"
                      :label="t('messages.content')"
                      :error-messages="errors"
                      data-test="post.content"
                    />
                  </Field>
                </v-card-text>
              </v-window-item>
              <v-window-item>
                <v-card-text>
                  <Field v-slot="{ field, errors, value }" name="meta_title">
                    <v-text-field
                      v-bind="field"
                      :model-value="value"
                      type="text"
                      :label="t('messages.meta_title')"
                      :error-messages="errors"
                      data-test="post.meta_title"
                    />
                  </Field>
                  <Field v-slot="{ field, errors, value }" name="meta_keyword">
                    <v-text-field
                      v-bind="field"
                      :model-value="value"
                      type="text"
                      :label="t('messages.meta_keyword')"
                      :error-messages="errors"
                      data-test="post.meta_keyword"
                    />
                  </Field>
                  <Field v-slot="{ field, errors, value }" name="meta_description">
                    <v-textarea
                      v-bind="field"
                      :model-value="value"
                      type="text"
                      :label="t('messages.meta_description')"
                      :error-messages="errors"
                      data-test="post.meta_description"
                      filled
                      auto-grow
                      counter
                    />
                  </Field>
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
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Field, Form, SubmissionContext } from 'vee-validate'
import { useQuery, useMutation } from '@vue/apollo-composable'

// custom
import { postStatuses } from '../../constants/enums'
import Wysiwyg from '@/components/fields/Wysiwyg.vue'
import { gqlHandleError } from '@/helpers/handleErrors'
import CategorySelect from '../../components/Categories.vue'
import useVSchema from '@/modules/blog/helpers/validationSchemaCategory'
import { useNotification } from '@/modules/notifications/useNotification'
import PostUpsert from '../../graphql/mutations/postUpsert.gql'
import GetPosts from '../../graphql/queries/getPosts.gql'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { PostInput } from '@/modules/blog/types'

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
