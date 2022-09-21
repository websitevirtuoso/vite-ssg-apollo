<template>
  <v-text-field
    v-model="value"
    type="text"
    hint="Appears on customers receipt"
    :label="t('messages.short_description')"
    :error-messages="errors"
    data-test="promo.short_description"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('short_description')
</script>
