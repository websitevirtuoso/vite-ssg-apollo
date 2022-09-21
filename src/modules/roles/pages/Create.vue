<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="createRole">
          <v-card :title="t('messages.create_', { title: 'role' })">
            <v-card-text>
              <role-field-display-name />
              <role-field-description />
              <role-field-name />
              <!-- @todo need to add component v-treeview  -->
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="role.submit"
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
import useVSchema from '../helpers/validationSchemaRole'
import RoleUpsert from '../graphql/mutations/roleUpsert.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import { RoleInput } from '@/modules/roles/types'
// components
import RoleFieldName from '@/modules/roles/components/form/RoleFieldName.vue'
import RoleFieldDescription from '@/modules/roles/components/form/RoleFieldDescription.vue'
import RoleFieldDisplayName from '@/modules/roles/components/form/RoleFieldDisplayName.vue'

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()

const { mutate, loading, onDone, onError } = useMutation(RoleUpsert)

const createRole = ({ name, display_name, description, permission_id }: RoleInput, form: SubmissionContext) => {
  mutate({ name, display_name, description, permission_id })

  onDone(() => {
    notification.success(t('action.create_success'))
    router.push({ name: 'roles' })
  })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
