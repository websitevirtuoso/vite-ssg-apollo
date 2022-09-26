<template>
  <v-checkbox v-model="value" :error-messages="errors" color="primary" :label="t('messages.notify')" data-test="user.notify" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('notify')
</script>
