<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }" as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema" @submit="updateCityAlias">
          <v-card :title="t('messages.update_', { title: 'city alias' })">
            <v-card-text>
              <Field v-slot="{ field, errors, value }" name="name">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.name')"
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
              <Field v-slot="{ field, errors, value }" name="city_id">
                <cities-query v-if="state" v-slot="{ items, loading }" :state_id="state" :name="cityNameSearch" :limit="2000">
                  <v-autocomplete
                    v-bind="field" v-model:search="cityNameSearch" :model-value="value" :items="items"
                    :loading="loading" :label="t('messages.city')" :placeholder="t('action.search_live')"
                    :error-messages="errors" item-title="name" item-value="id" prepend-icon="mdi-magnify"
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
// libs
import { reactive, ref } from "vue";
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from "vue-router"
import { Field, Form, SubmissionContext } from "vee-validate"
import { useQuery, useMutation } from '@vue/apollo-composable'

// custom
import CountriesQuery from "../../components/RenderlessCountriesQuery.vue"
import StatesQuery from "../../components/RenderlessStatesQuery.vue"
import CitiesQuery from "../../components/RenderlessCitiesQuery.vue"
import CityAliasUpsert from '../../graphql/mutations/cityAliasUpsert.gql'
import useVSchema from '../../helpers/validationSchemaCityAlias'
import GetCityAliases from '../../graphql/queries/getCityAliases.gql'
import { gqlHandleError } from "@/helpers/handleErrors"
import { useNotification } from "@/modules/notifications/useNotification"
import { redirectNotFoundIfEmpty } from "@/composables/useRedirect"
import { CityAliasInput } from "@/modules/regions/types"

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()

const country = ref(null)
const state = ref(null)
const cityNameSearch = ref(null)
const initialValues = reactive({ id: '', name: '', city_id: null })

// reset values when state changed
const stateChange = () => initialValues.city_id = null; cityNameSearch.value = null
// reset values when country changed
const countryChange = () => state.value = null; stateChange()

const { onResult } = useQuery(GetCityAliases, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityAliasUpsert)

onResult(queryResult => {
  redirectNotFoundIfEmpty(queryResult.data.city_aliases.data[0])

  initialValues.id = queryResult.data.city_aliases.data[0].id
  initialValues.name = queryResult.data.city_aliases.data[0].name
  initialValues.city_id = queryResult.data.city_aliases.data[0].city.id

  state.value = queryResult.data.city_aliases.data[0].city.state.id
  country.value = queryResult.data.city_aliases.data[0].city.state.country.id
  // state component has event onChange, we need to reset search model
  cityNameSearch.value = null
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'city-aliases' })
})

const updateCityAlias = ({ name, city_id }: CityAliasInput, form: SubmissionContext) => {
  mutate({ id: initialValues.id, name, city_id })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
