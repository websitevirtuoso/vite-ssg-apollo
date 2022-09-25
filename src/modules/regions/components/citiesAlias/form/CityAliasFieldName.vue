<template>
  <v-text-field v-model="value" type="text" :label="t('messages.name')" :error-messages="errors" data-test="alias.name" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('name')
</script>
