<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }" as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema" @submit="updateListingTerm">
          <v-card :title="t('messages.update_', { title: 'property term' })">
            <v-card-text>
              <Field v-slot="{ field, errors, value }" name="name">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.name')"
                  :error-messages="errors" data-test="listing_term.name" disabled />
              </Field>
              <Field v-slot="{ field, errors, value }" name="description">
                <v-textarea
                  v-bind="field" :model-value="value" type="text" :label="t('messages.meta_description')"
                  :error-messages="errors" data-test="listing_term.description"
                  filled auto-grow counter />
              </Field>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="listing_term.submit">
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
import { Field, Form, SubmissionContext } from "vee-validate"
import { useQuery, useMutation } from '@vue/apollo-composable'
import GetListingTerms from '../../graphql/queries/getListingTerms.gql'
import useVSchema from '../../helpers/validationSchemaListingTerm'
import { useNotification } from "@/modules/notifications/useNotification"
import listingTermUpdate from "../../graphql/mutations/listingTermUpdate.gql"
import { redirectNotFoundIfEmpty } from "@/composables/useRedirect"

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = reactive({ id: '', name: '', description: '' })

const { onResult } = useQuery(GetListingTerms, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading, onDone, onError } = useMutation(listingTermUpdate)

onResult(queryResult => {
  redirectNotFoundIfEmpty(queryResult.data.listing_terms.data[0])
  initialValues.id = queryResult.data.listing_terms.data[0].id
  initialValues.name = queryResult.data.listing_terms.data[0].name
  initialValues.description = queryResult.data.listing_terms.data[0].description
})

onDone(() => {
  notification.success(t('action.update_success'));
  router.push({ name: 'listing-terms' })
})

const updateListingTerm = ({ name, description }: { name: string, description: string }, form: SubmissionContext) => {
  mutate({ id: initialValues.id, name, description })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
