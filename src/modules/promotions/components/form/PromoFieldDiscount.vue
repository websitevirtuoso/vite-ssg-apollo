<template>
  <v-text-field v-model="value" type="number" :label="t('messages.discount')" :error-messages="errors" data-test="promo.discount" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('discount')
</script>
