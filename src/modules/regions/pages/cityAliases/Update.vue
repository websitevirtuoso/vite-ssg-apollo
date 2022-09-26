<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }"
          as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema()"
          @submit="updateCityAlias"
        >
          <v-card :title="t('messages.update_', { title: 'city alias' })">
            <v-card-text>
              <city-alias-field-name />
              <region-part show-countries show-states show-cities />
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
import { Form, SubmissionContext } from 'vee-validate'
// custom
import CityAliasUpsert from '../../graphql/mutations/cityAliasUpsert.gql'
import vSchema from '../../helpers/validationSchemaCityAlias'
import GetCityAliases from '../../graphql/queries/getCityAliases.gql'
import { gqlHandleError } from '@/helpers/handleErrors'
import { useNotification } from '@/modules/notifications/useNotification'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { CityAliasInput } from '@/modules/regions/types'
// components
import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
import CityAliasFieldName from '@/modules/regions/components/citiesAlias/form/CityAliasFieldName.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const notification = useNotification()

const initialValues = reactive({ id: '', name: '', country_id: null, state_id: null, city_id: null })

const { onResult } = useQuery(GetCityAliases, { filter: { id: [route.params.id] } }, { clientId: 'public' })
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityAliasUpsert)

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.city_aliases.data[0])
  const cityAlias = queryResult.data.city_aliases.data[0]

  initialValues.id = cityAlias.id
  initialValues.name = cityAlias.name
  initialValues.city_id = cityAlias.city.id
  initialValues.state_id = cityAlias.city.state.id
  initialValues.country_id = cityAlias.city.state.country.id
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
