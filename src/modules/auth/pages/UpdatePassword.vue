<template>
  <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="updatePassword">
    <v-card class="pa-3">
      <v-toolbar color="primary" dark flat dense>
        <v-toolbar-title>Update password</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <p>Please write new password for {{ $route.params.email }}.</p>

        <Field v-slot="{ field, errors }" name="password">
          <v-text-field
            v-bind="field"
            :label="t('auth.email')"
            required
            :error-messages="errors"
            data-test="update_password.password"
            class="mt-5"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
      <v-card-actions>
        <v-container fluid class="pa-0">
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0"
                type="submit"
                data-test="update_password.submit"
              >
                {{ t('auth.change_password') }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn :to="{ name: 'login' }" class="mt-3">{{ t('auth.login') }}</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </Form>
</template>

<script setup lang="ts">
// libs
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMutation } from '@vue/apollo-composable'
import { Field, Form, SubmissionContext } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'

// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '@/modules/auth/helpers/validationSchemaUpdatePassword'
import UpdatePassword from '@/modules/auth/graphql/mutations/updatePassword.gql'
import { useNotification } from '@/modules/notifications/useNotification'

const { t } = useI18n()
const vSchema = useVSchema()
const route = useRoute()
const router = useRouter()
const notification = useNotification()
const showPassword = ref(false)

const { mutate, loading, onError, onDone } = useMutation(UpdatePassword, { clientId: 'public' })

onDone(() => {
  notification.success(t('auth.password_changed'))
  router.push({ name: 'login' })
})

const updatePassword = ({ password }: { password: string }, form: SubmissionContext) => {
  mutate({ token: route.params.token, password })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
/* todo need write tests on this page */
</script>
