<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :initial-values="initialValues" :validation-schema="vSchema()" @submit="updateCity">
          <v-card :title="t('messages.update_', { title: 'city' })">
            <region-part show-autocomplete show-countries show-states show-map>
              <template #prepend>
                <v-col cols="12" class="py-0">
                  <city-field-name />
                </v-col>
              </template>
            </region-part>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="mutationLoading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="city.submit"
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
import { Form, SubmissionContext } from 'vee-validate'
// custom
import CityUpsert from '../../graphql/mutations/cityUpsert.gql'
import vSchema from '../../helpers/validationSchemaCity'
import GetCities from '../../graphql/queries/getCities.gql'
import { gqlHandleError } from '@/helpers/handleErrors'
import { useNotification } from '@/modules/notifications/useNotification'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { CityInput } from '@/modules/regions/types'
import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
import CityFieldName from '@/modules/regions/components/cities/form/CityFieldName.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const notification = useNotification()
const initialValues = reactive({ id: '', name: '', lat: '', lng: '', country_id: null, state_id: null })

const { onResult } = useQuery(GetCities, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityUpsert)

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.cities.data[0])
  const city = queryResult.data.cities.data[0];
  // city.state_id = city.state.id
  // city.country_id = city.state.country.id
  ({ id: initialValues.id, name: initialValues.name, lat: initialValues.lat, lng: initialValues.lng } = city)

  initialValues.state_id = city.state.id
  initialValues.country_id = city.state.country.id
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'cities' })
})

const updateCity = ({ name, state_id, lat, lng }: CityInput, form: SubmissionContext) => {
  mutate({ id: initialValues.id, name, lat, lng, state_id })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
