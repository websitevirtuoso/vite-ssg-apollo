<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="createCityAlias">
          <v-card :title="t('messages.create_', { title: 'city alias' })">
            <v-card-text>
              <Field v-slot="{ field, errors }" name="name">
                <v-text-field v-bind="field" type="text" :label="t('messages.name')" :error-messages="errors" data-test="alias.name" />
              </Field>
              <Field v-slot="{ field, errors }" v-model="country_id" name="country_id">
                <countries-query v-slot="{ items, loading }">
                  <v-select
                    v-bind="field"
                    :items="items"
                    :label="t('messages.country')"
                    item-title="name"
                    item-value="id"
                    :loading="loading"
                    :error-messages="errors"
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
                    :model-value="value"
                    prepend-icon="mdi-compass"
                    item-title="name"
                    item-value="id"
                    data-test="alias.state"
                    :error-messages="errors"
                    @update:model-value="stateChange"
                  />
                </states-query>
              </Field>
              <Field v-slot="{ field, errors, value }" v-model="city_id" name="city_id">
                <cities-query v-if="state_id" v-slot="{ items, loading }" :state_ids="[state_id]" :name="cityNameSearch">
                  <v-autocomplete
                    v-bind="field"
                    v-model:search="cityNameSearch"
                    :model-value="value"
                    :label="t('messages.city')"
                    :items="items"
                    :loading="loading"
                    :placeholder="t('action.search_live')"
                    :error-messages="errors"
                    :return-object="false"
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
// libs
import { Field, Form, SubmissionContext } from 'vee-validate'
// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '../../helpers/validationSchemaCityAlias'
import CityAliasUpsert from '../../graphql/mutations/cityAliasUpsert.gql'
import CountriesQuery from '@/modules/regions/components/RenderlessCountriesQuery.vue'
import StatesQuery from '../../components/RenderlessStatesQuery.vue'
import CitiesQuery from '../../components/RenderlessCitiesQuery.vue'
import { useNotification } from '@/modules/notifications/useNotification'
import { CityAliasInput } from '@/modules/regions/types'

const country_id = ref(null)
const state_id = ref(null)
const city_id = ref(null)
const cityNameSearch = ref(null)

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityAliasUpsert)
// reset values when state changed
const stateChange = () => (city_id.value = null)
cityNameSearch.value = null
// reset values when country changed
const countryChange = () => (state_id.value = null)
stateChange()

const createCityAlias = ({ name, city_id }: CityAliasInput, form: SubmissionContext) => {
  mutate({ name, city_id })

  onDone(() => {
    notification.success(t('action.create_success'))
    router.push({ name: 'city-aliases' })
  })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
