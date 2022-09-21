<template>
  <v-text-field v-model="value" type="number" :label="t('messages.use')" :error-messages="errors" data-test="promo.use" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('use')
</script>
