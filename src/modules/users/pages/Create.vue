<template>
  <Form v-slot="{ errors: formErrors }" :initial-values="initialValues" as="v-form" :validation-schema="vSchema" @submit="createUser">
    <v-container>
      <v-row justify="space-around">
        <v-col cols="12" md="6">
          <v-card :title="t('messages.create_', { title: 'user' })">
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6" offset-md="6">
                  <user-field-status />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-first-name />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-last-name />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-email />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-password />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-phone />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-role />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-notify />
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="user.submit"
              >
                {{ t('action.create') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card :title="t('messages.location')">
            <region-part show-autocomplete show-address show-postal-code show-countries show-states show-cities />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Form>
</template>

<script setup lang="ts">
//libs
import { Form, SubmissionContext } from 'vee-validate'
//custom
import { gqlHandleError } from '@/helpers/handleErrors'
import { createSchema } from '../helpers/validationSchemaUser'
import UserCreate from '../graphql/mutations/userCreate.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import { MutationUserCreateArgs, User_Status } from '@/plugins/apollo/schemaTypesGenerated'
// components
import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
import UserFieldStatus from '@/modules/users/components/form/UserFieldStatus.vue'
import UserFieldFirstName from '@/modules/users/components/form/UserFieldFirstName.vue'
import UserFieldLastName from '@/modules/users/components/form/UserFieldLastName.vue'
import UserFieldEmail from '@/modules/users/components/form/UserFieldEmail.vue'
import UserFieldPassword from '@/modules/users/components/form/UserFieldPassword.vue'
import UserFieldRole from '@/modules/users/components/form/UserFieldRole.vue'
import UserFieldNotify from '@/modules/users/components/form/UserFieldNotify.vue'
import UserFieldPhone from '@/modules/users/components/form/UserFieldPhone.vue'

const initialValues = { phone: [''], status: User_Status.Active, notify: true }

const router = useRouter()
const { t } = useI18n()
const vSchema = createSchema()
const notification = useNotification()

const { mutate, loading: mutationLoading, onDone, onError } = useMutation(UserCreate)

onDone(() => {
  notification.success(t('action.create_success'))
  router.push({ name: 'users' })
})

const createUser = (
  { first_name, last_name, email, status, password, phone, notify, address, postal_code, role_id, city_id }: MutationUserCreateArgs,
  form: SubmissionContext
) => {
  mutate({ first_name, last_name, email, status, password, phone, notify, address, postal_code, role_id, city_id })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
