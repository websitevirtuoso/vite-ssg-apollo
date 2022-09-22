<template>
  <v-text-field v-model="value" type="text" :label="t('messages.last_name')" :error-messages="errors" data-test="user.last_name" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('last_name')
</script>
