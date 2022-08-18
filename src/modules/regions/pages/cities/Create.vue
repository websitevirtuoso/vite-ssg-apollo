<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="createCity">
          <v-card :title="t('messages.create_', { title: 'city' })">
            <v-card-text>
              <g-map-autocomplete data-test="gmap-autocomplete" @place_changed="onSetPlace" />
              <Field v-slot="{ field, errors, value }" v-model="city.name" name="name">
                <v-text-field
                  v-bind="field" :model-value="value" type="text" :label="t('messages.name')"
                  :error-messages="errors" data-test="city.name" />
              </Field>
              <Field v-slot="{ field, errors, value }" v-model="city.country_id" name="country_id">
                <countries-query ref="countries" v-slot="{ items, loading }">
                  <v-select
                    v-bind="field" :model-value="value" :items="items" :label="t('messages.country')"
                    item-title="name" item-value="id" :loading="loading" :error-messages="errors"
                    prepend-icon="mdi-earth" data-test="city.country"
                    @update:model-value="onCountryChange"
                  />
                </countries-query>
              </Field>
              <Field v-slot="{ field, errors, value }" v-model="city.state_id" name="state_id">
                <states-query v-if="city.country_id" ref="states" v-slot="{ items, loading }" :country_ids="[city.country_id]">
                  <v-select
                    v-bind="field" :items="items" :label="t('messages.state')" :loading="loading"
                    :model-value="value" prepend-icon="mdi-compass" item-title="name" item-value="id"
                    data-test="city.state" :error-messages="errors"
                  />
                </states-query>
              </Field>

              <g-map-map :center="{ lat: city.lat, lng: city.lng }" :zoom="14" style="width: 100%; height: 400px">
                <g-map-marker
                  :position="{ lat: city.lat, lng: city.lng }"
                  :draggable="true" @dragend="onDraggedPin($event.latLng)"
                />
              </g-map-map>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary" type="submit" :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0" data-test="city.submit">
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
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMutation } from '@vue/apollo-composable'
import { Field, Form, SubmissionContext } from "vee-validate"

// custom
import { gqlHandleError } from "@/helpers/handleErrors"
import useVSchema from '../../helpers/validationSchemaCity'
import CityUpsert from '../../graphql/mutations/cityUpsert.gql'
import CountriesQuery from "../../components/RenderlessCountriesQuery.vue"
import StatesQuery from "../../components/RenderlessStatesQuery.vue"
import { useNotification } from "@/modules/notifications/useNotification"
import { CityInput } from "@/modules/regions/types"
import useGoogleMap from "@/modules/regions/composables/useGoogleMap"

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const countries = ref(null)
const states = ref(null)
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityUpsert)
const { city, onDraggedPin, onCountryChange, onGetPlace, setCountry, setState } = useGoogleMap()

const onSetPlace = (place: google.maps.places.PlaceResult) => {
  let countryName: string, stateName: string;
  ({ cityName: city.name, lat: city.lat, lng: city.lng, countryName, stateName } = onGetPlace(place))

  if (countryName) {
    setCountry(countries, countryName)
  }
  if (stateName) {
    setState(states, stateName)
  }
}

onDone(() => {
  notification.success(t('action.create_success'))
  router.push({ name: 'cities' })
})

const createCity = ({ name, state_id }: CityInput, form: SubmissionContext) => {
  mutate({ name, lat: city.lat, lng: city.lng, state_id })

  onError(error => {
    gqlHandleError(error, form)
  })
}
</script>
