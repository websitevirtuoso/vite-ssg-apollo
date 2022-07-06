<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="createState">
          <v-card :title="t('messages.create_', { title: 'state' })">
            <v-card-text>
              <Field v-slot="{ field, errors }" name="name">
                <v-text-field
                  v-bind="field" type="text" :label="t('messages.name')"
                  :error-messages="errors" data-test="state.name" />
              </Field>
              <Field v-slot="{ field, errors }" name="code">
                <v-text-field
                  v-bind="field" type="text" :label="t('messages.code')"
                  :error-messages="errors" data-test="state.code" />
              </Field>
              <Field v-slot="{ field, errors }" name="country_id">
                <country-select
                  v-bind="field" :error-messages="errors"
                  data-test="state.country" :return-object="false" />
              </Field>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="state.submit">
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMutation } from '@vue/apollo-composable'
import { gqlHandleError } from "@/helpers/handleErrors"
import useVSchema from '../../helpers/validationSchemaState'
import { Field, Form, SubmissionContext } from "vee-validate"
import StateUpsert from '../../graphql/mutations/state.gql'
import CountrySelect from "../../components/Country.vue"
import { useNotification } from "@/modules/notifications/useNotification"
import { StateInput } from "@/modules/regions/types"

const router = useRouter();
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const { mutate, loading, onDone, onError } = useMutation(StateUpsert)

const createState = ({ code, name, country_id }: StateInput, form: SubmissionContext) => {
  mutate({ code, name, country_id })

  onDone(() => {
    notification.success(t('action.create_success'));
    router.push({ name: 'states' })
  })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
