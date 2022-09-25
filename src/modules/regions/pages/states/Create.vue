<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema()" @submit="createState">
          <v-card :title="t('messages.create_', { title: 'state' })">
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
import vSchema from '../../helpers/validationSchemaState'
import StateUpsert from '../../graphql/mutations/stateUpsert.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import { StateInput } from '@/modules/regions/types'
// components
import StateFieldName from '@/modules/regions/components/states/form/StateFieldName.vue'
import StateFieldCode from '@/modules/regions/components/states/form/StateFieldCode.vue'
import StateFieldCountry from '@/modules/regions/components/states/form/StateFieldCountry.vue'

const router = useRouter()
const { t } = useI18n()
const notification = useNotification()
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(StateUpsert)

const createState = ({ code, name, country_id }: StateInput, form: SubmissionContext) => {
  mutate({ code, name, country_id })

  onDone(() => {
    notification.success(t('action.create_success'))
    router.push({ name: 'states' })
  })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
