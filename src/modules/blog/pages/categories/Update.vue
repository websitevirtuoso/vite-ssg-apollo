<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }"
          as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema"
          @submit="updateCategory"
        >
          <v-card :title="t('messages.update_', { title: 'category' })">
            <v-card-text>
              <category-field-title />
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="category.submit"
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
//libs
import { Form, SubmissionContext } from 'vee-validate'
//custom
import { gqlHandleError } from '@/helpers/handleErrors'
import GetCategories from '../../graphql/queries/getCategories.gql'
import useVSchema from '@/modules/blog/helpers/validationSchemaCategory'
import { useNotification } from '@/modules/notifications/useNotification'
import CategoryUpsert from '../../graphql/mutations/categoryUpsert.gql'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import CategoryFieldTitle from '@/modules/blog/components/categories/form/CategoryFieldTitle.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = reactive({ id: '', title: '' })

const { onResult } = useQuery(GetCategories, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading, onDone, onError } = useMutation(CategoryUpsert)

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.categories.data[0])
  initialValues.id = queryResult.data.categories.data[0].id
  initialValues.title = queryResult.data.categories.data[0].title
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'categories' })
})

const updateCategory = ({ title }: { title: string }, form: SubmissionContext) => {
  mutate({ id: initialValues.id, title })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
