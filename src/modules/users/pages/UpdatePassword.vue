<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card :title="t('messages.update_user_password')">
        <v-card-title class="subheading font-weight-bold text-center"> {{ user.first_name }} {{ user.last_name }} </v-card-title>
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="updatePassword">
          <v-card-text>
            <Field v-slot="{ field, errors }" name="password">
              <v-text-field
                v-bind="field"
                :label="t('auth.email')"
                required
                :error-messages="errors"
                data-test="update_password.password"
                class="mt-5"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? mdiEye : mdiEyeOff"
                @click:append="showPassword = !showPassword"
              />
            </Field>

            <Field v-slot="{ field, errors }" name="passwordConfirmation">
              <v-text-field
                v-bind="field"
                :label="t('auth.email')"
                required
                :error-messages="errors"
                data-test="update_password.password_confirmation"
                :type="showPassword ? 'text' : 'password'"
              />
            </Field>
          </v-card-text>

          <v-card-actions class="pb-3">
            <v-spacer />
            <v-btn color="green darken-1" text @click="router.push({ name: 'users' })">{{ t('action.cancel') }}</v-btn>
            <v-btn
              color="primary"
              type="submit"
              :loading="mutationLoading"
              :disabled="Object.keys(formErrors).length !== 0"
              data-test="user.submit"
            >
              {{ t('action.update') }}
            </v-btn>
          </v-card-actions>
        </Form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
// libs
import { Field, Form, SubmissionContext } from 'vee-validate'
// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '@/modules/auth/helpers/validationSchemaUpdatePassword'
import UserUpdatePassword from '../graphql/mutations/userUpdatePassword.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import GetUsers from '../graphql/queries/getUsers.gql'

const { t } = useI18n()
const router = useRouter()
const vSchema = useVSchema()
const route = useRoute()
const notification = useNotification()
const showPassword = ref(false)
const dialog = ref(true)

const { result } = useQuery(GetUsers, { filter: { id: [route.params.id] } })
const { mutate, loading: mutationLoading, onError, onDone } = useMutation(UserUpdatePassword)
const user = computed(() => result.value?.users.data[0] ?? {})

onDone(() => {
  notification.success(t('action.update_success'))
  dialog.value = false
  router.push({ name: 'users' })
})

const updatePassword = ({ password }: { password: string }, form: SubmissionContext) => {
  mutate({ id: route.params.id, password })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
/* todo need write tests on this page */
</script>

<style scoped>
.v-dialog .v-card {
  /*width: 50%;*/
}
</style>
