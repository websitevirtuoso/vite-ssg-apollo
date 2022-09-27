<template>
  <v-select
    v-model="value"
    :items="Object.values(User_Status)"
    :label="t('messages.status')"
    :error-messages="errors"
    :prepend-inner-icon="mdiChevronDoubleDown"
    data-test="user.status"
  />
</template>

<script setup lang="ts">
import { User_Status } from '@/plugins/apollo/schemaTypesGenerated'
const { t } = useI18n()
const { value, errors } = useField('status')
</script>
