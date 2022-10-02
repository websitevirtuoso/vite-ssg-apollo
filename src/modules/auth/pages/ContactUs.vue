<template>
  <form @submit="onSend">
    <v-card class="pa-3" title="Contact Us">
      <v-card-text class="px-2 py-0">
        <v-container class="px-0">
          <v-row>
            <v-col v-if="sendStatus" cols="12">
              <v-alert :type="sendStatus">
                {{ sendStatusMessage }}
              </v-alert>
            </v-col>
            <v-col cols="12" md="6">
              <user-field-first-name class="required" />
            </v-col>
            <v-col cols="12" md="6">
              <user-field-last-name class="required" />
            </v-col>
            <v-col cols="12">
              <user-field-email class="required" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="valuePhone"
                :error-messages="errorsPhone"
                :prepend-inner-icon="mdiCellphone"
                :label="t('messages.phone')"
                type="numeric"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="valueAddress"
                :error-messages="errorsAddress"
                :prepend-inner-icon="mdiMapMarker"
                label="Property Address"
                type="text"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="valueSubject"
                :error-messages="errorsSubject"
                :prepend-inner-icon="mdiTextLong"
                :label="t('messages.subject')"
                type="text"
                class="required"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="valueMessage" :error-messages="errorsMessage" label="Message" type="text" class="required" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pa-0">
        <v-btn
          block
          color="primary"
          :loading="loading"
          :disabled="Object.keys(formErrors).length !== 0"
          type="submit"
          data-test="contact-form.submit"
        >
          Send Message
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script setup lang="ts">
// libs
import { SubmissionContext, useForm } from 'vee-validate'
// custom
import { gqlHandleError } from '@/helpers/handleErrors'
import ContactForm from '@/modules/auth/graphql/mutations/contactUs.gql'
import vSchema from '@/modules/auth/helpers/validationSchemaContactForm'
import { MutationContactFormArgs, ResponseStatus } from '@/plugins/apollo/schemaTypesGenerated'
import { useNotification } from '@/modules/notifications/useNotification'
// components
import UserFieldFirstName from '@/modules/users/components/form/UserFieldFirstName.vue'
import UserFieldLastName from '@/modules/users/components/form/UserFieldLastName.vue'
import UserFieldEmail from '@/modules/users/components/form/UserFieldEmail.vue'

const errorMessage = 'Server internal Error Please try later'
const successMessage = 'Your request has been sent!'
const sendStatus = ref<string>('')
const sendStatusMessage = ref<string>('')

const notification = useNotification()
const { t } = useI18n()

const { handleSubmit, errors: formErrors, resetForm } = useForm({ validationSchema: vSchema() })
const { value: valuePhone, errors: errorsPhone } = useField('phone')
const { value: valueSubject, errors: errorsSubject } = useField('subject')
const { value: valueAddress, errors: errorsAddress } = useField('address')
const { value: valueMessage, errors: errorsMessage } = useField('message')

const { mutate, loading, onError, onDone } = useMutation(ContactForm, { clientId: 'public' })

onDone(({ data }) => {
  if (data.contactForm.status === ResponseStatus.Error) {
    sendStatus.value = ResponseStatus.Error
    sendStatusMessage.value = errorMessage
    notification.error(errorMessage)
  } else {
    sendStatus.value = ResponseStatus.Success
    sendStatusMessage.value = successMessage
    notification.success(successMessage)
    resetForm({ values: {} })
  }
})

const onSend = handleSubmit(({ first_name, last_name, phone, email, address, subject, message }, form: SubmissionContext) => {
  mutate({ first_name, last_name, phone, email, address, subject, message } as MutationContactFormArgs)

  onError((error) => {
    gqlHandleError(error, form)
  })
})
</script>
