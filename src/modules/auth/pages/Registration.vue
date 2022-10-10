<template>
  <Form v-slot="{ errors: formErrors }" :initial-values="initialValues" as="v-form" :validation-schema="vSchema()" @submit="onRegister">
    <v-card class="pa-3">
      <v-toolbar color="primary" flat dense>
        <v-toolbar-title>Register Account</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="px-2 py-0">
      </v-card-text>
      <v-card-actions class="pa-0">
        <v-container fluid class="pa-0">
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0"
                type="submit"
                data-test="register.submit"
              >
                Create account
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-row class="mt-1">
      <v-col cols="6">
        <router-link :to="{ name: 'forgot-password' }">
          {{ t('auth.forgot_password') }}
        </router-link>
      </v-col>
      <v-col cols="6" class="text-right">
        <router-link :to="{ name: 'login' }">
          {{ t('auth.login') }}
        </router-link>
      </v-col>
    </v-row>
  </Form>
</template>

<script setup lang="ts">
// libs
import { Form, SubmissionContext } from 'vee-validate'
// custom
import signUp from '@/modules/auth/graphql/mutations/signUp.gql'
import vSchema from '@/modules/auth/helpers/validationSchemaRegister'
import { gqlHandleError } from '@/helpers/handleErrors'
import { MutationSignUpArgs } from '@/plugins/apollo/schemaTypesGenerated'
// components
// import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
// import UserFieldFirstName from '@/modules/users/components/form/UserFieldFirstName.vue'
// import UserFieldLastName from '@/modules/users/components/form/UserFieldLastName.vue'
// import UserFieldPhone from '@/modules/users/components/form/UserFieldPhone.vue'
// import UserFieldEmail from '@/modules/users/components/form/UserFieldEmail.vue'
// import UserFieldPassword from '@/modules/users/components/form/UserFieldPassword.vue'
// import UserFieldPrivacy from '@/modules/users/components/form/UserFieldPrivacy.vue'
// import UserFieldNotifyAsCheckbox from '@/modules/users/components/form/UserFieldNotifyAsCheckbox.vue'

const { t } = useI18n()
const router = useRouter()
const initialValues = { phone: [''] }

const { mutate, loading, onError, onDone } = useMutation(signUp, { clientId: 'public' })

onDone(() => {
  router.push({ name: 'verification' })
})

const onRegister = (
  { first_name, last_name, phone, email, password, notify, address, postal_code, city_id }: MutationSignUpArgs,
  form: SubmissionContext
) => {
  mutate({
    first_name,
    last_name,
    phone,
    email,
    password,
    notify,
    address,
    postal_code,
    city_id,
    route_login: import.meta.env.VITE_BASE_URL + '/login',
  } as MutationSignUpArgs)

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
