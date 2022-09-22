<template>
  <Form v-slot="{ errors: formErrors }" :initial-values="initialValues" as="v-form" :validation-schema="vSchema" @submit="createUser">
    <v-container>
      <v-row justify="space-around">
        <v-col cols="12" md="6">
          <v-card :title="t('messages.create_', { title: 'user' })">
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6" offset-md="6">
                  <user-field-status />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-first-name />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-last-name />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-email />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-password />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-phone />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-role />
                </v-col>
                <v-col cols="12" md="6">
                  <user-field-notify />
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="user.submit"
              >
                {{ t('action.create') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card :title="t('messages.location')">
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <g-map-autocomplete data-test="gmap-autocomplete" @place_changed="onSetPlace" />
                </v-col>
                <v-col cols="12" md="6">
                  <Field v-slot="{ field, errors, value }" v-model="city.street_address" name="address">
                    <v-text-field
                      v-bind="field"
                      type="text"
                      :model-value="value"
                      :label="t('messages.address')"
                      :error-messages="errors"
                      data-test="user.address"
                    />
                  </Field>
                </v-col>
                <v-col cols="12" md="6">
                  <Field v-slot="{ field, errors, value }" v-model="city.postal_code" name="postal_code">
                    <v-text-field
                      v-bind="field"
                      type="text"
                      :model-value="value"
                      :label="t('messages.postal_code')"
                      :error-messages="errors"
                      data-test="user.postal_code"
                    />
                  </Field>
                </v-col>
                <v-col cols="12" md="4">
                  <Field v-slot="{ field, errors, value }" v-model="city.country_id" name="country_id">
                    <countries-query ref="countries" v-slot="{ items, loading }">
                      <v-select
                        v-bind="field"
                        :model-value="value"
                        :items="items"
                        :label="t('messages.country')"
                        item-title="name"
                        item-value="id"
                        :loading="loading"
                        :error-messages="errors"
                        :prepend-icon="mdiEarth"
                        data-test="user.country"
                        @update:model-value="onCountryChange"
                      />
                    </countries-query>
                  </Field>
                </v-col>
                <v-col cols="12" md="4">
                  <Field v-slot="{ field, errors, value }" v-model="city.state_id" name="state_id">
                    <states-query v-if="city.country_id" ref="states" v-slot="{ items, loading }" :country_ids="[city.country_id]">
                      <v-select
                        v-bind="field"
                        :items="items"
                        :label="t('messages.state')"
                        :loading="loading"
                        :model-value="value"
                        :prepend-icon="mdiCompass"
                        item-title="name"
                        item-value="id"
                        data-test="user.state"
                        :error-messages="errors"
                        @update:model-value="onStateChange"
                      />
                    </states-query>
                  </Field>
                </v-col>
                <v-col cols="12" md="4">
                  <Field v-slot="{ field, errors, value }" v-model="city.city_id" name="city_id">
                    <cities-query
                      v-if="city.state_id"
                      ref="cities"
                      v-slot="{ items, loading }"
                      :state_ids="[city.state_id]"
                      :name="city.cityNameSearch"
                      :limit="2000"
                    >
                      <v-autocomplete
                        v-bind="field"
                        v-model:search="city.cityNameSearch"
                        :model-value="value"
                        :label="t('messages.city')"
                        :items="items"
                        :loading="loading"
                        :placeholder="t('action.search_live')"
                        :error-messages="errors"
                        :return-object="false"
                        item-title="name"
                        item-value="id"
                        :prepend-icon="mdiMagnify"
                        data-test="user.city"
                      />
                    </cities-query>
                  </Field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Form>
</template>

<script setup lang="ts">
//libs
import { Field, Form, SubmissionContext } from 'vee-validate'
//custom
import { gqlHandleError } from '@/helpers/handleErrors'
import { createSchema } from '../helpers/validationSchemaUser'
import UserCreate from '../graphql/mutations/userCreate.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import useGoogleMap from '@/modules/regions/composables/useGoogleMap'
import { MutationUserCreateArgs, User_Status } from '@/plugins/apollo/schemaTypesGenerated'
// components
import UserFieldStatus from '@/modules/users/components/form/UserFieldStatus.vue'
import CountriesQuery from '@/modules/regions/components/RenderlessCountriesQuery.vue'
import StatesQuery from '@/modules/regions/components/RenderlessStatesQuery.vue'
import CitiesQuery from '@/modules/regions/components/RenderlessCitiesQuery.vue'
import UserFieldFirstName from '@/modules/users/components/form/UserFieldFirstName.vue'
import UserFieldLastName from '@/modules/users/components/form/UserFieldLastName.vue'
import UserFieldEmail from '@/modules/users/components/form/UserFieldEmail.vue'
import UserFieldPassword from '@/modules/users/components/form/UserFieldPassword.vue'
import UserFieldRole from '@/modules/users/components/form/UserFieldRole.vue'
import UserFieldNotify from '@/modules/users/components/form/UserFieldNotify.vue'
import UserFieldPhone from '@/modules/users/components/form/UserFieldPhone.vue'

const { city, onCountryChange, onStateChange, onGetPlace, setCountry, setState, setCity } = useGoogleMap()
const initialValues = { phone: [''], status: User_Status.Active, notify: true }

const router = useRouter()
const { t } = useI18n()
const vSchema = createSchema()
const notification = useNotification()
const countries = ref(null)
const states = ref(null)
const cities = ref(null)

const { mutate, loading: mutationLoading, onDone, onError } = useMutation(UserCreate)

const onSetPlace = (place: google.maps.places.PlaceResult) => {
  const address = onGetPlace(place)
  city.postal_code = address.postal_code
  city.street_address = `${address.street_number} ${address.street_name}`
  city.lat = address.lat
  city.lng = address.lng
  city.country_name = address.country_name
  city.state_name = address.state_name
  city.city_name = address.city_name

  if (city.country_name) {
    setCountry(countries, city.country_name)
  }

  if (city.state_name) {
    setState(states, city.state_name)
  }

  // need to wait when state will be set
  watch(
    () => city.state_id,
    () => {
      if (city.city_name) {
        setCity(cities, city.city_name)
      }
    }
  )
}

onDone(() => {
  notification.success(t('action.create_success'))
  router.push({ name: 'users' })
})

const createUser = (
  { first_name, last_name, email, status, password, phone, notify, address, postal_code, role_id, city_id }: MutationUserCreateArgs,
  form: SubmissionContext
) => {
  mutate({ first_name, last_name, email, status, password, phone, notify, address, postal_code, role_id, city_id })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
