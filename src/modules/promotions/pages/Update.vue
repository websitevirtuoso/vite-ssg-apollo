<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }"
          as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema"
          @submit="updatePromo"
        >
          <v-card :title="t('messages.update_', { title: 'promo' })">
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="6">
                    <promo-field-code />
                  </v-col>
                  <v-col cols="12" md="6">
                    <promo-field-discount />
                  </v-col>
                  <v-col cols="12" md="6">
                    <promo-field-use />
                  </v-col>
                  <v-col cols="12" md="6">
                    <promo-field-expire />
                  </v-col>
                  <v-col cols="12">
                    <promo-field-short-description />
                  </v-col>
                  <v-col cols="12">
                    <promo-field-rules />
                  </v-col>
                  <v-col cols="12">
                    <promo-field-description />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="loadingPromo"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="promo.submit"
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
import { gqlHandleError } from '@/helpers/handleErrors'
import { PromoInput } from '@/modules/promotions/types'
import useVSchema from '../helpers/validationSchemaPromo'
import PromoUpsert from '../graphql/mutations/promoUpsert.gql'
import GetPromotions from '../graphql/queries/getPromotions.gql'
import { redirectNotFoundIfEmpty } from '@/composables/useRedirect'
import { useNotification } from '@/modules/notifications/useNotification'
// components
import PromoFieldCode from '@/modules/promotions/components/form/PromoFieldCode.vue'
import PromoFieldDiscount from '@/modules/promotions/components/form/PromoFieldDiscount.vue'
import PromoFieldUse from '@/modules/promotions/components/form/PromoFieldUse.vue'
import PromoFieldExpire from '@/modules/promotions/components/form/PromoFieldExpire.vue'
import PromoFieldShortDescription from '@/modules/promotions/components/form/PromoFieldShortDescription.vue'
import PromoFieldDescription from '@/modules/promotions/components/form/PromoFieldDescription.vue'
import PromoFieldRules from '@/modules/promotions/components/form/PromoFieldRules.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = reactive({
  id: '',
  code: '',
  discount: 0,
  use: 0,
  short_description: '',
  description: '',
  expire_at: '',
  rules: { user_use_once: 0 },
})

const { onResult } = useQuery(GetPromotions, { filter: { id: [route.params.id] } })
const { mutate, loading: loadingPromo, onDone, onError } = useMutation(PromoUpsert)

onResult((queryResult) => {
  redirectNotFoundIfEmpty(queryResult.data.promotions.data[0])
  ;({
    id: initialValues.id,
    code: initialValues.code,
    discount: initialValues.discount,
    use: initialValues.use,
    short_description: initialValues.short_description,
    description: initialValues.description,
    expire_at: initialValues.expire_at,
    rules: { user_use_once: initialValues.rules.user_use_once },
  } = queryResult.data.promotions.data[0])
  // change type for field
  initialValues.rules.user_use_once = Number(initialValues.rules.user_use_once)
})

onDone(() => {
  notification.success(t('action.update_success'))
  router.push({ name: 'promos' })
})

const updatePromo = ({ code, discount, use, short_description, description, expire_at, rules }: PromoInput, form: SubmissionContext) => {
  mutate({
    id: initialValues.id,
    code,
    discount: parseInt(discount),
    use: parseInt(use),
    short_description,
    description,
    expire_at,
    rules: { user_use_once: Boolean(rules.user_use_once) },
  })

  onError((error) => {
    gqlHandleError(error, form)
  })
}
</script>
