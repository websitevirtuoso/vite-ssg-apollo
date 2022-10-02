<template>
  <v-text-field
    v-model="value"
    type="number"
    :label="t('messages.price')"
    :error-messages="errors"
    :prepend-inner-icon="mdiCurrencyUsd"
    data-test="listing.price"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('price')
</script>
