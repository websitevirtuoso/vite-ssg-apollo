<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema()" @submit="createCityAlias">
          <v-card :title="t('messages.create_', { title: 'city alias' })">
            <v-card-text>
              <city-alias-field-name />
              <region-part show-countries show-states show-cities class="px-0" />
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
import { Form, SubmissionContext } from 'vee-validate'
// custom
import CityAliasUpsert from '../../graphql/mutations/cityAliasUpsert.gql'
import vSchema from '../../helpers/validationSchemaCityAlias'
import { gqlHandleError } from '@/helpers/handleErrors'
import { useNotification } from '@/modules/notifications/useNotification'
import { CityAliasInput } from '@/modules/regions/types'
// components
import RegionPart from '@/modules/regions/components/form/RegionPart.vue'
import CityAliasFieldName from '@/modules/regions/components/citiesAlias/form/CityAliasFieldName.vue'

const router = useRouter()
const { t } = useI18n()
const notification = useNotification()
const { mutate, loading: mutationLoading, onDone, onError } = useMutation(CityAliasUpsert)

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
