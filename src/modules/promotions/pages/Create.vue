<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="8">
        <Form v-slot="{ errors: formErrors }" as="v-form" :validation-schema="vSchema" @submit="createPromo">
          <v-card :title="t('messages.create_', { title: 'promo' })">
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="cols" md="6">
                    <Field v-slot="{ errors, value }" v-model="promoCode" name="code">
                      <v-text-field
                        :model-value="value"
                        type="text"
                        :label="t('messages.code')"
                        :error-messages="errors"
                        data-test="promo.code"
                        @update:model-value="promoCode = $event.toUpperCase()"
                      />
                    </Field>
                  </v-col>
                  <v-col cols="cols" md="6">
                    <Field v-slot="{ field, errors }" name="discount">
                      <v-text-field
                        v-bind="field"
                        type="number"
                        :label="t('messages.discount')"
                        :error-messages="errors"
                        data-test="promo.discount"
                      />
                    </Field>
                  </v-col>
                  <v-col cols="cols" md="6">
                    <Field v-slot="{ field, errors }" name="use">
                      <v-text-field
                        v-bind="field"
                        type="number"
                        :label="t('messages.use')"
                        :error-messages="errors"
                        data-test="promo.use"
                      />
                    </Field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <Field v-slot="{ field, errors }" name="expire_at">
                      <div data-test="promo.expire_at.block">
                        <label for="expire_at" class="form__label">{{ t('messages.expire_at') }}</label
                        ><br />
                        <!-- todo need to wait v3.1.0 to implement date picker -->
                        <input v-bind="field" id="expire_at" type="date" :min="dayjs().format('YYYY-MM-DD')" data-test="promo.expire_at" />
                        <div v-show="errors.length > 0" class="v-input__details">
                          <div class="v-messages validation__error">
                            <div v-for="(error, i) in errors" :key="i" class="v-messages__message">
                              {{ error }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Field>
                  </v-col>
                  <v-col cols="12">
                    <Field v-slot="{ field, errors }" name="short_description">
                      <v-text-field
                        v-bind="field"
                        type="text"
                        hint="Appears on customers receipt"
                        :label="t('messages.short_description')"
                        :error-messages="errors"
                        data-test="promo.short_description"
                      />
                    </Field>
                  </v-col>
                  <v-col cols="12">
                    {{ t('messages.user_use_once') }}
                    <Field v-slot="{ field, value }" v-model="userUseOnce" name="rules.user_use_once">
                      <one-time-use
                        v-bind="field"
                        :model-value="value"
                        :positive-text="t('action.yes')"
                        :negative-text="t('action.no')"
                        class="ml-4"
                        data-test="promo.rules.user_use_once"
                      />
                    </Field>
                  </v-col>
                  <v-col cols="12">
                    <Field v-slot="{ field, errors }" name="description">
                      <wysiwyg v-bind="field" :label="t('messages.description')" :error-messages="errors" data-test="promo.description" />
                    </Field>
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
import { Field, Form, SubmissionContext } from 'vee-validate'
// custom
import Wysiwyg from '@/components/fields/Wysiwyg.vue'
import { PromoInput } from '@/modules/promotions/types'
import { gqlHandleError } from '@/helpers/handleErrors'
import useVSchema from '../helpers/validationSchemaPromo'
import PromoUpsert from '../graphql/mutations/promoUpsert.gql'
import { useNotification } from '@/modules/notifications/useNotification'
import OneTimeUse from '@/modules/promotions/components/OneTimeUse.vue'

const router = useRouter()
const { t } = useI18n()
const vSchema = useVSchema(t)
const notification = useNotification()
const userUseOnce = ref(1)
const promoCode = ref('')

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
