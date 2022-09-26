<template>
  <v-text-field
    v-model="value"
    type="text"
    :label="t('messages.address')"
    :error-messages="errors"
    data-test="region.address"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('address')
</script>
