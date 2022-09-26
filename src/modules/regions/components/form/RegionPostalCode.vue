<template>
  <v-text-field
    v-model="value"
    type="text"
    :label="t('messages.postal_code')"
    :error-messages="errors"
    data-test="region.postal_code"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('postal_code')
</script>
