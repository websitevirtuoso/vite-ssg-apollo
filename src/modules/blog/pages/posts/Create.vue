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
                  <Field v-slot="{ field, errors }" name="title">
                    <v-text-field
                      v-bind="field" type="text" :label="t('messages.title')"
                      :error-messages="errors" data-test="post.title" />
                  </Field>
                  <Field v-slot="{ field, errors }" name="slug">
                    <v-text-field
                      v-bind="field" type="text" :label="t('messages.slug')"
                      :hint="t('messages.cant_be_change_later')"
                      :error-messages="errors" data-test="post.slug" />
                  </Field>
                  <Field v-slot="{ field, errors }" name="status">
                    <v-select
                      v-bind="field" :items="postStatuses" :label="t('messages.status')"
                      :error-messages="errors" data-test="post.status" />
                  </Field>
                  <Field v-slot="{ field, errors }" name="category_id">
                    <category-select
                      v-bind="field" :error-messages="errors"
                      data-test="post.category" :return-object="false" />
                  </Field>
                  <Field v-slot="{ field, errors }" name="content">
                    <wysiwyg
                      v-bind="field" :label="t('messages.content')"
                      :error-messages="errors" data-test="post.content" />
                  </Field>
                </v-card-text>
              </v-window-item>
              <v-window-item>
                <v-card-text>
                  <Field v-slot="{ field, errors }" name="meta_title">
                    <v-text-field
                      v-bind="field" type="text" :label="t('messages.meta_title')"
                      :error-messages="errors" data-test="post.meta_title" />
                  </Field>
                  <Field v-slot="{ field, errors }" name="meta_keyword">
                    <v-text-field
                      v-bind="field" type="text" :label="t('messages.meta_keyword')"
                      :error-messages="errors" data-test="post.meta_keyword" />
                  </Field>
                  <Field v-slot="{ field, errors }" name="meta_description">
                    <v-textarea
                      v-bind="field" type="text" :label="t('messages.meta_description')"
                      :error-messages="errors" data-test="post.meta_description"
                      filled auto-grow counter />
                  </Field>
                </v-card-text>
              </v-window-item>
            </v-window>

            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="post.submit">
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { Field, Form, SubmissionContext } from "vee-validate"

// custom
import { postStatuses } from "../../constants/enums"
import { gqlHandleError } from "@/helpers/handleErrors"
import useVSchema from '../../helpers/validationSchemaPost'
import PostUpsert from '../../graphql/mutations/postUpsert.gql'
import CategorySelect from "../../components/Categories.vue"
import Wysiwyg from "@/components/fields/Wysiwyg.vue"
import { useNotification } from "@/modules/notifications/useNotification"
import { PostInput } from "@/modules/blog/types"

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const tab = ref(null)

const { mutate, loading, onDone, onError } = useMutation(PostUpsert)

onDone(() => {
  notification.success(t('action.create_success'));
  router.push({ name: 'posts' })
})

const createPost = (
  { title, slug, content, meta_title, meta_keyword, meta_description, status, category_id }: PostInput,
  form: SubmissionContext
) => {
  mutate({ title, slug, content, meta_title, meta_keyword, meta_description, status, category_id })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
