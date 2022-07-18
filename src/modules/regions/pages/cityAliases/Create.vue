<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }" as="v-form"
          :initial-values="initialValues" :validation-schema="vSchema" @submit="createCityAlias">
          <v-card :title="t('messages.create_', { title: 'city alias' })">
            <v-card-text>
              <Field v-slot="{ field, errors }" name="name">
                <v-text-field
                  v-bind="field" type="text" :label="t('messages.name')"
                  :error-messages="errors" data-test="alias.name" />
              </Field>
              <countries-query v-slot="{ items, loading }">
                <v-select
                  v-model="country" :items="items" :label="t('messages.country')"
                   item-title="name" item-value="id" :loading="loading"
                  prepend-icon="mdi-earth" data-test="alias.country"
                  @update:model-value="countryChange"
                />
              </countries-query>
              <states-query v-if="country" v-slot="{ items, loading }" :country_id="country">
                <v-select
                  v-model="state" :items="items" :label="t('messages.state')" :loading="loading"
                  prepend-icon="mdi-compass" item-title="name" item-value="id" data-test="alias.state"
                  @update:model-value="stateChange"
                />
              </states-query>
              <Field v-slot="{ field, errors }" name="city_id">
                <cities-query v-if="state" v-slot="{ items, loading }" :state_id="state" :name="cityNameSearch">
                  <v-autocomplete
                    v-bind="field"
                    v-model:search="cityNameSearch"
                    :items="items"
                    :loading="loading"
                    :label="t('messages.city')"
                    :placeholder="t('action.search_live')"
                    :error-messages="errors"
                    item-title="name"
                    item-value="id"
                    prepend-icon="mdi-magnify"
                    :return-object="false"
                    data-test="alias.city"
                  />
                </cities-query>
              </Field>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="alias.submit">
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
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMutation } from '@vue/apollo-composable'
import { gqlHandleError } from "@/helpers/handleErrors"
import useVSchema from '../../helpers/validationSchemaCityAlias'
import { Field, Form, SubmissionContext } from "vee-validate"
import CityAliasUpsert from '../../graphql/mutations/cityAliasUpsert.gql'
import CountriesQuery from "@/modules/regions/components/RenderlessCountriesQuery.vue"
import StatesQuery from "../../components/RenderlessStatesQuery.vue"
import CitiesQuery from "../../components/RenderlessCitiesQuery.vue"
import { useNotification } from "@/modules/notifications/useNotification"
import { CityAliasInput } from "@/modules/regions/types"

const country = ref(null)
const state = ref(null)
const cityNameSearch = ref(null)
const initialValues = reactive({ city_id: null })

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityAliasUpsert)
// reset values when state changed
const stateChange = () => initialValues.city_id = null; cityNameSearch.value = null
// reset values when country changed
const countryChange = () => state.value = null; stateChange()

const createCityAlias = ({ name, city_id }: CityAliasInput, form: SubmissionContext) => {
  mutate({ name, city_id })

  onDone(() => {
    notification.success(t('action.create_success'))
    router.push({ name: 'city-aliases' })
  })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
