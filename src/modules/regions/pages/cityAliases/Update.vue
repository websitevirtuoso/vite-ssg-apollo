<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }"
          as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema"
          @submit="updateCityAlias"
        >
          <v-card :title="t('messages.update_', { title: 'city alias' })">
            <v-card-text>
              <Field v-slot="{ field, errors, value }" name="name">
                <v-text-field
                  v-bind="field"
                  :model-value="value"
                  type="text"
                  :label="t('messages.name')"
                  :error-messages="errors"
                  data-test="alias.name"
                />
              </Field>
              <Field v-slot="{ field, errors, value }" v-model="country_id" name="country_id">
                <countries-query v-slot="{ items, loading }">
                  <v-select
                    v-bind="field"
                    :items="items"
                    :label="t('messages.country')"
                    :loading="loading"
                    :error-messages="errors"
                    :model-value="value"
                    item-title="name"
                    item-value="id"
                    prepend-icon="mdi-earth"
                    data-test="alias.country"
                    @update:model-value="countryChange"
                  />
                </countries-query>
              </Field>
              <Field v-slot="{ field, errors, value }" v-model="state_id" name="state_id">
                <states-query v-if="country_id" v-slot="{ items, loading }" :country_ids="[country_id]">
                  <v-select
                    v-bind="field"
                    :items="items"
                    :label="t('messages.state')"
                    :loading="loading"
                    :error-messages="errors"
                    :model-value="value"
                    prepend-icon="mdi-compass"
                    item-title="name"
                    item-value="id"
                    data-test="alias.state"
                    @update:model-value="stateChange"
                  />
                </states-query>
              </Field>
              <Field v-slot="{ field, errors, value }" v-model="city_id" name="city_id">
                <cities-query v-if="state_id" v-slot="{ items, loading }" :state_ids="[state_id]" :name="cityNameSearch" :limit="2000">
                  <v-autocomplete
                    v-bind="field"
                    v-model:search="cityNameSearch"
                    :model-value="value"
                    :items="items"
                    :loading="loading"
                    :label="t('messages.city')"
                    :placeholder="t('action.search_live')"
                    :error-messages="errors"
                    item-title="name"
                    item-value="id"
                    prepend-icon="mdi-magnify"
                    data-test="alias.city"
                  />
                </cities-query>
              </Field>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="alias.submit"
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
// libs
import { Field, Form, SubmissionContext } from 'vee-validate'
// custom
import CountriesQuery from '../../components/RenderlessCountriesQuery.vue'
import StatesQuery from '../../components/RenderlessStatesQuery.vue'
import CitiesQuery from '../../components/RenderlessCitiesQuery.vue'
import CityAliasUpsert from '../../graphql/mutations/cityAliasUpsert.gql'
import useVSchema from '../../helpers/validationSchemaCityAlias'
import GetCityAliases from '../../graphql/queries/getCityAliases.gql'
import { gqlHandleError } from '@/helpers/handleErrors'
import { useNotification } from '@/modules/notifications/useNotification'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { CityAliasInput } from '@/modules/regions/types'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()

const country_id = ref(null)
const state_id = ref(null)
const city_id = ref(null)
const cityNameSearch = ref(null)
const initialValues = reactive({ id: '', name: '', country_id: null, state_id: null, city_id: null })

// reset values when state changed
const stateChange = () => (city_id.value = null)
cityNameSearch.value = null
// reset values when country changed
const countryChange = () => (state_id.value = null)
stateChange()

const { onResult } = useQuery(GetCityAliases, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityAliasUpsert)

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.city_aliases.data[0])

  initialValues.id = queryResult.data.city_aliases.data[0].id
  initialValues.name = queryResult.data.city_aliases.data[0].name
  initialValues.city_id = queryResult.data.city_aliases.data[0].city.id
  initialValues.state_id = queryResult.data.city_aliases.data[0].city.state.id
  initialValues.country_id = queryResult.data.city_aliases.data[0].city.state.country.id

  state_id.value = queryResult.data.city_aliases.data[0].city.state.id
  country_id.value = queryResult.data.city_aliases.data[0].city.state.country.id
  // state component has event onChange, we need to reset search model
  cityNameSearch.value = null
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'city-aliases' })
})

const updateCityAlias = ({ name, city_id }: CityAliasInput, form: SubmissionContext) => {
  mutate({ id: initialValues.id, name, city_id })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
