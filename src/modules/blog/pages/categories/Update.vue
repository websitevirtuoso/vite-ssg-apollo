<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }" as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema" @submit="updateCategory">
          <v-card :title="t('messages.update_', { title: 'category' })">
            <v-card-text>
              <Field v-slot="{ field, errors, value }" name="title">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.title')"
                  :error-messages="errors" data-test="category.title" />
              </Field>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="category.submit">
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
import { reactive } from "vue"
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from "vue-router"
import { gqlHandleError } from "@/helpers/handleErrors"
import { Field, Form, SubmissionContext } from "vee-validate"
import { useQuery, useMutation } from '@vue/apollo-composable'
import GetCategories from '../../graphql/queries/getCategories.gql'
import useVSchema from "@/modules/blog/helpers/validationSchemaCategory"
import { useNotification } from "@/modules/notifications/useNotification"
import CategoryUpsert from "../../graphql/mutations/categoryUpsert.gql"
import { redirectNotFoundIfEmpty } from "@/composables/useRedirect"

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = reactive({ id: '', title: '' })

const { onResult } = useQuery(GetCategories, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading, onDone, onError } = useMutation(CategoryUpsert)

onResult(queryResult => {
  redirectNotFoundIfEmpty(queryResult.data.categories.data[0])
  initialValues.id = queryResult.data.categories.data[0].id
  initialValues.title = queryResult.data.categories.data[0].title
})

onDone(() => {
  notification.success(t('action.update_success'));
  router.push({ name: 'categories' })
})

const updateCategory = ({ title }: { title: string }, form: SubmissionContext) => {
  mutate({ id: initialValues.id, title })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
