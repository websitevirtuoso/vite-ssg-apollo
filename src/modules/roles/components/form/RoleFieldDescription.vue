<template>
  <v-text-field
    v-model="value"
    type="text"
    :label="t('messages.description')"
    :error-messages="errors"
    data-test="role.description"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const { value, errors } = useField('description')
</script>
