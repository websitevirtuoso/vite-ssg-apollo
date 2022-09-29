<template>
  <v-text-field
    v-model="value"
    :prepend-inner-icon="mdiHomeCity"
    :label="t('messages.address')"
    :error-messages="errors"
    type="text"
    data-test="region.address"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('address')
</script>
