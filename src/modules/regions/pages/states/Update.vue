<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }"
          as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema()"
          @submit="updateState"
        >
          <v-card :title="t('messages.update_', { title: 'state' })">
            <v-card-text>
              <state-field-name />
              <state-field-code />
              <state-field-country />
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="state.submit"
              >
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
//libs
import { Form, SubmissionContext } from 'vee-validate'
//custom
import { gqlHandleError } from '@/helpers/handleErrors'
import GetStates from '../../graphql/queries/getStates.gql'
import vSchema from '../../helpers/validationSchemaState'
import { useNotification } from '@/modules/notifications/useNotification'
import StateUpsert from '../../graphql/mutations/stateUpsert.gql'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { StateInput } from '@/modules/regions/types'
// components
import StateFieldName from '@/modules/regions/components/states/form/StateFieldName.vue'
import StateFieldCode from '@/modules/regions/components/states/form/StateFieldCode.vue'
import StateFieldCountry from '@/modules/regions/components/states/form/StateFieldCountry.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const notification = useNotification()
const initialValues = reactive({ id: '', code: '', name: '', country_id: '' })

const { onResult } = useQuery(GetStates, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(StateUpsert)

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.states.data[0])
  initialValues.id = queryResult.data.states.data[0].id
  initialValues.code = queryResult.data.states.data[0].code
  initialValues.name = queryResult.data.states.data[0].name
  initialValues.country_id = queryResult.data.states.data[0].country.id
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'states' })
})

const updateState = ({ code, name, country_id }: StateInput, form: SubmissionContext) => {
  mutate({ id: initialValues.id, code, name, country_id })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
