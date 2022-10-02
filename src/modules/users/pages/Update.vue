<template>
  <form @submit="updateUser">
    <v-container>
      <v-row justify="space-around">
        <v-col cols="12" md="6">
          <v-card :title="t('messages.update_', { title: 'user' })">
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
                  <user-field-phone />
                </v-col>
                <v-col cols="12">
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
                {{ t('action.update') }}
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
  </form>
</template>

<script setup lang="ts">
// libs
import { useForm, SubmissionContext } from 'vee-validate'
// custom
import GetUsers from '../graphql/queries/getUsers.gql'
import UserUpdate from '../graphql/mutations/userUpdate.gql'
import { gqlHandleError } from '@/helpers/handleErrors'
import { updateSchema } from '../helpers/validationSchemaUser'
import { useNotification } from '@/modules/notifications/useNotification'
import { MutationUserUpdateArgs, QueryUsersArgs } from '@/plugins/apollo/schemaTypesGenerated'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { Role } from '@/modules/auth/utils/types'
// components
import UserFieldStatus from '@/modules/users/components/form/UserFieldStatus.vue'
import UserFieldFirstName from '@/modules/users/components/form/UserFieldFirstName.vue'
import UserFieldLastName from '@/modules/users/components/form/UserFieldLastName.vue'
import UserFieldEmail from '@/modules/users/components/form/UserFieldEmail.vue'
import UserFieldRole from '@/modules/users/components/form/UserFieldRole.vue'
import UserFieldNotify from '@/modules/users/components/form/UserFieldNotify.vue'
import UserFieldPhone from '@/modules/users/components/form/UserFieldPhone.vue'
import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
import { UserInput } from '@/modules/users/types'

const initialValues = ref<UserInput>()

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const notification = useNotification()

const { onResult } = useQuery(GetUsers, { filter: { id: [route.params.id] } } as QueryUsersArgs)
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(UserUpdate)

const { handleSubmit, errors: formErrors, resetForm } = useForm({ initialValues: initialValues, validationSchema: updateSchema() })

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.users.data[0])
  const user = queryResult.data.users.data[0]

  initialValues.value = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    // problem with getting phone and set as a values, I have no idea why
    phone: JSON.parse(JSON.stringify(user.phone)),
    status: user.status,
    notify: user.notify,
    address: user.address,
    postal_code: user.postal_code,
    role_id: user.roles.map((role: Role) => role.id),
    city_id: user.city.id,
    state_id: user.city.state.id,
    country_id: user.city.state.country.id,
  }
  // when use component FieldArray we have to update values in it via resetForm
  resetForm({
    values: initialValues.value,
  })
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'users' })
})

const updateUser = handleSubmit(
  ({ first_name, last_name, email, status, phone, notify, address, postal_code, role_id, city_id }, form: SubmissionContext) => {
    mutate({
      id: initialValues.value?.id,
      first_name,
      last_name,
      email,
      status,
      phone,
      notify,
      address,
      postal_code,
      role_id,
      city_id,
    } as MutationUserUpdateArgs)

    onError((error) => {
      gqlHandleError(error, form)
    })
  }
)
</script>
