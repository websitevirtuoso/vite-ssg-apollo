<template>
  <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="onLogin">
    <v-card class="pa-3">
      <v-card-text class="pb-0">
        <div class="d-flex align-center flex-column">
          <img :src="logo" :alt="siteName" width="120" height="120" />
          <h1 class="flex my-4 primary--text">{{ siteName }} admin panel</h1>
        </div>
        <Field v-slot="{ field, errors }" name="email">
          <v-text-field
            v-bind="field"
            :label="t('auth.email')"
            type="email"
            required
            :error-messages="errors"
            :append-inner-icon="mdiAccount"
            autocomplete="username email"
            data-test="login.email"
          />
        </Field>
        <Field v-slot="{ field, errors }" name="password">
          <v-text-field
            v-bind="field"
            :append-inner-icon="mdiLock"
            :label="t('auth.password')"
            type="password"
            :error-messages="errors"
            autocomplete="current-password"
            data-test="login.password"
          />
        </Field>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-container fluid class="pa-0">
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0"
                type="submit"
                data-test="login.submit"
              >
                {{ t('auth.login') }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn :to="{ name: 'forgot-password' }" class="mt-3">{{ t('auth.forgot_password') }}</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </Form>
</template>

<script setup lang="ts">
// libs
import { Field, Form, SubmissionContext } from 'vee-validate'
// custom
import Login from '../graphql/mutations/login.gql'
import logo from '@/assets/img/logo.png'
import { onLoginApollo } from '../utils/auth'
import { setPermissions, parseUserPermissions } from '../utils/ability'
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '../helpers/validationSchemaLogin'

const { t } = useI18n()
const router = useRouter()
const vSchema = useVSchema(t)
const siteName = import.meta.env.VITE_APP_NAME

const publicApolloClient = useApolloClient('public').client

const { mutate, loading, onError } = useMutation(Login, { clientId: 'public' })

const onLogin = ({ email, password }: { email: string; password: string }, form: SubmissionContext) => {
  mutate({ email, password }).then((response) => {
    if (response === null) {
      return
    }
    // verify that user has any role
    if (response.data.logIn.user.roles.length === 0) {
      router.push({ name: 'access-denied' })
      return
    }
    // Update token and reset cache
    onLoginApollo(publicApolloClient, response?.data.logIn.access_token, response?.data.logIn.expires_in)
    localStorage.setItem('user', JSON.stringify(response.data.logIn.user))
    // define user permissions
    setPermissions(parseUserPermissions(response.data.logIn.user))

    router.push({ name: 'home' })
  })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
