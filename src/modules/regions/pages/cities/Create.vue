<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema()" @submit="createCity">
          <v-card :title="t('messages.create_', { title: 'city' })">
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
import { Form, SubmissionContext } from 'vee-validate'
// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import vSchema from '../../helpers/validationSchemaCity'
import CityUpsert from '../../graphql/mutations/cityUpsert.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import { CityInput } from '@/modules/regions/types'
import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
import CityFieldName from '@/modules/regions/components/cities/form/CityFieldName.vue'

const router = useRouter()
const { t } = useI18n()
const notification = useNotification()
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityUpsert)

onDone(() => {
  notification.success(t('action.create_success'))
  router.push({ name: 'cities' })
})

const createCity = ({ name, state_id, lat, lng }: CityInput, form: SubmissionContext) => {
  mutate({ name, lat, lng, state_id })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
