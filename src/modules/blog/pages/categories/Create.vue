<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="createCategory">
          <v-card :title="t('messages.create_', { title: 'category' })">
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
//libs
import { Form, SubmissionContext } from 'vee-validate'
//custom
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '../../helpers/validationSchemaCategory'
import CategoryUpsert from '../../graphql/mutations/categoryUpsert.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import CategoryFieldTitle from '@/modules/blog/components/categories/form/CategoryFieldTitle.vue'

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()

const { mutate, loading, onDone, onError } = useMutation(CategoryUpsert)

const createCategory = ({ title }: { title: string }, form: SubmissionContext) => {
  mutate({ title })

  onDone(() => {
    notification.success(t('action.create_success'))
    router.push({ name: 'categories' })
  })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
