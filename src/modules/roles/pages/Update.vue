<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }" as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema" @submit="updateRole">
          <v-card :title="t('messages.update_', { title: 'role' })">
            <v-card-text>
              <Field v-slot="{ field, errors, value }" name="display_name">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.name')"
                  :error-messages="errors" data-test="role.display_name" />
              </Field>
              <Field v-slot="{ field, errors, value }" name="description">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.description')"
                  :error-messages="errors" data-test="role.description" />
              </Field>
              <Field v-slot="{ field, errors, value }" name="name">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.system_name')"
                  :error-messages="errors" data-test="role.name" />
              </Field>
              <Field v-slot="{ field, errors, value }" name="created_at">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.created_at')"
                  :error-messages="errors" data-test="role.created_at" disabled />
              </Field>
              <Field v-slot="{ field, errors, value }" name="updated_at">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.updated_at')"
                  :error-messages="errors" data-test="role.updated_at" disabled />
              </Field>
              <!-- @todo need to add component v-treeview -->
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="role.submit">
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
import GetRoles from '../graphql/queries/getRoles.gql'
import useVSchema from '../helpers/validationSchemaRole'
import { useNotification } from "@/modules/notifications/useNotification"
import RoleUpsert from "../graphql/mutations/roleUpsert.gql"
import { redirectNotFoundIfEmpty } from "@/composables/useRedirect"
import { RoleInput } from "@/modules/roles/types"
import dayjs from 'dayjs'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = reactive(
  { id: '', name: '', display_name: '', description: '', permission_id: '', created_at: '', updated_at: '' }
)

const { onResult } = useQuery(GetRoles, { filter: { id: [route.params.id] } })
const { mutate, loading, onDone, onError } = useMutation(RoleUpsert)

onResult(queryResult => {
  redirectNotFoundIfEmpty(queryResult.data.roles.data[0])
  initialValues.id = queryResult.data.roles.data[0].id
  initialValues.name = queryResult.data.roles.data[0].name
  initialValues.display_name = queryResult.data.roles.data[0].display_name
  initialValues.description = queryResult.data.roles.data[0].description
  initialValues.created_at = dayjs(queryResult.data.roles.data[0].created_at).format('YYYY-MM-DD HH:mm:ss')
  initialValues.updated_at = dayjs(queryResult.data.roles.data[0].updated_at).format('YYYY-MM-DD HH:mm:ss')
  // todo need to implement when componentn v-treeview will be available
  // initialValues.permission_id = queryResult.data.roles.data[0].permission.id
})

onDone(() => {
  notification.success(t('action.update_success'));
  router.push({ name: 'roles' })
})

const updateRole = ({ name, display_name, description, permission_id }: RoleInput, form: SubmissionContext) => {
  mutate({ id: initialValues.id, name, display_name, description, permission_id })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
