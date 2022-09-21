<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form
          v-slot="{ errors: formErrors }"
          as="v-form"
          :initial-values="initialValues"
          :validation-schema="vSchema"
          @submit="createPromo"
        >
          <v-card :title="t('messages.create_', { title: 'promo' })">
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
                :loading="loading"
                :disabled="Object.keys(formErrors).length !== 0"
                data-test="promo.submit"
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
import { PromoInput } from '@/modules/promotions/types'
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '../helpers/validationSchemaPromo'
import PromoUpsert from '../graphql/mutations/promoUpsert.gql'
import { useNotification } from '@/modules/notifications/useNotification'
// components
import PromoFieldCode from '@/modules/promotions/components/form/PromoFieldCode.vue'
import PromoFieldDiscount from '@/modules/promotions/components/form/PromoFieldDiscount.vue'
import PromoFieldUse from '@/modules/promotions/components/form/PromoFieldUse.vue'
import PromoFieldExpire from '@/modules/promotions/components/form/PromoFieldExpire.vue'
import PromoFieldShortDescription from '@/modules/promotions/components/form/PromoFieldShortDescription.vue'
import PromoFieldRules from '@/modules/promotions/components/form/PromoFieldRules.vue'
import PromoFieldDescription from '@/modules/promotions/components/form/PromoFieldDescription.vue'

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const initialValues = { rules: { user_use_once: 1 } }

const { mutate, loading, onDone, onError } = useMutation(PromoUpsert)

onDone(() => {
  notification.success(t('action.create_success'))
  router.push({ name: 'promos' })
})

const createPromo = ({ code, discount, use, short_description, description, expire_at, rules }: PromoInput, form: SubmissionContext) => {
  mutate({
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
