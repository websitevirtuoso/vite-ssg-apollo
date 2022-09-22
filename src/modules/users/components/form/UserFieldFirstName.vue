<template>
  <v-text-field v-model="value" type="text" :label="t('messages.first_name')" :error-messages="errors" data-test="user.first_name" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('first_name')
</script>
