<template>
  <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="forgotPassword">
    <v-card class="pa-3">
      <v-toolbar color="primary" dark flat dense>
        <v-toolbar-title>Forgot password</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <p>If you have forgotten your password, simply enter the email address below that you registered with.</p>

        <Field v-slot="{ field, errors }" name="email">
          <v-text-field
            v-bind="field"
            :label="t('auth.email')"
            type="email"
            required
            :error-messages="errors"
            append-inner-icon="mdi-email"
            autocomplete="username email"
            data-test="forget_password.email"
            class="mt-5"
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
                data-test="forget_password.submit"
              >
                {{ t('auth.forgot_password') }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn :to="{ name: 'login' }" class="mt-3">{{ t('auth.login') }}</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <forgot-password-verification :show="showVerification" />
  </Form>
</template>

<script setup lang="ts">
// libs
import { Field, Form, SubmissionContext } from 'vee-validate'
// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '@/modules/auth/helpers/validationSchemaForgotPassword'
import ForgotPassword from '@/modules/auth/graphql/mutations/forgotPassword.gql'
import ForgotPasswordVerification from '@/modules/auth/components/ForgotPasswordVerification.vue'

const { t } = useI18n()
const vSchema = useVSchema(t)
const showVerification = ref(false)

const { mutate, loading, onError, onDone } = useMutation(ForgotPassword, { clientId: 'public' })

onDone(() => {
  showVerification.value = true
})

const forgotPassword = ({ email }: { email: string }, form: SubmissionContext) => {
  const host = window.location.protocol + '//' + window.location.host
  mutate({ email, route_update_password: `${host}/update-password/:token/email/:email/` })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
/* todo need write tests on this page */
</script>
