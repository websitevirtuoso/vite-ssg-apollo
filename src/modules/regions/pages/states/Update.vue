<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }" as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema" @submit="updateState">
          <v-card :title="t('messages.update_', { title: 'state' })">
            <v-card-text>
              <Field v-slot="{ field, errors, value }" name="name">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.name')"
                  :error-messages="errors" data-test="state.name" />
              </Field>
              <Field v-slot="{ field, errors, value }" name="code">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.code')"
                  :error-messages="errors" data-test="state.code" />
              </Field>
              <Field v-slot="{ field, errors, value }" name="country_id">
                <country-select
                  v-bind="field" :model-value="value" :error-messages="errors"
                  data-test="state.country" :return-object="false" />
              </Field>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="state.submit">
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
import { reactive } from "vue"
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from "vue-router"
import { gqlHandleError } from "@/helpers/handleErrors"
import CountrySelect from "../../components/Country.vue"
import { Field, Form, SubmissionContext } from "vee-validate"
import { useQuery, useMutation } from '@vue/apollo-composable'
import GetStates from '../../graphql/queries/getStates.gql'
import useVSchema from '../../helpers/validationSchemaState'
import { useNotification } from "@/modules/notifications/useNotification"
import StateUpsert from "../../graphql/mutations/stateUpsert.gql"
import { redirectNotFoundIfEmpty } from "@/composables/useRedirect"
import { StateInput } from "@/modules/regions/types"

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = reactive({ id: '', code: '', name: '', country_id: '' })

const { onResult } = useQuery(GetStates, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading, onDone, onError } = useMutation(StateUpsert)

onResult(queryResult => {
  redirectNotFoundIfEmpty(queryResult.data.states.data[0])
  initialValues.id = queryResult.data.states.data[0].id
  initialValues.code = queryResult.data.states.data[0].code
  initialValues.name = queryResult.data.states.data[0].name
  initialValues.country_id = queryResult.data.states.data[0].country.id
})

onDone(() => {
  notification.success(t('action.update_success'));
  router.push({ name: 'states' })
})

const updateState = ({ code, name, country_id }: StateInput, form: SubmissionContext) => {
  mutate({ id: initialValues.id, code, name, country_id })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
