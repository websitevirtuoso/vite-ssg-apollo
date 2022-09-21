<template>
  <v-text-field
    v-model="value"
    type="text"
    :label="t('messages.code')"
    :error-messages="errors"
    data-test="promo.code"
    @update:model-value="value = value.toUpperCase()"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('code')
</script>
